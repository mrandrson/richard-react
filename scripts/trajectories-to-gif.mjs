#!/usr/bin/env node
// Render a planetesimal trajectory viewer (trajectories.html) to an animated GIF or MP4.
// Drives headless Chrome over the DevTools protocol, steps the viewer's draw(i)
// frame by frame, then encodes with ffmpeg (format chosen by the output extension).
//
// Usage: node scripts/trajectories-to-gif.mjs <viewer.html> <out.gif|out.mp4> [--every 4] [--size 600] [--fps 25]

import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const [, value] = args.splice(i, 2);
  return Number(value);
};
const every = opt('every', 4);
const size = opt('size', 600);
const fps = opt('fps', 25);
const [input, output] = args;
if (!input || !output) {
  console.error('Usage: node scripts/trajectories-to-gif.mjs <viewer.html> <out.gif> [--every 4] [--size 600] [--fps 25]');
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), 'traj-gif-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=0',
  `--user-data-dir=${join(work, 'profile')}`,
  'about:blank',
], { stdio: 'ignore' });

try {
  // Chrome writes the chosen debugging port to DevToolsActivePort.
  const portFile = join(work, 'profile', 'DevToolsActivePort');
  for (let i = 0; i < 100 && !existsSync(portFile); i++) await new Promise((r) => setTimeout(r, 100));
  const port = readFileSync(portFile, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((t) => t.type === 'page');

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let nextId = 0;
  const pending = new Map();
  const events = [];
  ws.addEventListener('message', ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method) {
      events.push(msg.method);
    }
  });
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const id = ++nextId;
      pending.set(id, (msg) => (msg.error ? rej(new Error(msg.error.message)) : res(msg.result)));
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, returnByValue: true });
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
    return result.value;
  };

  await send('Page.enable');
  await send('Page.navigate', { url: pathToFileURL(resolve(input)).href });
  while (!events.includes('Page.loadEventFired')) await new Promise((r) => setTimeout(r, 100));

  // Stop the viewer's own playback loop, then render frames in order so trails accumulate.
  const total = await evaluate('playing = false; frames.length');
  await evaluate(`
    window.__out = document.createElement('canvas');
    __out.width = ${size}; __out.height = ${size};
    window.__grab = (i) => {
      draw(i);
      const c = __out.getContext('2d');
      c.fillStyle = '#050810';
      c.fillRect(0, 0, ${size}, ${size});
      c.drawImage(canvas, 0, 0, ${size}, ${size});
      return __out.toDataURL('image/png').split(',')[1];
    };
  `);

  const indices = [];
  for (let i = 0; i < total; i += every) indices.push(i);
  if (indices.at(-1) !== total - 1) indices.push(total - 1);
  for (const [n, i] of indices.entries()) {
    const png = await evaluate(`__grab(${i})`);
    writeFileSync(join(work, `f${String(n).padStart(5, '0')}.png`), Buffer.from(png, 'base64'));
    process.stdout.write(`\rframe ${n + 1}/${indices.length}`);
  }
  process.stdout.write('\n');
  ws.close();

  // Output format follows the extension: .mp4 gets H.264, anything else a palette GIF.
  const encode = output.toLowerCase().endsWith('.mp4')
    ? ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-movflags', '+faststart']
    : ['-filter_complex', '[0:v]split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle', '-loop', '0'];
  const ffmpeg = spawnSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-framerate', String(fps),
    '-i', join(work, 'f%05d.png'),
    ...encode,
    resolve(output),
  ], { stdio: 'inherit' });
  if (ffmpeg.status !== 0) throw new Error('ffmpeg failed');
  console.log(`Wrote ${output} (${indices.length} frames at ${fps} fps, ${size}x${size})`);
} finally {
  // Chrome keeps writing to its profile while shutting down, so wait for it to exit first.
  if (chrome.exitCode === null) {
    const exited = new Promise((r) => chrome.once('exit', r));
    chrome.kill();
    await Promise.race([exited, new Promise((r) => setTimeout(r, 5000))]);
  }
  rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}

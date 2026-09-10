import { useEffect, useRef, useState } from 'react';

const pebbleCentersUrl = `${import.meta.env.BASE_URL}data/pebble_centers.json`;
const tracksUrl = `${import.meta.env.BASE_URL}data/neutron_tracks_preview.json`;

function projectPoint(point, rotation, scale, centerX, centerY) {
  const [x, y, z] = point;
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);

  const rx = x * cosY + z * sinY;
  const rz = -x * sinY + z * cosY;
  const ry = y * cosX - rz * sinX;
  const depth = y * sinX + rz * cosX;

  return {
    x: centerX + rx * scale,
    y: centerY - ry * scale,
    depth,
  };
}

function drawCore(ctx, canvas, pebbles, tracks, rotation, progress) {
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const extent = pebbles.reduce((maxValue, [x, y, z, radius]) => {
    return Math.max(maxValue, Math.abs(x) + radius, Math.abs(y) + radius, Math.abs(z) + radius);
  }, 1);
  const scale = Math.min(width, height) * 0.42 / extent;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#f8f8f3';
  ctx.fillRect(0, 0, width, height);

  const projectedPebbles = pebbles
    .map(([x, y, z, radius]) => ({
      ...projectPoint([x, y, z], rotation, scale, centerX, centerY),
      radius: Math.max(radius * scale * 0.9, 1.4),
    }))
    .sort((a, b) => a.depth - b.depth);

  for (const pebble of projectedPebbles) {
    const shade = Math.max(150, Math.min(220, 182 + pebble.depth * 5));
    ctx.beginPath();
    ctx.arc(pebble.x, pebble.y, pebble.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${shade}, ${Math.min(shade + 8, 230)}, ${shade}, 0.36)`;
    ctx.strokeStyle = 'rgba(55, 63, 58, 0.2)';
    ctx.lineWidth = 0.7;
    ctx.fill();
    ctx.stroke();
  }

  const visibleFraction = 0.16;
  for (const track of tracks) {
    const end = Math.max(2, Math.ceil(progress * track.length));
    const start = Math.max(0, Math.floor(end - track.length * visibleFraction));
    const segment = track.slice(start, end);
    if (segment.length < 2) {
      continue;
    }

    ctx.beginPath();
    segment.forEach((sample, index) => {
      const projected = projectPoint(sample, rotation, scale, centerX, centerY);
      if (index === 0) {
        ctx.moveTo(projected.x, projected.y);
      } else {
        ctx.lineTo(projected.x, projected.y);
      }
    });
    ctx.strokeStyle = 'rgba(210, 54, 36, 0.48)';
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }
}

function PebbleCoreViewer({ height = 560 }) {
  const canvasRef = useRef(null);
  const dragRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef({ x: -0.48, y: 0.72 });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(pebbleCentersUrl).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load pebble centers: ${response.status}`);
        }
        return response.json();
      }),
      fetch(tracksUrl)
        .then((response) => {
          if (!response.ok) {
            return { tracks: [] };
          }
          return response.json();
        })
        .catch(() => ({ tracks: [] })),
    ])
      .then(([pebbleData, trackData]) => {
        if (cancelled) {
          return;
        }
        if (!Array.isArray(pebbleData.pebbles) || pebbleData.pebbles.length === 0) {
          throw new Error('Pebble center data is empty.');
        }
        setData({
          pebbles: pebbleData.pebbles,
          tracks: Array.isArray(trackData.tracks) ? trackData.tracks : [],
        });
        setNotice(
          Array.isArray(trackData.tracks) && trackData.tracks.length
            ? null
            : 'Pebble geometry loaded. Neutron histories are unavailable in this browser session.'
        );
        setError(null);
      })
      .catch((loadError) => {
        if (!cancelled) {
          setError(loadError.message || 'Unable to load pebble core geometry.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Unable to initialize pebble core canvas.');
      return undefined;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.max(320, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(260, Math.floor(rect.height * pixelRatio));
    };

    const render = () => {
      const rotation = rotationRef.current;
      if (!dragRef.current) {
        rotation.y += 0.0025;
      }
      const progress = ((Date.now() % 12000) / 12000) || 0.01;
      drawCore(ctx, canvas, data.pebbles, data.tracks, rotation, progress);
      animationRef.current = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data]);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      rotation: { ...rotationRef.current },
    };
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) {
      return;
    }
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    rotationRef.current = {
      x: Math.max(-1.25, Math.min(1.25, dragRef.current.rotation.x + dy * 0.006)),
      y: dragRef.current.rotation.y + dx * 0.006,
    };
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div
      style={{
        width: '100%',
        height,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #d8ddd8',
        background: '#f8f8f3',
        touchAction: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
        aria-label="Interactive pebble bed core geometry"
      />
      {error ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px',
            background: 'rgba(255,255,255,0.95)',
            color: '#333',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      ) : null}
      {!error && notice ? (
        <div
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 12,
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.88)',
            color: '#333',
            fontSize: '0.88rem',
            fontWeight: 600,
            border: '1px solid #d8ddd8',
          }}
        >
          {notice}
        </div>
      ) : null}
    </div>
  );
}

export default PebbleCoreViewer;

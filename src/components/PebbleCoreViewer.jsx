import { useEffect, useRef, useState } from 'react';
import 'vtk.js/Sources/Rendering/Profiles/Geometry';
import 'vtk.js/Sources/Rendering/Profiles/Molecule';

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkCellArray from 'vtk.js/Sources/Common/Core/CellArray';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkPolyData from 'vtk.js/Sources/Common/DataModel/PolyData';
import vtkPolyDataReader from 'vtk.js/Sources/IO/Legacy/PolyDataReader';
import vtkSphereMapper from 'vtk.js/Sources/Rendering/Core/SphereMapper';

const pebbleCentersUrl = `${import.meta.env.BASE_URL}data/pebble_centers.json`;
const tracksUrl = `${import.meta.env.BASE_URL}data/neutron_tracks.vtk`;
const animationMs = 12000;
const frameMs = 90;
const tailFraction = 0.18;

async function loadPebbleCenters(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data.pebbles) || data.pebbles.length === 0) {
    throw new Error(`Unable to parse ${url}`);
  }

  return data.pebbles;
}

async function loadLegacyPolyData(reader, url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const text = await response.text();
  reader.parseAsText(text);

  const output = reader.getOutputData();
  if (!output) {
    throw new Error(`Unable to parse ${url}`);
  }

  return output;
}

function makePebbleSphereData(pebbles) {
  const points = new Float32Array(pebbles.length * 3);
  const radii = new Float32Array(pebbles.length);

  pebbles.forEach(([x, y, z, radius], index) => {
    points[index * 3] = x;
    points[index * 3 + 1] = y;
    points[index * 3 + 2] = z;
    radii[index] = radius;
  });

  const polyData = vtkPolyData.newInstance();
  polyData.getPoints().setData(points, 3);
  polyData.getPointData().setScalars(
    vtkDataArray.newInstance({
      name: 'radius',
      values: radii,
    })
  );

  return polyData;
}

function readTracks(polyData) {
  const pointValues = polyData.getPoints().getData();
  const lineValues = polyData.getLines().getData();
  const energyValues = polyData.getPointData()?.getArrayByName('energy_eV')?.getData();
  const tracks = [];

  for (let offset = 0; offset < lineValues.length;) {
    const count = lineValues[offset];
    const ids = lineValues.slice(offset + 1, offset + 1 + count);
    const points = new Float32Array(count * 3);
    const energies = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const pointId = ids[i];
      points[i * 3] = pointValues[pointId * 3];
      points[i * 3 + 1] = pointValues[pointId * 3 + 1];
      points[i * 3 + 2] = pointValues[pointId * 3 + 2];
      energies[i] = energyValues ? energyValues[pointId] : 1;
    }

    if (count >= 2) {
      tracks.push({ points, energies, count });
    }
    offset += count + 1;
  }

  return tracks;
}

function makeAnimatedTrackData(tracks, progress) {
  const visiblePoints = [];
  const visibleLines = [];
  const visibleEnergies = [];
  let pointOffset = 0;

  for (const track of tracks) {
    const end = Math.max(2, Math.ceil(progress * track.count));
    const start = Math.max(0, Math.floor(end - track.count * tailFraction));
    const count = end - start;
    if (count < 2) {
      continue;
    }

    visibleLines.push(count);
    for (let i = start; i < end; i += 1) {
      visibleLines.push(pointOffset);
      visiblePoints.push(
        track.points[i * 3],
        track.points[i * 3 + 1],
        track.points[i * 3 + 2]
      );
      visibleEnergies.push(track.energies[i]);
      pointOffset += 1;
    }
  }

  const polyData = vtkPolyData.newInstance();
  polyData.getPoints().setData(Float32Array.from(visiblePoints), 3);
  polyData.setLines(
    vtkCellArray.newInstance({
      values: Uint32Array.from(visibleLines),
    })
  );
  polyData.getPointData().setScalars(
    vtkDataArray.newInstance({
      name: 'energy_eV',
      values: Float32Array.from(visibleEnergies),
    })
  );
  return polyData;
}

function PebbleCoreViewer({ height = 560 }) {
  const containerRef = useRef(null);
  const contextRef = useRef(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
      rootContainer: container,
      background: [0.985, 0.985, 0.975],
    });
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();
    const glWindow = fullScreenRenderer.getApiSpecificRenderWindow();

    const pebblesMapper = vtkSphereMapper.newInstance();
    const pebblesActor = vtkActor.newInstance();
    pebblesActor.setMapper(pebblesMapper);
    pebblesMapper.setScaleArray('radius');
    pebblesMapper.setScaleFactor(0.92);
    pebblesActor.getProperty().setColor(0.72, 0.75, 0.72);
    pebblesActor.getProperty().setOpacity(0.34);

    const tracksReader = vtkPolyDataReader.newInstance();
    const tracksMapper = vtkMapper.newInstance();
    const tracksActor = vtkActor.newInstance();
    tracksActor.setMapper(tracksMapper);
    tracksActor.getProperty().setLineWidth(2);
    tracksActor.getProperty().setOpacity(0.24);

    loadPebbleCenters(pebbleCentersUrl)
      .then((pebbles) => {
        pebblesMapper.setInputData(makePebbleSphereData(pebbles));
        renderer.addActor(pebblesActor);
        renderer.resetCamera();
        renderWindow.render();
        setError(null);

        loadLegacyPolyData(tracksReader, tracksUrl)
          .then((tracks) => {
            const trackHistories = readTracks(tracks);
            if (trackHistories.length === 0) {
              setNotice('Pebble geometry loaded. Neutron histories are unavailable in this browser session.');
              return;
            }

            const initialTrackData = makeAnimatedTrackData(trackHistories, 0.01);
            tracksMapper.setInputData(initialTrackData);

            const energy = tracks.getPointData()?.getArrayByName('energy_eV');
            if (energy) {
              const [min, max] = energy.getRange();
              const span = max - min || 1;
              const ctfun = vtkColorTransferFunction.newInstance();
              ctfun.addRGBPoint(min, 0.16, 0.38, 0.88);
              ctfun.addRGBPoint(min + span * 0.5, 0.98, 0.78, 0.24);
              ctfun.addRGBPoint(max, 0.85, 0.18, 0.12);
              tracksMapper.setLookupTable(ctfun);
              tracksMapper.setScalarModeToUsePointData();
              tracksMapper.setColorByArrayName('energy_eV');
              tracksMapper.setScalarRange(min, max);
            } else {
              tracksActor.getProperty().setColor(0.9, 0.18, 0.12);
            }

            renderer.addActor(tracksActor);
            setNotice(null);
            renderWindow.render();

            const animate = () => {
              if (!contextRef.current) {
                return;
              }
              const progress = ((Date.now() % animationMs) / animationMs) || 0.01;
              const animatedData = makeAnimatedTrackData(trackHistories, progress);
              tracksMapper.setInputData(animatedData);
              renderWindow.render();
              contextRef.current.animationTimer = window.setTimeout(animate, frameMs);
            };
            animate();
          })
          .catch(() => {
            setNotice('Pebble geometry loaded. Neutron histories are unavailable in this browser session.');
          });
      })
      .catch(() => {
        setError('Unable to load pebble core geometry.');
      });

    const handleResize = () => {
      const { clientWidth } = container;
      glWindow.setSize(Math.max(clientWidth, 320), height);
      renderWindow.render();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    contextRef.current = {
      fullScreenRenderer,
      pebblesMapper,
      pebblesActor,
      tracksReader,
      tracksMapper,
      tracksActor,
      handleResize,
      animationTimer: null,
    };

    return () => {
      if (contextRef.current) {
        window.removeEventListener('resize', contextRef.current.handleResize);
        if (contextRef.current.animationTimer) {
          window.clearTimeout(contextRef.current.animationTimer);
        }
        contextRef.current.tracksActor.delete();
        contextRef.current.tracksMapper.delete();
        contextRef.current.tracksReader.delete();
        contextRef.current.pebblesActor.delete();
        contextRef.current.pebblesMapper.delete();
        contextRef.current.fullScreenRenderer.delete();
        contextRef.current = null;
      }
    };
  }, [height]);

  return (
    <div
      style={{
        width: '100%',
        height,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #d8ddd8',
        background: '#f8f8f3',
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
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

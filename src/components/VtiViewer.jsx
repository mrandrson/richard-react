import { useEffect, useRef, useState } from 'react';
import 'vtk.js/Sources/Rendering/Profiles/Volume';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkXMLImageDataReader from 'vtk.js/Sources/IO/XML/XMLImageDataReader';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';
import assetPath from '../utils/assetPath';

const dataUrl = `${import.meta.env.BASE_URL}data/geom.vti`;

const supportsWebGL2 = () => {
  if (typeof document === 'undefined') {
    return true;
  }
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2');
  if (gl && typeof gl.getParameter === 'function') {
    return true;
  }
  return false;
};

function convertCellDataToPointData(imageData) {
  const cellData = imageData.getCellData();
  if (!cellData) {
    return null;
  }
  const sourceArray =
    cellData.getArray('id') ||
    cellData.getScalars() ||
    (cellData.getNumberOfArrays?.() > 0
      ? cellData.getArrayByIndex(cellData.getNumberOfArrays() - 1)
      : null);

  if (!sourceArray) {
    return null;
  }

  const [nx, ny, nz] = imageData.getDimensions();
  if (nx < 2 || ny < 2 || nz < 2) {
    return null;
  }

  const nx1 = nx - 1;
  const ny1 = ny - 1;
  const nz1 = nz - 1;
  const numPoints = nx * ny * nz;
  const accum = new Float64Array(numPoints);
  const counts = new Uint32Array(numPoints);
  const cellValues = sourceArray.getData();

  let cellIdx = 0;
  for (let k = 0; k < nz1; k++) {
    for (let j = 0; j < ny1; j++) {
      for (let i = 0; i < nx1; i++, cellIdx++) {
        const value = cellValues[cellIdx];
        for (let dz = 0; dz <= 1; dz++) {
          const pk = k + dz;
          for (let dy = 0; dy <= 1; dy++) {
            const pj = j + dy;
            for (let dx = 0; dx <= 1; dx++) {
              const pi = i + dx;
              const pointIdx = pi + nx * (pj + ny * pk);
              accum[pointIdx] += value;
              counts[pointIdx] += 1;
            }
          }
        }
      }
    }
  }

  for (let idx = 0; idx < numPoints; idx++) {
    if (counts[idx] > 0) {
      accum[idx] /= counts[idx];
    }
  }

  return vtkDataArray.newInstance({
    name: `${sourceArray.getName() || 'cell'}_points`,
    values: Float32Array.from(accum),
  });
}

function VtiViewer({ height = 600 }) {
  const containerRef = useRef(null);
  const contextRef = useRef(null);
  const [error, setError] = useState(null);
  const [noWebGL2, setNoWebGL2] = useState(false);
  const fallbackImageSrc = assetPath('triso_raytrace.png');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    if (!supportsWebGL2()) {
      setNoWebGL2(true);
      setError('webgl2');
      return undefined;
    }

    if (!contextRef.current) {
      const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
        rootContainer: container,
        background: [0.98, 0.98, 0.98],
      });

      const reader = vtkXMLImageDataReader.newInstance();
      const mapper = vtkVolumeMapper.newInstance();
      const actor = vtkVolume.newInstance();

      actor.setMapper(mapper);

      const renderer = fullScreenRenderer.getRenderer();
      const renderWindow = fullScreenRenderer.getRenderWindow();
      const glWindow = fullScreenRenderer.getApiSpecificRenderWindow();

      reader
        .setUrl(dataUrl)
        .then(() => reader.loadData())
        .then(() => {
          const data = reader.getOutputData();
          if (!data) {
            setError('Unable to load reactor geometry.');
            return;
          }

          let scalars = data.getPointData()?.getScalars();
          if (!scalars) {
            const derived = convertCellDataToPointData(data);
            if (derived) {
              data.getPointData().setScalars(derived);
              scalars = derived;
            }
          }
          if (!scalars) {
            setError('Dataset missing scalar field.');
            return;
          }

          mapper.setInputData(data);

          const [min, max] = scalars.getRange();
          const span = max - min || 1;
          const ctfun = vtkColorTransferFunction.newInstance();
          ctfun.addRGBPoint(min, 0.15, 0.15, 0.2);
          ctfun.addRGBPoint(min + span * 0.4, 0.7, 0.72, 0.85);
          ctfun.addRGBPoint(max, 1.0, 1.0, 1.0);

          const ofun = vtkPiecewiseFunction.newInstance();
          ofun.addPoint(min, 0.0);
          ofun.addPoint(min + span * 0.2, 0.02);
          ofun.addPoint(min + span * 0.5, 0.12);
          ofun.addPoint(max, 0.35);

          actor.getProperty().setRGBTransferFunction(0, ctfun);
          actor.getProperty().setScalarOpacity(0, ofun);
          actor.getProperty().setScalarOpacityUnitDistance(
            0,
            Math.max(...data.getSpacing())
          );
          actor.getProperty().setInterpolationTypeToLinear();

          renderer.addVolume(actor);
          renderer.resetCamera();
          renderWindow.render();
          setError(null);
        })
        .catch(() => {
          setError('Unable to load reactor geometry.');
        });

      const handleResize = () => {
        const { clientWidth } = container;
        glWindow.setSize(Math.max(clientWidth, 300), height);
        renderWindow.render();
      };
      window.addEventListener('resize', handleResize);
      handleResize();

      contextRef.current = {
        fullScreenRenderer,
        renderWindow,
        renderer,
        reader,
        mapper,
        actor,
        handleResize,
      };
    }

    return () => {
      if (contextRef.current) {
        const { fullScreenRenderer, reader, mapper, actor, handleResize } =
          contextRef.current;
        window.removeEventListener('resize', handleResize);
        actor.delete();
        mapper.delete();
        reader.delete();
        fullScreenRenderer.delete();
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
      border: '1px solid #e0e0e0',
      background: '#f8f9fb',
    }}
  >
    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    {error ? (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.95)',
          textAlign: 'center',
          padding: '16px',
        }}
      >
        <img
          src={fallbackImageSrc}
          alt="Packed TRISO particle rendering"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '500px',
            borderRadius: '8px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            marginBottom: '12px',
          }}
        />
        <p style={{ color: '#0d0d0d', fontWeight: 600, marginBottom: '6px' }}>
          {noWebGL2 ? 'Interactive volume view requires WebGL 2.' : 'Unable to load the interactive reactor geometry.'}
        </p>
        <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>
          {noWebGL2
            ? "Enable WebGL 2 in Safari’s Develop menu or open this page in Chrome/Firefox to explore the live geometry."
            : 'Please download the poster above for full details while we investigate the issue.'}
        </p>
      </div>
    ) : null}
  </div>
);
}

export default VtiViewer;

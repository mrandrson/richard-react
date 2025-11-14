import assetPath from '../utils/assetPath';

function NextDataAnalysis() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', margin: 0, color: '#111' }}>Analysis of NEXT Experiment Data</h1>
      </div>

      <p>
        I worked on this project during the summer of 2024 as a part of the NREMST program at UT Arlington with the
        Neutrino and Rare Event Searches Group led by Dr. Ben Jones. Under the guidance of Dr. Krishan Mistry, I analyzed
        S1 and S2 pulses in the NEXT data set.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ textAlign: 'center', flex: 1, minWidth: '300px' }}>
          <img src={assetPath('3031S1Fit.png')} alt="Example S1 Fit" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
          <p>Figure 1: S1 Fit</p>
        </div>

        <div style={{ textAlign: 'center', flex: 1, minWidth: '300px' }}>
          <img src={assetPath('3031S2Fit.png')} alt="Example S2 Fit" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
          <p>Figure 2: S2 Fit</p>
        </div>
      </div>

      <p>
        Using these fits, information such as S2 area, width, or height can be extracted. By studying the spatial
        distribution of these properties in the detector, we gain insight into the charge distribution throughout the x-y
        plane.
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, textAlign: 'center', minWidth: '280px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'center' }}>
            <img src={assetPath('quadrantfit1.png')} alt="Quadrant 1" style={{ width: '40%', height: 'auto', margin: 0 }} />
            <img src={assetPath('quadrantfit2.png')} alt="Quadrant 2" style={{ width: '40%', height: 'auto', margin: 0 }} />
            <img src={assetPath('quadrantfit3.png')} alt="Quadrant 3" style={{ width: '40%', height: 'auto', margin: 0 }} />
            <img src={assetPath('quadrantfit4.png')} alt="Quadrant 4" style={{ width: '40%', height: 'auto', margin: 0 }} />
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: '500px', minWidth: '280px' }}>
          <p>
            Since the time between S1 and S2 pulses is approximately proportional to the z-distance between them, we can
            estimate the charge over time for each x-y bin. The histograms show S2 area versus drift time with a red fit to{' '}
            <span>{String.raw`$q(t) = q_0\exp\left(-\frac{t}{\tau}\right)$`}</span> to model the charge per bin. Alongside analysis of
            experimental data, I used the Nexus Geant-4 simulation framework to recreate detector events and understand the
            physics underlying these patterns.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NextDataAnalysis;

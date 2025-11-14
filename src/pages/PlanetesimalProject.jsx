import assetPath from '../utils/assetPath';

function PlanetesimalProject() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', margin: 0, color: '#111' }}>Capture Rate of Planetesimals in Collapsing Proto-stars</h1>
      </div>

      <p>
        In this project, I am working with{' '}
        <a href="https://sites.google.com/view/kedron-silsbee" target="_blank" rel="noreferrer">
          Dr. Kedron Silsbee
        </a>{' '}
        at UTEP, where we seek to understand the capture rate of planetesimals by collapsing proto-stars. We utilize the
        model given by{' '}
        <a href="http://www.astro.yale.edu/larson/papers/Protostar69.pdf" target="_blank" rel="noreferrer">
          Larson 1969
        </a>{' '}
        for modelling the collapse of the protostar. Using this model, we obtain expressions for the enclosed mass.
      </p>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <img
          src={assetPath('massplot.png')}
          alt="Larson vs. Shu enclosed mass plot"
          style={{ width: '100%', height: 'auto', maxWidth: '900px' }}
        />
        <p>Figure: Comparison of enclosed mass histories from Larson (solid) and Shu (dashed) solutions.</p>
      </div>

      <p>
        Using these solutions, we can obtain an expression for the potential inside the cloud. This enables us to perform
        simulations using REBOUND of the motion of the planetesimals, allowing us to analyze the rate at which planetesimals
        are captured by the collapsing protostar.
      </p>

      <div style={{ textAlign: 'center' }}>
        <iframe
          src={assetPath('TAOAPS_Poster_3-3.pdf')}
          style={{ width: '100%', height: '600px' }}
          title="TAOAPS Poster PDF"
        ></iframe>
        <p>
          <a href={assetPath('TAOAPS_Poster_3-3.pdf')} target="_blank" rel="noreferrer">
            Download the TAOAPS poster
          </a>{' '}
          if the preview does not load.
        </p>
      </div>
    </div>
  );
}

export default PlanetesimalProject;

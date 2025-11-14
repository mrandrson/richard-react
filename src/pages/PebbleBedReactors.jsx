import VtiViewer from '../components/VtiViewer';
import assetPath from '../utils/assetPath';

function PebbleBedReactors() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', margin: 0, color: '#111' }}>Pebble Bed Nuclear Reactors</h1>
      </div>

      <p>
        This page showcases my SULI work on modeling advanced pebble bed nuclear reactors. The project focuses on simulating the motion of pebbles as the reactor operates, and how the gamma spectrum evolves as the reactor operates. The poster below summarizes the simulation workflow, benchmarking, and design insights I presented during the program.
      </p>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <iframe
          src={assetPath('Anderson_R_poster_final.pdf')}
          style={{ width: '100%', height: '90vh' }}
          title="WDTS SULI Pebble Bed Poster"
        ></iframe>
        <p>
          <a href={assetPath('Anderson_R_poster_final.pdf')} download>
            Download the poster (PDF)
          </a>{' '}
          |{' '}
          <a href={assetPath('Anderson_R_poster_final.pptx')} download>
            Original PPTX
          </a>
        </p>
      </div>

      <p>
        Highlights include coupling high-fidelity particle transport (OpenMC) with discrete element modeling to capture
        pebble packing effects, plus a sensitivity study on material choices for the reflector and moderator regions.
      </p>

      <h2 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '26px', color: '#111' }}>Interactive Core Geometry</h2>
      <p>
        Explore a slice of a simulated reactor core geometry directly below. The interactive window loads the VTI data used in my SULI analysis and provides a quick look at packing density and volume features.
      </p>
      <VtiViewer height={500} />
    </div>
  );
}

export default PebbleBedReactors;

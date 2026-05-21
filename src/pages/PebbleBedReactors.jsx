import PebbleCoreViewer from '../components/PebbleCoreViewer';
import assetPath from '../utils/assetPath';

function PebbleBedReactors() {
  return (
    <div>
      <div className="page-header">
        <h1>Pebble Bed Nuclear Reactors</h1>
      </div>

      <p>
        This page showcases my SULI work on modeling advanced pebble bed nuclear reactors. The project focuses on simulating the motion of pebbles as the reactor operates, and how the gamma spectrum evolves as the reactor operates. The poster below summarizes the simulation workflow, benchmarking, and design insights I presented during the program.
      </p>

      <div>
        <iframe
          src={assetPath('Anderson_R_poster_final.pdf')}
          className="document-frame"
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

      <h2 className="section-title">Interactive Core Geometry</h2>
      <p>
        Explore an OpenMC pebble-bed core directly below. The interactive view shows explicit pebble surfaces with neutron histories overlaid from the transport run.
      </p>
      <PebbleCoreViewer height={560} />
    </div>
  );
}

export default PebbleBedReactors;

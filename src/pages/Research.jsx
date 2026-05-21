import { Link } from 'react-router-dom';

function Research() {
  return (
    <div>
      <div className="page-header">
        <h1>Research</h1>
        <p>Selected work in computational astrophysics, particle physics data analysis, and aerospace simulation.</p>
      </div>

      <div className="project-grid">
        <article className="project-card">
          <h2>
            <Link className="page-link" to="/pproject">
              Capture Rate of Planetesimals in Collapsing Proto-Stars
            </Link>
          </h2>
          <p>
            Study of planetesimal capture in collapsing protostars using semi-analytic collapse models and numerical
            orbital integrations.
          </p>
        </article>

        <article className="project-card">
          <h2>
            <Link className="page-link" to="/nextdataanalysis">
              Analysis of NEXT Experiment Data
            </Link>
          </h2>
          <p>
            Pulse fitting, detector response studies, and simulation support for neutrinoless double beta decay research.
          </p>
        </article>

        <article className="project-card">
          <h2>
            <Link className="page-link" to="/missilesystems">
              Aerospace Project: Missile Systems Innovation
            </Link>
          </h2>
          <p>
            Low-cost missile concept work combining trajectory simulation, aerodynamics analysis, and computer vision.
          </p>
        </article>

        <article className="project-card">
          <h2>
            <Link className="page-link" to="/pebblebed">
              Pebble Bed Nuclear Reactors
            </Link>
          </h2>
          <p>
            Reactor modeling work with particle transport, pebble packing effects, and interactive geometry visualization.
          </p>
        </article>
      </div>
    </div>
  );
}

export default Research;

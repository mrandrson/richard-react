import { Link } from 'react-router-dom';

function Research() {
  return (
    <div>
      <div style={{ border: '1px solid black', padding: '10px' }}>
        <h1>
          <Link className="page-link" to="/pproject" style={{ fontSize: '28px' }}>
            Capture Rate of Planetesimals in Collapsing Proto-Stars
          </Link>
        </h1>
        <p>
          Projects include studying the capture rate of planetesimals in collapsing protostars, analyzing experimental data
          from the NEXT experiment, and developing missile systems design and simulation tools.
        </p>
        <hr />
        <h1>
          <Link className="page-link" to="/missilesystems" style={{ fontSize: '28px' }}>
            Aerospace Project: Missile Systems Innovation
          </Link>
        </h1>
        <p>
          This section highlights aerospace work ranging from low-cost missile concepts to machine learning powered
          tracking tools that support rapid prototyping at the UTEP Aerospace Center.
        </p>
      </div>
    </div>
  );
}

export default Research;

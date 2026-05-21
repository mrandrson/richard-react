import assetPath from '../utils/assetPath';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero">
      <div>
        <p className="eyebrow">University of Texas at El Paso</p>
        <h1>Richard Anderson</h1>

        <p className="hero-lede">
          Physics and mathematics graduate working across theoretical astrophysics, computational particle physics, and
          aerospace engineering.
        </p>

        <p>
          I hold bachelor&apos;s degrees in physics and mathematics from the University of Texas at El Paso, with 4 years
          of research experience in theoretical astrophysics, computational particle physics, and aerospace engineering.
          My research spans:
        </p>

        <ul className="hero-list">
          <li>Theoretical and computational astrophysics, investigating dynamics of planetesimals in protostellar disks.</li>
          <li>
            Aerospace Engineering, missile systems design, numerical simulation of aerodynamic systems, and applications of
            machine learning to computer vision.
          </li>
          <li>Data analysis and numerical simulation of nuclear and particle physics events.</li>
        </ul>

        <p>
          My notable coursework spans advanced astrophysics, graduate quantum mechanics, graduate electrodynamics,
          graduate analysis, and graduate algebra.
        </p>

        <div className="button-row">
          <a className="button" href={assetPath('resume.pdf')} target="_blank" rel="noreferrer">
            View CV
          </a>
          <Link className="button secondary" to="/rprojects">
            Research Projects
          </Link>
        </div>
      </div>

      <div className="portrait-card">
        <img
          src={assetPath('RichardAnderson_17436.png')}
          alt="Richard Anderson"
        />
      </div>
    </div>
  );
}

export default Home;

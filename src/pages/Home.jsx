import { Link } from 'react-router-dom';
import assetPath from '../utils/assetPath';

function ProjectEntry({ title, meta, children, links }) {
  return (
    <article className="research-entry">
      <h3>{title}</h3>
      <p className="project-meta">{meta}</p>
      <p>{children}</p>
      <div className="project-links" aria-label={`${title} links`}>
        {links.map((link) =>
          link.external ? (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ) : (
            <Link key={link.label} to={link.href}>
              {link.label}
            </Link>
          ),
        )}
      </div>
    </article>
  );
}

function Home() {
  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">Richard Anderson</h1>
          <p className="hero-lede">
            I am a physics and mathematics graduate with an affinity for solving problems that can be approached using physics, mathematics, and computing. My research has taken me from planet formation and particle physics to reactor
            modeling, and I hope to apply this background to studying higher energy astrophysical systems in graduate school.
          </p>

          <div className="button-row">
            <a className="button" href={assetPath('Anderson_CV.pdf')} target="_blank" rel="noreferrer">
              Read my CV
            </a>
            <Link className="button secondary" to="/research">
              Research
            </Link>
          </div>
        </div>

        <figure className="portrait-card">
          <img src={assetPath('RichardAnderson_17436.png')} alt="Portrait of Richard Anderson" />
          <figcaption className="portrait-details">
            <a href="mailto:richard.b.anderson@icloud.com">Email</a>
            <span aria-hidden="true">·</span>
            <a href="https://github.com/mrandrson" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </figcaption>
        </figure>
      </section>

      <section className="honors-strip" aria-labelledby="honors-title">
        <p className="section-kicker" id="honors-title">
          Honors
        </p>
        <p>NSF Graduate Research Fellowship Program, Honorable Mention (2026)</p>
        <p>Outstanding Senior in Physics, UTEP Department of Physics (2026)</p>
        <p>Terry Scholarship, Terry Foundation (2023 - 2027)</p>
      </section>

      <section className="home-section" aria-labelledby="selected-research-title">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2 id="selected-research-title">Research</h2>
          </div>
          <Link className="text-link" to="/research">
            View all research
          </Link>
        </div>

        <div className="research-list">
          <ProjectEntry
            title="Capture of planetesimals in collapsing protostars"
            meta="UTEP Astrophysics Theory Group · Dr. Kedron Silsbee · Aug 2022 - Present"
            links={[
              { label: 'Project', href: '/pproject' },
	      // { label: 'Notebook', href: assetPath('Planetesimal_Homogeneous_Model.html'), external: true },
              { label: 'Poster', href: assetPath('TAOAPS_Poster_3-3.pdf'), external: true },
            ]}
          >
            We use one-dimensional collapse models and REBOUND simulations to investigate the gravitational capture of
            freely floating planetesimals during protostellar collapse and estimate the largest body captured from a
            star’s birth cluster or the Galactic population.
          </ProjectEntry>

          <ProjectEntry
            title="Pebble-bed reactor burnup modeling"
            meta="Brookhaven National Laboratory · Odera Dim · Jun–Aug 2025"
            links={[
              { label: 'Project', href: '/pebblebed' },
              { label: 'Poster', href: assetPath('Anderson_R_poster_final.pdf'), external: true },
            ]}
          >
            This project uses LIGGGHTS and OpenMC to model pebble motion and fuel burnup, with the aim of generating
            neutron and gamma-ray spectra for training a machine-learning model to predict burnup.
          </ProjectEntry>

          <ProjectEntry
            title="NEXT detector data analysis"
            meta="UT Arlington, Neutrino and Rare Event Searches · Dr. Ben Jones and Dr. Krishan Mistry · May - Dec 2024"
            links={[{ label: 'Project', href: '/nextdataanalysis' }]}
          >
            Two projects focus on electron-ion recombination in NEXT-100 alpha-particle events and the electron-energy
            and angular spectra predicted by different neutrinoless double-beta decay mechanisms, using NEXUS and nuDoBE.
          </ProjectEntry>
        </div>
      </section>

    </div>
  );
}

export default Home;

import { Link } from 'react-router-dom';
import assetPath from '../utils/assetPath';

const projects = [
  {
    title: 'Capture of planetesimals in collapsing protostars',
    path: '/pproject',
    meta: 'UTEP Astrophysics Theory Group · Dr. Kedron Silsbee · Aug 2022–May 2026',
    summary:
      'Semi-analytic collapse models and REBOUND orbital simulations used to study when freely floating planetesimals are captured during star formation. Manuscript in preparation.',
    resources: [{ label: 'Poster', href: assetPath('TAOAPS_Poster_3-3.pdf') }],
  },
  {
    title: 'Pebble-bed reactor burnup modeling',
    path: '/pebblebed',
    meta: 'Brookhaven National Laboratory · Odera Dim · Jun–Aug 2025',
    summary:
      'A coupled LIGGGHTS, OpenMC, and TensorFlow workflow for modeling reactor geometry and estimating fuel burnup and operating time from simulated gamma-ray spectra.',
    resources: [{ label: 'Poster', href: assetPath('Anderson_R_poster_final.pdf') }],
  },
  {
    title: 'NEXT detector data analysis',
    path: '/nextdataanalysis',
    meta: 'UT Arlington, Neutrino and Rare Event Searches · Dr. Ben Jones and Dr. Krishan Mistry · May–Dec 2024',
    summary:
      'Waveform analysis of S1 and S2 pulses plus Geant4/NEXUS simulations used to study detector response, charge transport, and backgrounds.',
    resources: [],
  },
];

function Research() {
  return (
    <div>
      <div className="page-header">
        <p className="section-kicker">Selected work</p>
        <h1>Research</h1>
        <p>Computational astrophysics, particle and nuclear physics data analysis, and scientific simulation.</p>
      </div>

      <div className="research-list research-page-list">
        {projects.map((project) => (
          <article className="research-entry" key={project.path}>
            <h2>
              <Link className="page-link" to={project.path}>
                {project.title}
              </Link>
            </h2>
            <p className="project-meta">{project.meta}</p>
            <p>{project.summary}</p>
            <div className="project-links">
              <Link to={project.path}>Project</Link>
              {project.resources.map((resource) => (
                <a key={resource.label} href={resource.href} target="_blank" rel="noreferrer">
                  {resource.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}

export default Research;

import assetPath from '../utils/assetPath';

function CV() {
  const cvPath = assetPath('Anderson_CV.pdf');

  return (
    <div>
      <div className="page-header">
        <p className="section-kicker">Curriculum vitae</p>
        <h1>CV</h1>
        <p>Education, research experience, teaching, technical work, presentations, and honors.</p>
      </div>

      <div className="button-row cv-actions">
        <a className="button" href={cvPath} download="Anderson_CV.pdf">
          Download CV
        </a>
        <a className="button secondary" href={cvPath} target="_blank" rel="noreferrer">
          Open in new tab
        </a>
      </div>

      <iframe className="document-frame cv-frame" src={cvPath} title="Richard Anderson curriculum vitae" />
    </div>
  );
}

export default CV;

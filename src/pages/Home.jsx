import assetPath from '../utils/assetPath';

function Home() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, paddingRight: '20px', textAlign: 'justify', minWidth: '280px' }}>
        <p>
          <br />
          Mathematics &amp; Physics Undergraduate
          <br />
          University of Texas at El Paso
        </p>

        <p>
          I am a senior undergraduate with 3 years of research experience in theoretical astrophysics,
          computational particle physics, and aerospace engineering. My research spans:
        </p>

        <ul>
          <li>Theoretical and computational astrophysics, investigating dynamics of planetesimals in protostellar disks.</li>
          <li>
            Aerospace Engineering, missile systems design, numerical simulation of aerodynamic systems, and applications of
            machine learning to computer vision.
          </li>
          <li>Data analysis and numerical simulation of nuclear and particle physics events.</li>
        </ul>

        <p>In addition to research, I have completed advanced coursework in astrophysics, electrodynamics, real analysis, and abstract algebra.</p>

        <p>
          View my{' '}
          <a href={assetPath('resume.pdf')} target="_blank" rel="noreferrer">
            <strong>CV here</strong>
          </a>
          .
        </p>
      </div>

      <div style={{ flex: 1, textAlign: 'center', minWidth: '260px' }}>
        <img
          src={assetPath('RichardAnderson_17436.png')}
          alt="Richard Anderson"
          style={{ maxWidth: '75%', height: 'auto' }}
        />
      </div>
    </div>
  );
}

export default Home;

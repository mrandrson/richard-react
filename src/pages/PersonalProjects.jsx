function PersonalProjects() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', margin: 0, color: '#111' }}>Personal Projects</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, textAlign: 'center', minWidth: '280px' }}>
          <a className="page-link" href="/assets/files/Spinning_Pendulum.pdf" style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>
            Spinning Pendulum
          </a>
          <figure style={{ margin: 0 }}>
            <img src="/assets/files/spinning_pendulum.gif" alt="Spherical Pendulum Motion" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
            <figcaption style={{ fontSize: '16px', color: '#111', textAlign: 'left', marginTop: '8px' }}>
              Simulation of a spinning pendulum I wrote in C, with plotting handled in Python.
            </figcaption>
          </figure>
        </div>

        <div style={{ flex: 1, textAlign: 'center', minWidth: '280px' }}>
          <a className="page-link" href="/assets/files/Galaxy_Collision.pdf" style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>
            N-Body Simulation
          </a>
          <figure style={{ margin: 0 }}>
            <video autoPlay muted loop playsInline style={{ width: '100%', maxHeight: '400px' }}>
              <source src="/assets/files/BinaryCollision.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <figcaption style={{ fontSize: '16px', color: '#111', textAlign: 'left', marginTop: '8px' }}>
              N-body simulation utilizing a quadtree structure and multipole expansion for faster integration of gravitational interactions.
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default PersonalProjects;

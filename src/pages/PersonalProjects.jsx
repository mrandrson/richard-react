import assetPath from '../utils/assetPath';
import { Link } from 'react-router-dom';

function PersonalProjects() {
  return (
    <div>
      <div className="page-header">
        <p className="section-kicker">Selected repositories</p>
        <h1>Code & simulations</h1>
        <p>Independent computational physics projects with working numerical models and visual results.</p>
      </div>

      <div className="media-grid">
        <article className="media-card">
          <h2>
            <Link className="page-link" to="/nbodysimulation">
              N-Body Simulation
            </Link>
          </h2>
          <figure>
            <video autoPlay muted loop playsInline>
              <source src={assetPath('BinaryCollision.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <figcaption>
              N-body simulation utilizing a quadtree structure and multipole expansion for faster integration of gravitational interactions.
            </figcaption>
          </figure>
        </article>

        <article className="media-card">
          <h2>
            <Link className="page-link" to="/spectrallearning">
              Spectral Methods and Neural Operators
            </Link>
          </h2>
          <figure>
            <video autoPlay muted loop playsInline>
              <source src={assetPath('fno_ns2d_fno.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <figcaption>
              A Fourier neural operator approximates the finite-time evolution of two-dimensional incompressible
              Navier-Stokes flow in vorticity form.
            </figcaption>
          </figure>
        </article>

        <article className="media-card">
          <h2>
            <Link className="page-link" to="/spinningpendulum">
              Spinning Pendulum
            </Link>
          </h2>
          <figure>
            <img src={assetPath('spinning_pendulum.gif')} alt="Spherical Pendulum Motion" />
            <figcaption>
              I derive the spherical-pendulum equations of motion in a rotating coordinate frame and integrate them
              numerically in C, with visualization in Python.
            </figcaption>
          </figure>
        </article>

        <article className="media-card">
          <h2>
            <Link className="page-link" to="/quantumwavepacket">
              Quantum Wave Packet Simulation
            </Link>
          </h2>
          <figure>
            <video autoPlay muted loop playsInline>
              <source src={assetPath('quantumwave.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <figcaption>
              I calculate the scattering of a two-dimensional quantum wave packet by a smooth potential using the
              split-step Fourier method.
            </figcaption>
          </figure>
        </article>

      </div>
    </div>
  );
}

export default PersonalProjects;

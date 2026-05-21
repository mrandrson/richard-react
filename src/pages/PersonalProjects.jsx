import assetPath from '../utils/assetPath';
import { Link } from 'react-router-dom';

function PersonalProjects() {
  return (
    <div>
      <div className="page-header">
        <h1>Personal Projects</h1>
        <p>Independent computational physics projects and numerical simulation work.</p>
      </div>

      <div className="media-grid">
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
              Fourier neural operator trained as a surrogate for two-dimensional Navier-Stokes vorticity dynamics.
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
              Split-step Fourier simulation of a two-dimensional quantum wave packet scattering from a smooth potential.
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
              Simulation of a spinning pendulum I wrote in C, with plotting handled in Python.
            </figcaption>
          </figure>
        </article>

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

      </div>
    </div>
  );
}

export default PersonalProjects;

import assetPath from '../utils/assetPath';

function MathBlock({ children }) {
  return <div className="math-block">{children}</div>;
}

function QuantumWavePacket() {
  return (
    <div>
      <div className="page-header project-page-header">
        <h1>Quantum Wave Packet Simulation</h1>
        <p>
          I calculate the evolution of a two-dimensional quantum wave packet using the split-step Fourier method
          to solve the time-dependent Schrödinger equation.
        </p>
      </div>

      <figure className="media-card">
        <video autoPlay muted loop playsInline>
          <source src={assetPath('quantumwave.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <figcaption>
          Probability density <span>{String.raw`\(|\psi(x,y,t)|^2\)`}</span> as a function of time as the wave packet
          scatters from the Gaussian potential barrier.
        </figcaption>
      </figure>

      <section className="writeup-section">
        <h2>Equation</h2>
        <p>
          I consider a wavefunction governed by the time-dependent Schrödinger equation,
        </p>
        <MathBlock>{String.raw`\[
i\hbar\frac{\partial \psi}{\partial t}
=
-\frac{\hbar^2}{2m}\nabla^2\psi
+
V(x,y)\psi.
\]`}</MathBlock>
        <p>
          I adopt units in which <span>{String.raw`\(\hbar=m=1\)`}</span> and impose periodic boundary conditions on
          the two-dimensional domain. The animation shows the probability density{' '}
          <span>{String.raw`\(|\psi(x,y,t)|^2\)`}</span>.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Initial State</h2>
        <p>
          I take the initial state to be a localized Gaussian wave packet multiplied by a plane-wave phase factor:
        </p>
        <MathBlock>{String.raw`\[
\psi(x,y,0)
\propto
\exp\left(
-\frac{(x-x_0)^2+(y-y_0)^2}{2\sigma^2}
\right)
\exp(i k_0 x).
\]`}</MathBlock>
        <p>
          The Gaussian envelope localizes the probability density near <span>{String.raw`\((x_0,y_0)\)`}</span>,
          while the phase factor gives the wave packet a mean momentum in the positive{' '}
          <span>{String.raw`\(x\)`}</span> direction. I normalize the initial wavefunction on the numerical grid so that
        </p>
        <MathBlock>{String.raw`\[
\sum_{i,j}|\psi_{ij}|^2\,\Delta x\,\Delta y = 1.
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Potential</h2>
        <p>
          I assume a smooth Gaussian potential barrier centered in the domain, given in dimensionless form by
        </p>
        <MathBlock>{String.raw`\[
V(x,y)
=
V_0
\exp\left(
-\left[(x-L/2)^2+(y-L/2)^2\right]
\right).
\]`}</MathBlock>
        <p>
          As the wave packet encounters the barrier, the wavefunction develops transmitted and reflected components.
          The resulting scattering and interference appear in the evolution of the probability density.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Split-Step Fourier Method</h2>
        <p>
          I evaluate the kinetic term in Fourier space, where the Laplacian is diagonal. For a plane-wave mode{' '}
          <span>{String.raw`\(\exp(i k_x x+i k_y y)\)`}</span>,
        </p>
        <MathBlock>{String.raw`\[
\nabla^2 \longrightarrow -(k_x^2+k_y^2).
\]`}</MathBlock>
        <p>
          I split the Hamiltonian into kinetic and potential terms. Since these operators do not commute, I
          approximate the evolution over each time interval using symmetric Strang splitting. With{' '}
          <span>{String.raw`\(k^2=k_x^2+k_y^2\)`}</span>, the update is
        </p>
        <MathBlock>{String.raw`\[
\psi(t+\Delta t)
\approx
\exp\left(-\frac{i}{2}V\Delta t\right)
\mathcal{F}^{-1}
\left[
\exp\left(-\frac{i}{2}k^2\Delta t\right)
\mathcal{F}
\left[
\exp\left(-\frac{i}{2}V\Delta t\right)\psi(t)
\right]
\right].
\]`}</MathBlock>
        <p>
          I apply the potential evolution pointwise in physical space and the kinetic evolution pointwise in Fourier
          space. This allows efficient evaluation of each timestep and preserves the wavefunction norm to numerical
          precision.
        </p>
      </section>
    </div>
  );
}

export default QuantumWavePacket;

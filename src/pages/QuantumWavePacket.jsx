import assetPath from '../utils/assetPath';

function MathBlock({ children }) {
  return <div className="math-block">{children}</div>;
}

function QuantumWavePacket() {
  return (
    <div>
      <div className="page-header">
        <h1>Quantum Wave Packet Simulation</h1>
        <p>A split-step Fourier simulation of the time-dependent Schrödinger equation in two spatial dimensions.</p>
      </div>

      <figure className="media-card">
        <video autoPlay muted loop playsInline>
          <source src={assetPath('quantumwave.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <figcaption>Time evolution of the probability density <span>{String.raw`\(|\psi(x,y,t)|^2\)`}</span>.</figcaption>
      </figure>

      <section className="writeup-section">
        <h2>Equation</h2>
        <p>
          The simulation evolves the time-dependent Schrödinger equation
        </p>
        <MathBlock>{String.raw`\[
i\hbar\frac{\partial \psi}{\partial t}
=
-\frac{\hbar^2}{2m}\nabla^2\psi
+
V(x,y)\psi.
\]`}</MathBlock>
        <p>
          The code works in units where <span>{String.raw`\(\hbar=m=1\)`}</span> on a periodic two-dimensional domain.
          The displayed quantity is the probability density <span>{String.raw`\(|\psi(x,y,t)|^2\)`}</span>.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Initial State</h2>
        <p>
          The initial state is a localized Gaussian wave packet with a plane-wave phase factor. In the notebook this is
          initialized proportional to
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
          The Gaussian envelope localizes the particle near <span>{String.raw`\((x_0,y_0)\)`}</span>, while the phase
          factor gives the packet average momentum in the positive <span>{String.raw`\(x\)`}</span> direction. The
          wavefunction is normalized so that
        </p>
        <MathBlock>{String.raw`\[
\sum_{i,j}|\psi_{ij}|^2\,\Delta x\,\Delta y = 1.
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Potential</h2>
        <p>
          The simulation uses a dimensionless smooth Gaussian barrier centered in the domain:
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
          As the packet reaches the barrier, part of the wave is transmitted and part is reflected, producing visible
          scattering and interference in the probability density.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Split-Step Fourier Method</h2>
        <p>
          On a periodic grid, Fourier modes diagonalize the Laplacian. For a plane wave{' '}
          <span>{String.raw`\(\exp(i k_x x+i k_y y)\)`}</span>,
        </p>
        <MathBlock>{String.raw`\[
\nabla^2 \longrightarrow -(k_x^2+k_y^2).
\]`}</MathBlock>
        <p>
          The Hamiltonian is split into kinetic and potential parts. Since these do not commute exactly, the code uses a
          symmetric Strang splitting, with <span>{String.raw`\(k^2=k_x^2+k_y^2\)`}</span>:
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
          The potential step is applied pointwise in real space, while the kinetic step is applied pointwise in Fourier
          space. This makes each timestep efficient and preserves the wavefunction norm up to numerical precision.
        </p>
      </section>
    </div>
  );
}

export default QuantumWavePacket;

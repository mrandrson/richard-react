import assetPath from '../utils/assetPath';

function SpectralLearning() {
  return (
    <div>
      <div className="page-header project-page-header">
        <h1>2D Navier-Stokes Fourier Neural Operator</h1>
        <p>
          I use a Fourier neural operator to approximate the finite-time evolution of two-dimensional incompressible
          Navier-Stokes flow in vorticity form, subject to periodic boundary conditions.
        </p>
        <p>
          This implementation adapts the Fourier neural operator of{' '}
          <a href="https://arxiv.org/abs/2010.08895" target="_blank" rel="noreferrer">Li et al. (2021)</a>,
          with a different flow configuration, prediction task, and training objective.
        </p>
      </div>

      <div className="media-grid three-up">
        <figure className="media-card">
          <video autoPlay muted loop playsInline>
            <source src={assetPath('fno_ns2d_solver.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <figcaption>Reference solution calculated with a pseudospectral fourth-order Runge-Kutta solver.</figcaption>
        </figure>
        <figure className="media-card">
          <video autoPlay muted loop playsInline>
            <source src={assetPath('fno_ns2d_fno.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <figcaption>Vorticity field predicted by the Fourier neural operator at the corresponding output times.</figcaption>
        </figure>
        <figure className="media-card">
          <video autoPlay muted loop playsInline>
            <source src={assetPath('fno_ns2d_absolute_error.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <figcaption>Absolute pointwise difference between the predicted vorticity and the reference numerical solution.</figcaption>
        </figure>
      </div>

      <section className="writeup-section">
        <h2>Equation</h2>
        <p>
          I consider the two-dimensional incompressible Navier-Stokes equations, written in vorticity form:
        </p>
        <p className="math-block">{String.raw`\[
          \omega_t + u \cdot \nabla \omega = \nu \Delta \omega,
          \qquad
          u = (\psi_y, -\psi_x),
          \qquad
          -\Delta \psi = \omega.
        \]`}</p>
        <p>
          Here <span>{String.raw`\(\omega(x,y,t)\)`}</span> is the vorticity,{' '}
          <span>{String.raw`\(u(x,y,t)\)`}</span> is the incompressible velocity field obtained from the
          streamfunction <span>{String.raw`\(\psi\)`}</span>, and <span>{String.raw`\(\nu\)`}</span> is the kinematic
          viscosity. I impose periodic
          boundary conditions on the domain{' '}
          <span>{String.raw`\([0, 2\pi)^2\)`}</span>.
        </p>
        <p>
          I consider unforced flow. The original paper’s Navier-Stokes benchmark instead includes a fixed forcing
          term on the unit torus, as described in{' '}
          <a href="https://arxiv.org/pdf/2010.08895v3#page=8" target="_blank" rel="noreferrer">Section 5.3</a>.
          I denote vorticity by <span>{String.raw`\(\omega\)`}</span>; the paper uses{' '}
          <span>{String.raw`\(w\)`}</span>.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Operator Learning Setup</h2>
        <p>
          I approximate the finite-time solution operator that maps an initial vorticity field, viscosity, and output
          time to the corresponding vorticity field. Writing the exact operator as{' '}
          <span>{String.raw`\(\mathcal G^\dagger\)`}</span> and its learned approximation as{' '}
          <span>{String.raw`\(\mathcal G_\theta\)`}</span>,
        </p>
        <p className="math-block">{String.raw`\[
          \mathcal{G}^{\dagger}:
          \left(\omega_0, \nu, T\right)
          \mapsto
          \omega(\cdot,T),
          \qquad
          \mathcal G_\theta \approx \mathcal G^\dagger.
        \]`}</p>
        <p>
          The input and output are spatial fields; the dot denotes the spatial arguments. The trainable parameters
          are collected in <span>{String.raw`\(\theta\)`}</span>, and spatial coordinates are supplied to the network
          as additional input channels. My model predicts a field directly at a specified time, conditioned on
          viscosity and output time. In the original Navier-Stokes benchmark, the input is an initial time history
          and the output is its subsequent evolution.
        </p>
        <p>
          To generate the training data, I sample smooth random initial vorticity fields, add coherent vortices, and
          select a viscosity. I then evolve each initial condition with a pseudospectral fourth-order Runge-Kutta
          solver and train the neural operator to approximate the resulting vorticity field at the chosen output time.
          The original paper’s data generator uses a pseudospectral method with a semi-implicit Crank–Nicolson update
          instead; see{' '}
          <a href="https://arxiv.org/pdf/2010.08895v3#page=15" target="_blank" rel="noreferrer">Appendix A.3.3</a>.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Fourier Layer</h2>
        <p>
          Each Fourier neural operator block combines a local linear transformation of the feature channels in
          physical space with a convolution evaluated in Fourier space. In two dimensions, the update has the form
        </p>
        <p className="math-block">{String.raw`\[
          v_{k+1}(x,y) =
          \sigma\left(
            W_k v_k(x,y) +
            \mathcal{F}^{-1}
            \left[
              R_k(\xi_1,\xi_2)\,
              \mathcal{F}[v_k](\xi_1,\xi_2)
            \right](x,y)
          \right).
        \]`}</p>
        <p>
          Here <span>{String.raw`\(k\)`}</span> indexes network layers,{' '}
          <span>{String.raw`\(v_k\)`}</span> is a latent feature field with{' '}
          <span>{String.raw`\(d_v\)`}</span> channels, and <span>{String.raw`\(W_k\)`}</span> is a learned linear
          transformation acting on those channels at each spatial point. The activation{' '}
          <span>{String.raw`\(\sigma\)`}</span> acts componentwise, while{' '}
          <span>{String.raw`\(\mathcal F\)`}</span> and <span>{String.raw`\(\mathcal F^{-1}\)`}</span> denote the
          spatial Fourier transform and its inverse.
        </p>
        <p>
          I retain a fixed number of low-frequency modes in each spatial direction. At each retained mode{' '}
          <span>{String.raw`\((\xi_1,\xi_2)\)`}</span>, the learned weight{' '}
          <span>{String.raw`\(R_k(\xi_1,\xi_2)\in\mathbb C^{d_v\times d_v}\)`}</span> is a complex matrix that
          mixes feature channels. Modes outside the retained set are set to zero in the Fourier branch. This update
          combines the local transformation and Fourier integral operator in Equations 2–5 of the original paper.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Loss and Diagnostics</h2>
        <p>
          For training sample <span>{String.raw`\(i\)`}</span>, let{' '}
          <span>{String.raw`\(a_i=(\omega_{0,i},\nu_i,T_i)\)`}</span> denote the operator input,{' '}
          <span>{String.raw`\(\widehat\omega_i=\mathcal G_\theta(a_i)\)`}</span> the predicted field, and{' '}
          <span>{String.raw`\(\omega_i^{\rm ref}=\omega_i(\cdot,T_i)\)`}</span> the reference numerical solution.
          I minimize the spatial mean squared error together with a weak penalty on the difference in an
          enstrophy-like statistic:
        </p>
        <p className="math-block">{String.raw`\[
          \begin{aligned}
          \ell_i(\theta)
          &= \left\langle\left|\widehat\omega_i-\omega_i^{\rm ref}\right|^2\right\rangle
          +\lambda\left(E[\widehat\omega_i]-E[\omega_i^{\rm ref}]\right)^2,\\
          \mathcal L(\theta)
          &=\frac{1}{N_{\rm train}}\sum_{i=1}^{N_{\rm train}}\ell_i(\theta),
          \qquad E[\omega]=\langle\omega^2\rangle.
          \end{aligned}
        \]`}</p>
        <p>
          Angle brackets denote the arithmetic mean over the uniform spatial grid,{' '}
          <span>{String.raw`\(\langle q\rangle=(N_xN_y)^{-1}\sum_{p=1}^{N_x}\sum_{r=1}^{N_y}q_{pr}\)`}</span>,
          where <span>{String.raw`\(N_x\)`}</span> and <span>{String.raw`\(N_y\)`}</span> are the numbers of grid
          points in each direction. I average the sample losses over the{' '}
          <span>{String.raw`\(N_{\rm train}\)`}</span> training examples;{' '}
          <span>{String.raw`\(\lambda\)`}</span> controls the penalty weight.
          The statistic <span>{String.raw`\(E[\omega]=\langle\omega^2\rangle\)`}</span> is the mean squared
          vorticity. This penalty is a choice specific to this implementation and is not part of the original paper’s
          stated training formulation.
        </p>
        <p>
          The animations compare the reference numerical solution,
          the neural-operator prediction, and their absolute pointwise difference. I use this comparison to assess
          whether the predicted field reproduces advective transport and viscous diffusion more accurately than a
          baseline that leaves the initial vorticity unchanged.
        </p>
      </section>

    </div>
  );
}

export default SpectralLearning;

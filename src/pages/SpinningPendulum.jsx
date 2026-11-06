import assetPath from '../utils/assetPath';

function MathBlock({ children }) {
  return <div className="math-block">{children}</div>;
}

function SpinningPendulum() {
  return (
    <div>
      <div className="page-header project-page-header">
        <h1>Spherical Pendulum from an Induced Metric</h1>
        <p>
          I derive the equations of motion for a spherical pendulum in a uniformly rotating azimuthal frame using
          the metric induced by the coordinate transformation.
        </p>
      </div>

      <figure className="media-card">
        <img src={assetPath('spinning_pendulum.gif')} alt="Spherical pendulum motion" />
        <figcaption>
          Numerical solution of the spherical-pendulum equations of motion, calculated in C and visualized in Python.
        </figcaption>
      </figure>

      <section className="writeup-section">
        <p>
          I consider a spherical pendulum whose azimuthal coordinate is measured in a frame rotating with constant
          angular velocity <span>{String.raw`\(\omega\)`}</span> about the vertical axis. I account for the rotation
          through the metric induced by this coordinate transformation, without introducing a separate centrifugal
          potential.
        </p>

        <p>I write the position of the pendulum bob as</p>
        <MathBlock>{String.raw`\[
x=l\sin\varphi\cos(\theta+\omega t),
\qquad
y=l\sin\varphi\sin(\theta+\omega t),
\qquad
z=-l\cos\varphi .
\]`}</MathBlock>

        <p>
          Here <span>{String.raw`\(l\)`}</span> is the fixed pendulum length,{' '}
          <span>{String.raw`\(\varphi\)`}</span> is the polar angle measured from the downward vertical, and{' '}
          <span>{String.raw`\(\theta\)`}</span> is the azimuthal coordinate in the rotating frame. The corresponding
          inertial azimuthal angle is
        </p>
        <MathBlock>{String.raw`\[
\psi = \theta+\omega t .
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Induced Metric</h2>
        <p>
          To calculate the kinetic energy, I first obtain the spatial line element in the rotating coordinates.
          The Euclidean line element is
        </p>
        <MathBlock>{String.raw`\[
d\ell^2 = dx^2+dy^2+dz^2 .
\]`}</MathBlock>

        <p>Constraining the motion to a sphere of radius <span>{String.raw`\(l\)`}</span> gives</p>
        <MathBlock>{String.raw`\[
d\ell^2
=
l^2d\varphi^2
+
l^2\sin^2\varphi\,d\psi^2 .
\]`}</MathBlock>

        <p>Differentiating <span>{String.raw`\(\psi=\theta+\omega t\)`}</span> gives</p>
        <MathBlock>{String.raw`\[
d\psi=d\theta+\omega dt.
\]`}</MathBlock>

        <p>Substituting into the line element, I obtain</p>
        <MathBlock>{String.raw`\[
d\ell^2
=
l^2d\varphi^2
+
l^2\sin^2\varphi(d\theta+\omega dt)^2 .
\]`}</MathBlock>

        <p>Expanding this expression gives</p>
        <MathBlock>{String.raw`\[
d\ell^2
=
l^2d\varphi^2
+
l^2\sin^2\varphi\,d\theta^2
+
2\omega l^2\sin^2\varphi\,dt\,d\theta
+
\omega^2l^2\sin^2\varphi\,dt^2 .
\]`}</MathBlock>

        <p>
          Writing <span>{String.raw`\(d\ell^2 = g_{ab}dq^a dq^b\)`}</span> in the coordinates{' '}
          <span>{String.raw`\(q^a=(t,\varphi,\theta)\)`}</span>, I identify the components
        </p>
        <MathBlock>{String.raw`\[
[g_{ab}]
=
\begin{pmatrix}
\omega^2l^2\sin^2\varphi & 0 & \omega l^2\sin^2\varphi \\
0 & l^2 & 0 \\
\omega l^2\sin^2\varphi & 0 & l^2\sin^2\varphi
\end{pmatrix}.
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Lagrangian</h2>
        <p>I express the kinetic energy in terms of these components as</p>
        <MathBlock>{String.raw`\[
T
=
\frac12 m g_{ab}\dot{q}^a\dot{q}^b .
\]`}</MathBlock>

        <p>
          Taking <span>{String.raw`\(t\)`}</span> as the time parameter gives{' '}
          <span>{String.raw`\(\dot{t}=1\)`}</span>, and hence
        </p>
        <MathBlock>{String.raw`\[
\begin{aligned}
T
&=
\frac12 m
\left[
\omega^2l^2\sin^2\varphi
+
l^2\dot{\varphi}^2
+
l^2\sin^2\varphi\,\dot{\theta}^2
+
2\omega l^2\sin^2\varphi\,\dot{\theta}
\right] \\
&=
\frac12 ml^2
\left[
\dot{\varphi}^2
+
\sin^2\varphi(\dot{\theta}+\omega)^2
\right].
\end{aligned}
\]`}</MathBlock>

        <p>
          The gravitational potential energy is <span>{String.raw`\(U_g=mgz\)`}</span>. Substituting{' '}
          <span>{String.raw`\(z=-l\cos\varphi\)`}</span> gives
        </p>
        <MathBlock>{String.raw`\[
U_g=-mgl\cos\varphi.
\]`}</MathBlock>

        <p>Combining the kinetic and potential energies, I obtain the Lagrangian</p>
        <MathBlock>{String.raw`\[
\boxed{
\mathcal{L}
=
\frac12 ml^2
\left[
\dot{\varphi}^2
+
\sin^2\varphi(\dot{\theta}+\omega)^2
\right]
+
mgl\cos\varphi
}
\]`}</MathBlock>

        <p>
          The rotational terms in the Lagrangian follow directly from the coordinate transformation{' '}
          <span>{String.raw`\(d\theta \mapsto d\theta+\omega dt\)`}</span>. The induced metric therefore already
          accounts for the effects of the rotating frame. Adding a separate centrifugal potential would include
          the same contribution a second time.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Equations of Motion</h2>
        <p>I apply the Euler-Lagrange equation to the polar coordinate <span>{String.raw`\(\varphi\)`}</span>:</p>
        <MathBlock>{String.raw`\[
\frac{d}{dt}
\left(
\frac{\partial \mathcal{L}}{\partial \dot{\varphi}}
\right)
-
\frac{\partial \mathcal{L}}{\partial \varphi}
=0.
\]`}</MathBlock>

        <p>The derivatives with respect to the polar velocity give</p>
        <MathBlock>{String.raw`\[
\frac{\partial \mathcal{L}}{\partial \dot{\varphi}}
=
ml^2\dot{\varphi},
\qquad
\frac{d}{dt}
\left(
\frac{\partial \mathcal{L}}{\partial \dot{\varphi}}
\right)
=
ml^2\ddot{\varphi}.
\]`}</MathBlock>

        <p>The derivative with respect to the polar angle is</p>
        <MathBlock>{String.raw`\[
\frac{\partial \mathcal{L}}{\partial \varphi}
=
ml^2\sin\varphi\cos\varphi(\dot{\theta}+\omega)^2
-
mgl\sin\varphi.
\]`}</MathBlock>

        <p>Substituting these expressions and dividing by <span>{String.raw`\(ml^2\)`}</span>, I obtain</p>
        <MathBlock>{String.raw`\[
\boxed{
\ddot{\varphi}
=
\sin\varphi\cos\varphi(\dot{\theta}+\omega)^2
-
\frac{g}{l}\sin\varphi
}
\]`}</MathBlock>

        <p>
          The azimuthal coordinate <span>{String.raw`\(\theta\)`}</span> is cyclic: the Lagrangian has no explicit
          dependence on <span>{String.raw`\(\theta\)`}</span>, and therefore{' '}
          <span>{String.raw`\(\partial\mathcal{L}/\partial\theta=0\)`}</span>. Its conjugate momentum is
        </p>
        <MathBlock>{String.raw`\[
p_\theta
=
\frac{\partial \mathcal{L}}{\partial \dot{\theta}}
=
ml^2\sin^2\varphi(\dot{\theta}+\omega).
\]`}</MathBlock>

        <p>The Euler-Lagrange equation then requires</p>
        <MathBlock>{String.raw`\[
\frac{d}{dt}
\left(
ml^2\sin^2\varphi(\dot{\theta}+\omega)
\right)
=0.
\]`}</MathBlock>

        <p>For constant <span>{String.raw`\(\omega\)`}</span>, differentiating gives</p>
        <MathBlock>{String.raw`\[
ml^2
\left[
2\sin\varphi\cos\varphi\,\dot{\varphi}(\dot{\theta}+\omega)
+
\sin^2\varphi\,\ddot{\theta}
\right]
=0.
\]`}</MathBlock>

        <p>Dividing by <span>{String.raw`\(ml^2\sin^2\varphi\)`}</span> gives</p>
        <MathBlock>{String.raw`\[
\boxed{
\ddot{\theta}
+
2(\dot{\theta}+\omega)\dot{\varphi}\cot\varphi
=
0
}
\]`}</MathBlock>

        <p>Combining the polar and azimuthal equations, the motion is governed by</p>
        <MathBlock>{String.raw`\[
\boxed{
\ddot{\varphi}
=
\sin\varphi\cos\varphi(\dot{\theta}+\omega)^2
-
\frac{g}{l}\sin\varphi
}
\qquad
\boxed{
\ddot{\theta}
+
2(\dot{\theta}+\omega)\dot{\varphi}\cot\varphi
=
0
}
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Steady Rotating Solution</h2>
        <p>
          The dependence on frame rotation enters through the induced metric. The off-diagonal component
          <span>{String.raw` \(g_{t\theta}=\omega l^2\sin^2\varphi\) `}</span> couples the frame rotation to the
          azimuthal velocity, while <span>{String.raw` \(g_{tt}=\omega^2l^2\sin^2\varphi\) `}</span> gives the kinetic
          contribution from motion that is stationary in the rotating coordinates.
        </p>

        <p>I next consider a steady solution in which the bob is stationary in the rotating frame:</p>
        <MathBlock>{String.raw`\[
\dot{\theta}=0,
\qquad
\ddot{\theta}=0,
\qquad
\dot{\varphi}=0,
\qquad
\ddot{\varphi}=0.
\]`}</MathBlock>

        <p>Under these assumptions, the <span>{String.raw`\(\varphi\)`}</span> equation reduces to</p>
        <MathBlock>{String.raw`\[
0
=
\omega^2\sin\varphi\cos\varphi
-
\frac{g}{l}\sin\varphi.
\]`}</MathBlock>

        <p>Factoring out <span>{String.raw`\(\sin\varphi\)`}</span> gives</p>
        <MathBlock>{String.raw`\[
\sin\varphi
\left(
\omega^2\cos\varphi
-
\frac{g}{l}
\right)
=0.
\]`}</MathBlock>

        <p>For the downward branch, the bob is either vertical or satisfies</p>
        <MathBlock>{String.raw`\[
\boxed{
\cos\varphi
=
\frac{g}{l\omega^2}
}
\]`}</MathBlock>

        <p>
          This relation gives the conical-pendulum condition, with the rotation rate required to satisfy{' '}
          <span>{String.raw`\(\omega^2 \geq g/l\)`}</span>. Increasing <span>{String.raw`\(\omega\)`}</span> reduces{' '}
          <span>{String.raw`\(\cos\varphi\)`}</span> and therefore increases <span>{String.raw`\(\varphi\)`}</span>.
          Since the vertical coordinate is <span>{String.raw`\(z=-l\cos\varphi\)`}</span>, increasing{' '}
          <span>{String.raw`\(\varphi\)`}</span> raises the bob relative to its lowest position. The equilibrium
          elevation thus follows from the Lagrangian constructed with the induced metric, without an additional
          centrifugal potential.
        </p>
      </section>
    </div>
  );
}

export default SpinningPendulum;

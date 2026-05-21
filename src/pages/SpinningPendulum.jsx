import assetPath from '../utils/assetPath';

function MathBlock({ children }) {
  return <div className="math-block">{children}</div>;
}

function SpinningPendulum() {
  return (
    <div>
      <div className="page-header">
        <h1>Spherical Pendulum from an Induced Metric</h1>
        <p>
          A derivation of the equations of motion for a spherical pendulum in a uniformly rotating azimuthal frame.
        </p>
      </div>

      <figure className="media-card">
        <img src={assetPath('spinning_pendulum.gif')} alt="Spherical pendulum motion" />
        <figcaption>Numerical spherical pendulum simulation written in C, with visualization handled in Python.</figcaption>
      </figure>

      <section className="writeup-section">
        <p>
          We derive the equations of motion for a spherical pendulum whose azimuthal motion is measured relative to a
          frame rotating with constant angular velocity <span>{String.raw`\(\omega\)`}</span> about the vertical axis. The
          goal is to avoid introducing a separate centrifugal potential by hand. Instead, the effect of the rotation is
          encoded directly into the metric induced by the rotating coordinate transformation.
        </p>

        <p>The position of the pendulum bob is</p>
        <MathBlock>{String.raw`\[
x=l\sin\varphi\cos(\theta+\omega t),
\qquad
y=l\sin\varphi\sin(\theta+\omega t),
\qquad
z=-l\cos\varphi .
\]`}</MathBlock>

        <p>
          Here, <span>{String.raw`\(l\)`}</span> is the fixed length of the pendulum,{' '}
          <span>{String.raw`\(\varphi\)`}</span> is the polar angle measured from the downward vertical direction, and{' '}
          <span>{String.raw`\(\theta\)`}</span> is the azimuthal coordinate measured in the rotating description. The
          inertial azimuthal angle is therefore
        </p>
        <MathBlock>{String.raw`\[
\psi = \theta+\omega t .
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Induced Metric</h2>
        <p>
          Rather than computing the velocity components directly, we compute the line element induced by the rotating
          azimuthal coordinate. The ordinary Euclidean spatial line element is
        </p>
        <MathBlock>{String.raw`\[
d\ell^2 = dx^2+dy^2+dz^2 .
\]`}</MathBlock>

        <p>For a particle constrained to move on a sphere of radius <span>{String.raw`\(l\)`}</span>,</p>
        <MathBlock>{String.raw`\[
d\ell^2
=
l^2d\varphi^2
+
l^2\sin^2\varphi\,d\psi^2 .
\]`}</MathBlock>

        <p>Since <span>{String.raw`\(\psi=\theta+\omega t\)`}</span>, we have</p>
        <MathBlock>{String.raw`\[
d\psi=d\theta+\omega dt.
\]`}</MathBlock>

        <p>Therefore,</p>
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
          Thus, if <span>{String.raw`\(d\ell^2 = g_{ab}dq^a dq^b\)`}</span> with coordinates{' '}
          <span>{String.raw`\(q^a=(t,\varphi,\theta)\)`}</span>, then
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
        <p>The kinetic energy is</p>
        <MathBlock>{String.raw`\[
T
=
\frac12 m g_{ab}\dot{q}^a\dot{q}^b .
\]`}</MathBlock>

        <p>Since <span>{String.raw`\(t\)`}</span> is the time parameter itself, <span>{String.raw`\(\dot{t}=1\)`}</span>. Thus,</p>
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

        <p>The gravitational potential energy is <span>{String.raw`\(U_g=mgz\)`}</span>. Since <span>{String.raw`\(z=-l\cos\varphi\)`}</span>,</p>
        <MathBlock>{String.raw`\[
U_g=-mgl\cos\varphi.
\]`}</MathBlock>

        <p>Therefore the Lagrangian is</p>
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
          This is the central point of the derivation. The rotational effects are already contained in the metric through the
          replacement <span>{String.raw`\(d\theta \mapsto d\theta+\omega dt\)`}</span>. Therefore, no separate centrifugal
          potential is needed. Adding such a term would count the same rotational effect twice.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Equations of Motion</h2>
        <p>For <span>{String.raw`\(\varphi\)`}</span>, the Euler-Lagrange equation is</p>
        <MathBlock>{String.raw`\[
\frac{d}{dt}
\left(
\frac{\partial \mathcal{L}}{\partial \dot{\varphi}}
\right)
-
\frac{\partial \mathcal{L}}{\partial \varphi}
=0.
\]`}</MathBlock>

        <p>We compute</p>
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

        <p>Next,</p>
        <MathBlock>{String.raw`\[
\frac{\partial \mathcal{L}}{\partial \varphi}
=
ml^2\sin\varphi\cos\varphi(\dot{\theta}+\omega)^2
-
mgl\sin\varphi.
\]`}</MathBlock>

        <p>Therefore, after dividing by <span>{String.raw`\(ml^2\)`}</span>,</p>
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
          For the azimuthal coordinate <span>{String.raw`\(\theta\)`}</span>, the Lagrangian has no explicit dependence
          on <span>{String.raw`\(\theta\)`}</span>, so{' '}
          <span>{String.raw`\(\partial\mathcal{L}/\partial\theta=0\)`}</span>. The conjugate momentum is
        </p>
        <MathBlock>{String.raw`\[
p_\theta
=
\frac{\partial \mathcal{L}}{\partial \dot{\theta}}
=
ml^2\sin^2\varphi(\dot{\theta}+\omega).
\]`}</MathBlock>

        <p>Therefore,</p>
        <MathBlock>{String.raw`\[
\frac{d}{dt}
\left(
ml^2\sin^2\varphi(\dot{\theta}+\omega)
\right)
=0.
\]`}</MathBlock>

        <p>Assuming <span>{String.raw`\(\omega\)`}</span> is constant, this gives</p>
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

        <p>Thus, the full equations of motion are</p>
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
          These equations show that the rotational effects arise directly from the induced metric. The off-diagonal term
          <span>{String.raw` \(g_{t\theta}=\omega l^2\sin^2\varphi\) `}</span> couples the imposed rotation to the
          azimuthal motion, while <span>{String.raw` \(g_{tt}=\omega^2l^2\sin^2\varphi\) `}</span> contains the kinetic
          energy associated with the imposed rotation itself.
        </p>

        <p>Now suppose the bob is stationary in the rotating coordinate system:</p>
        <MathBlock>{String.raw`\[
\dot{\theta}=0,
\qquad
\ddot{\theta}=0,
\qquad
\dot{\varphi}=0,
\qquad
\ddot{\varphi}=0.
\]`}</MathBlock>

        <p>The <span>{String.raw`\(\varphi\)`}</span> equation becomes</p>
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

        <p>Therefore either the bob hangs straight downward, or</p>
        <MathBlock>{String.raw`\[
\boxed{
\cos\varphi
=
\frac{g}{l\omega^2}
}
\]`}</MathBlock>

        <p>
          This is the conical pendulum condition. It shows that a nonvertical steady solution exists only when{' '}
          <span>{String.raw`\(\omega^2 \geq g/l\)`}</span>. As <span>{String.raw`\(\omega\)`}</span> increases,{' '}
          <span>{String.raw`\(\cos\varphi\)`}</span> decreases, so <span>{String.raw`\(\varphi\)`}</span> increases.
          Since the height of the bob is <span>{String.raw`\(z=-l\cos\varphi\)`}</span>, larger{' '}
          <span>{String.raw`\(\varphi\)`}</span> corresponds to a higher vertical position relative to the lowest point of
          the pendulum. Thus the vertical elevation does not need to be introduced through a separate centrifugal
          potential. It emerges directly from the metric induced by the rotating coordinate transformation.
        </p>
      </section>
    </div>
  );
}

export default SpinningPendulum;

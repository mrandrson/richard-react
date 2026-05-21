import assetPath from '../utils/assetPath';

function MathBlock({ children }) {
  return <p className="math-block">{children}</p>;
}

function NBodySimulation() {
  return (
    <div>
      <div className="page-header">
        <h1>N-Body Simulation</h1>
        <p>
          A gravitational N-body solver using Störmer-Verlet integration, direct summation, and a Barnes-Hut quadtree
          with multipole corrections.
        </p>
      </div>

      <figure className="media-card">
        <video autoPlay muted loop playsInline>
          <source src={assetPath('BinaryCollision.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <figcaption>Binary-system N-body simulation with orbiting particles.</figcaption>
      </figure>

      <section className="writeup-section">
        <h2>Störmer-Verlet Integrator</h2>
        <p>
          The integration scheme starts from Hamilton&apos;s equations for a separable Hamiltonian{' '}
          <span>{String.raw`\(H(p,q)=T(p)+V(q)\)`}</span>:
        </p>
        <MathBlock>{String.raw`\[
\dot{q} = \frac{\partial H}{\partial p},
\qquad
\dot{p} = -\frac{\partial H}{\partial q}.
\]`}</MathBlock>
        <p>
          For the Newtonian N-body problem this separation holds, since kinetic energy depends only on momenta and
          gravitational potential energy depends only on positions. The kick-drift-kick Störmer-Verlet update is
        </p>
        <MathBlock>{String.raw`\[
p_{n+1/2} = p_n-\frac{h}{2}\frac{\partial H}{\partial q}(q_n),
\qquad
q_{n+1}=q_n+h\frac{\partial H}{\partial p}(p_{n+1/2}),
\qquad
p_{n+1} = p_{n+1/2}-\frac{h}{2}\frac{\partial H}{\partial q}(q_{n+1}).
\]`}</MathBlock>
        <p>
          The advantage of this method is that it is symplectic: for conservative orbital systems, it usually has much
          better long-term qualitative behavior than a generic explicit integrator of the same order.
        </p>
      </section>

      <section className="writeup-section">
        <h2>N-Body Hamiltonian</h2>
        <p>For <span>{String.raw`\(N_{\text{body}}\)`}</span> bodies, the kinetic energy is</p>
        <MathBlock>{String.raw`\[
T =
\frac{1}{2}\sum_{i=1}^{N_{\text{body}}}
\frac{\mathbf{p}_i\cdot\mathbf{p}_i}{m_i},
\]`}</MathBlock>
        <p>and the gravitational potential energy is</p>
        <MathBlock>{String.raw`\[
V =
-G\sum_{i<j}
\frac{m_i m_j}{|\mathbf{q}_i-\mathbf{q}_j|}.
\]`}</MathBlock>
        <p>Thus the Hamiltonian is</p>
        <MathBlock>{String.raw`\[
H =
\frac{1}{2}\sum_{i=1}^{N_{\text{body}}}
\frac{\mathbf{p}_i\cdot\mathbf{p}_i}{m_i}
-
G\sum_{i<j}
\frac{m_i m_j}{|\mathbf{q}_i-\mathbf{q}_j|}.
\]`}</MathBlock>
        <p>Hamilton&apos;s equations give</p>
        <MathBlock>{String.raw`\[
\dot{\mathbf{q}}_i =
\frac{\mathbf{p}_i}{m_i},
\qquad
\dot{\mathbf{p}}_i =
-G\sum_{j\neq i}
\frac{m_i m_j(\mathbf{q}_i-\mathbf{q}_j)}
{|\mathbf{q}_i-\mathbf{q}_j|^3}.
\]`}</MathBlock>
        <p>Substituting into the Störmer-Verlet scheme gives the direct N-body update:</p>
        <MathBlock>{String.raw`\[
\mathbf{p}^i_{n+1/2}
=
\mathbf{p}^i_n
-
\frac{hG}{2}
\sum_{j\neq i}
\frac{m_i m_j(\mathbf{q}^i_n-\mathbf{q}^j_n)}
{|\mathbf{q}^i_n-\mathbf{q}^j_n|^3},
\]`}</MathBlock>
        <MathBlock>{String.raw`\[
\mathbf{q}^i_{n+1}
=
\mathbf{q}^i_n+\frac{h\mathbf{p}^i_{n+1/2}}{m_i},
\]`}</MathBlock>
        <MathBlock>{String.raw`\[
\mathbf{p}^i_{n+1}
=
\mathbf{p}^i_{n+1/2}
-
\frac{hG}{2}
\sum_{j\neq i}
\frac{m_i m_j(\mathbf{q}^i_{n+1}-\mathbf{q}^j_{n+1})}
{|\mathbf{q}^i_{n+1}-\mathbf{q}^j_{n+1}|^3}.
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Direct Binary System Simulation</h2>
        <p>
          I first ran a direct <span>{String.raw`\(O(n^2)\)`}</span> simulation with two central masses of{' '}
          <span>{String.raw`\(1\,M_\odot\)`}</span> each. Orbiting bodies were initialized near their Keplerian speeds,
          with a small perturbation:
        </p>
        <MathBlock>{String.raw`\[
v_0 = \epsilon+\sqrt{\frac{GM}{r_0}}.
\]`}</MathBlock>
        <p>The natural dynamical timescale is</p>
        <MathBlock>{String.raw`\[
t_{\text{dyn}} = \sqrt{\frac{r_0^3}{GM}},
\qquad
\Delta t=\eta t_{\text{dyn}},
\qquad
\eta \ll 1.
\]`}</MathBlock>
        <p>
          The simulation ran for five years. The plotted radial positions show that many orbits remain stable around{' '}
          <span>{String.raw`\(1\,\text{AU}\)`}</span>, with line color corresponding to particle mass.
        </p>
        <figure className="media-card">
          <img src={assetPath('nbody_binary_position.png')} alt="Orbiting body positions and star positions" />
          <figcaption>Orbiting body positions and star positions from the direct binary-system simulation.</figcaption>
        </figure>
      </section>

      <section className="writeup-section">
        <h2>Quadtree Structure</h2>
        <p>
          The Barnes-Hut algorithm organizes two-dimensional particle data with a quadtree. The root cell is recursively
          subdivided into four quadrants until each leaf contains fewer than a chosen particle threshold or a maximum depth
          is reached. Each node stores its bounds, total mass, center of mass, children, and multipole moments.
        </p>
        <pre className="algorithm-block">{`BuildQuadTree(data, bounds):
  compute total mass and center of mass
  if data count <= N_max or max depth reached:
    return leaf node
  split bounds into four quadrants
  recursively build nonempty child cells
  return internal node`}</pre>
        <figure className="media-card">
          <img src={assetPath('nbody_quadtree.png')} alt="Example quadtree subdivision" />
          <figcaption>Example quadtree: dense regions subdivide into smaller cells, while sparse regions stay coarse.</figcaption>
        </figure>
        <p>
          A key parameter is the Barnes-Hut opening criterion. For a cell <span>{String.raw`\(\mathcal{C}\)`}</span>, let
        </p>
        <MathBlock>{String.raw`\[
s_\mathcal{C} =
\max(x_{\max}-x_{\min}, y_{\max}-y_{\min}),
\qquad
\overline{x}_\mathcal{C}
=
\frac{\sum_{i\in\mathcal{C}}m_i x_i}{\sum_{i\in\mathcal{C}}m_i}.
\]`}</MathBlock>
        <p>For a target particle at <span>{String.raw`\(x_j\)`}</span>, define</p>
        <MathBlock>{String.raw`\[
\theta_j =
\frac{s_\mathcal{C}}{d_j},
\qquad
d_j = |x_j-\overline{x}_\mathcal{C}|.
\]`}</MathBlock>
        <p>
          If <span>{String.raw`\(\theta_j < \theta_{\max}\)`}</span> and the cell does not contain the target particle,
          the cell can be approximated as a distant aggregate rather than opened recursively.
        </p>
        <div className="media-grid">
          <figure className="media-card">
            <img src={assetPath('nbody_1au_quadtree.png')} alt="Quadtree for body at one AU" />
            <figcaption>Quadtree for a body at <span>{String.raw`\(r=1\,\text{AU}\)`}</span>.</figcaption>
          </figure>
          <figure className="media-card">
            <img src={assetPath('nbody_01au_quadtree.png')} alt="Quadtree for body at 0.1 AU" />
            <figcaption>Quadtree for a body at <span>{String.raw`\(r=0.1\,\text{AU}\)`}</span>.</figcaption>
          </figure>
        </div>
      </section>

      <section className="writeup-section">
        <h2>Multipole Expansion</h2>
        <p>
          The potential at a point <span>{String.raw`\(x_j\)`}</span> due to a cell{' '}
          <span>{String.raw`\(\mathcal{C}\)`}</span> can be written as
        </p>
        <MathBlock>{String.raw`\[
\varphi(x_j)
=
-G\sum_{i\in\mathcal{C}}
m_i S(|x_j-x_i|),
\qquad
S(r)=\frac{1}{r}.
\]`}</MathBlock>
        <p>
          Expanding about the cell center of mass <span>{String.raw`\(\overline{x}_\mathcal{C}\)`}</span> using
          multi-index notation gives
        </p>
        <MathBlock>{String.raw`\[
S(|x_j-x_i|)
\approx
\sum_{|\mathbf{n}|<p}
\frac{(-1)^{|\mathbf{n}|}}{\mathbf{n}!}
(x_i-\overline{x}_\mathcal{C})^\mathbf{n}
\nabla^\mathbf{n}S(x_j-\overline{x}_\mathcal{C}).
\]`}</MathBlock>
        <p>The corresponding multipole moments are</p>
        <MathBlock>{String.raw`\[
M_\mathbf{n}(\overline{x}_\mathcal{C})
=
\sum_{i\in\mathcal{C}}
m_i(x_i-\overline{x}_\mathcal{C})^\mathbf{n},
\]`}</MathBlock>
        <p>so the cell potential is approximated by</p>
        <MathBlock>{String.raw`\[
\varphi(x_j)
\approx
-G\sum_{|\mathbf{n}|<p}
\frac{(-1)^{|\mathbf{n}|}}{\mathbf{n}!}
M_\mathbf{n}(\overline{x}_\mathcal{C})
\nabla^\mathbf{n}S(x_j-\overline{x}_\mathcal{C}).
\]`}</MathBlock>
      </section>

      <section className="writeup-section">
        <h2>Monopole and Quadrupole Corrections</h2>
        <p>
          This implementation is a Barnes-Hut treecode with monopole and quadrupole corrections. The monopole term is the
          total cell mass
        </p>
        <MathBlock>{String.raw`\[
M_0(\overline{x}_\mathcal{C})
=
\sum_{i\in\mathcal{C}}m_i,
\qquad
\varphi_{\text{monopole}}(x_j)
=
-\frac{GM_0(\overline{x}_\mathcal{C})}{r}.
\]`}</MathBlock>
        <p>The quadrupole moment is</p>
        <MathBlock>{String.raw`\[
M_{kl}(\overline{x}_\mathcal{C})
=
\sum_{i\in\mathcal{C}}
m_i
(x_{i,k}-\overline{x}_{\mathcal{C},k})
(x_{i,l}-\overline{x}_{\mathcal{C},l}).
\]`}</MathBlock>
        <p>For <span>{String.raw`\(\mathbf{r}=x_j-\overline{x}_\mathcal{C}\)`}</span>,</p>
        <MathBlock>{String.raw`\[
\nabla_k\nabla_l S(x_j-\overline{x}_\mathcal{C})
=
\frac{1}{r^3}
\left[
\frac{3r_k r_l}{r^2}
-
\delta_{kl}
\right].
\]`}</MathBlock>
        <p>Thus the quadrupole contribution is</p>
        <MathBlock>{String.raw`\[
\varphi_{\text{quadrupole}}(x_j)
=
-\frac{G}{2r^3}
\left[
\sum_{k,l}
M_{kl}(\overline{x}_\mathcal{C})
\frac{3r_k r_l}{r^2}
-
\operatorname{Tr}(M)
\right].
\]`}</MathBlock>
        <p>
          Because the expansion is taken about the center of mass, the dipole term vanishes. The first nontrivial
          correction after the monopole term is therefore quadrupole order.
        </p>
      </section>

      <section className="writeup-section">
        <h2>Tree Force</h2>
        <p>
          To use the tree approximation inside Störmer-Verlet, the acceleration is computed as{' '}
          <span>{String.raw`\(-\nabla\varphi\)`}</span>. For the monopole term,
        </p>
        <MathBlock>{String.raw`\[
\nabla\varphi_{\text{monopole}}(x_j)
=
\frac{GM_0(\overline{x}_\mathcal{C})}{r^3}\mathbf{r},
\qquad
\mathbf{a}_{\text{monopole}}
=
-\frac{GM_0(\overline{x}_\mathcal{C})}{r^3}\mathbf{r}.
\]`}</MathBlock>
        <p>
          For the quadrupole term, define <span>{String.raw`\(W=\mathbf{r}^TM\mathbf{r}\)`}</span>. Then
        </p>
        <MathBlock>{String.raw`\[
\mathbf{a}_{\text{quad}}
=
\frac{G}{2}
\left(
\frac{6M\mathbf{r}}{r^5}
-
\frac{15W\mathbf{r}}{r^7}
+
\frac{3\operatorname{Tr}(M)\mathbf{r}}{r^5}
\right).
\]`}</MathBlock>
        <pre className="algorithm-block">{`TreeForce(node, x_j, target):
  if node is empty:
    return 0
  if node is a leaf:
    directly sum particle accelerations, excluding target
  r = x_j - node.centerOfMass
  theta = node.size / |r|
  if node does not contain target and theta < theta_max:
    return monopole acceleration + quadrupole acceleration
  else:
    recurse through children and sum their accelerations`}</pre>
      </section>

      <section className="writeup-section">
        <h2>Multipole-Quadtree Simulation</h2>
        <p>
          The final solver rebuilds the quadtree after each position update, then uses the tree force for both half-kicks
          in the Störmer-Verlet integrator:
        </p>
        <pre className="algorithm-block">{`Build initial quadtree
for each timestep:
  for each particle:
    p_half = p + (h/2) m a(q, tree)
  for each particle:
    q_next = q + h p_half / m
  rebuild quadtree using q_next
  for each particle:
    p_next = p_half + (h/2) m a(q_next, tree)`}</pre>
        <p>
          I implemented this with 200 orbiting bodies and two central masses. Close encounters can still produce
          unrealistically high velocities because collision resolution is not included, but the overall behavior
          demonstrates how tree structures and series approximations can substantially reduce the cost of gravitational
          N-body calculations.
        </p>
        <p>
          Source files for this project are available in the{' '}
          <a href="https://github.com/mrandrson/computational-phys/tree/main/n-body/multipolesim" target="_blank" rel="noreferrer">
            computational-phys repository
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default NBodySimulation;

import assetPath from '../utils/assetPath';

function SimulationPair({ model, description, animation, plot, plotAlt, caption }) {
  return (
    <article className="simulation-example">
      <h3>{model}</h3>
      <p>{description}</p>
      <div className="simulation-result-grid">
        <div>
          <div className="simulation-frame-crop">
            <iframe
              src={assetPath(animation)}
              className="simulation-frame"
              title={`Top-down trajectories in the ${model.toLowerCase()} model`}
              loading="lazy"
            ></iframe>
          </div>
          <p className="simulation-link">
            <a href={assetPath(animation)} target="_blank" rel="noreferrer">
              Open the {model.toLowerCase()} trajectory view in a new tab
            </a>
          </p>
        </div>
        <figure className="media-card result-figure capture-volume-figure">
          <a href={assetPath(plot)} target="_blank" rel="noreferrer">
            <img src={assetPath(plot)} alt={plotAlt} loading="lazy" />
          </a>
          <figcaption>{caption}</figcaption>
        </figure>
      </div>
    </article>
  );
}

function PlanetesimalProject() {
  return (
    <div>
      <div className="page-header">
        <h1>Capture of Freely Floating Planetesimals during Protostellar Collapse</h1>
      </div>

      <p>
        With{' '}
        <a href="https://sites.google.com/view/kedron-silsbee" target="_blank" rel="noreferrer">
          Dr. Kedron Silsbee
        </a>
        , we use one-dimensional collapse models and numerical trajectory simulations to investigate the gravitational
        capture of freely floating planetesimals by a collapsing prestellar core. Unlike gas drag, capture by the
        changing potential is independent of planetesimal size, allowing objects tens or hundreds of kilometers across
        to become bound. We estimate the number and largest size captured from a star’s birth cluster or the Galactic
        population. These bodies could seed planet formation, bypassing the collisional fragmentation and rapid radial
        drift that inhibit growth from dust.
      </p>

      <p>
        Even one large seed may grow rapidly through pebble accretion: gas drag removes energy from millimeter- to
        centimeter-sized grains, allowing capture well beyond the body’s physical radius. This process becomes more
        efficient as the body grows. The captured population is too sparse for growth by mutual collisions, making the
        largest body’s size more important than the total captured mass. Lyra et al. find that a roughly 100 km body in
        the inner few astronomical units could grow to planetary size within the disk lifetime, depending on disk mass,
        turbulence, and orbital radius. We ask whether capture can supply seeds large enough for this growth.
      </p>

      <section className="writeup-section" aria-labelledby="capture-mechanism-title">
        <h2 id="capture-mechanism-title">The Capture Mechanism</h2>
        <p>
          To become captured, an interstellar object must achieve negative total energy in the reference frame co-moving
          with the forming star. As a prestellar core collapses, its gravitational potential becomes more negative. An
          object crossing the core can therefore climb out of a deeper potential well than the one it entered, losing
          orbital energy and potentially becoming bound. Ignoring non-gravitational forces, its specific energy changes as
        </p>

        <div className="math-block">
          {String.raw`\[
            \frac{dE_{\mathrm{tot}}}{dt}=\frac{\partial\phi}{\partial t}.
          \]`}
        </div>

        <p>
          This is analogous to the Integrated Sachs–Wolfe effect, in which photons are red- or blue-shifted as they cross
          an evolving gravitational potential.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="modeled-title">
        <h2 id="modeled-title">Capture Volume</h2>
        <p>
          We define the captured volume as <span>{String.raw`\(V_{\rm capt}=N_{\rm captured}/n_0\)`}</span>,
          where <span>{String.raw`\(N_{\rm captured}\)`}</span> is the number of captured planetesimals and{' '}
          <span>{String.raw`\(n_0\)`}</span> is their initial number density. The capture volume is the volume of interstellar space
          from which planetesimals will be captured as a function of their initial velocity with respect to the cloud.
        </p>
        <p>
          We obtain the same expected capture volume independent of the value of{' '}
          <span>{String.raw`\(n_0\)`}</span> that we assume. This allows us to compare capture between collapse models
          without choosing a planetesimal abundance. Multiplying the capture volume by a population’s number density
          then gives the expected number of captured bodies at that initial velocity.
        </p>
        <p>
          We ran a set of simulations with different impact parameters. Using the captured counts in the intervals{' '}
          <span>{String.raw`\([b_i,b_{i+1}]\)`}</span>, we calculate
        </p>
        <div className="math-block">
          {String.raw`\[
            V_{\rm capt} = \frac{N_{\rm capt}}{\dot N_{\rm static}}
            \sum_i \pi N_{\rm capt}^{i}\left(b_{i+1}^2 - b_i^2\right)v_0.
          \]`}
        </div>
        <p>
          Here, <span>{String.raw`\(N_{\rm capt}^{i}\)`}</span> is the captured count in interval{' '}
          <span>{String.raw`\(i\)`}</span>, <span>{String.raw`\(\pi(b_{i+1}^2-b_i^2)\)`}</span> is its annular area,
          <span>{String.raw`\(v_0\)`}</span> is the initial planetesimal speed, and{' '}
          <span>{String.raw`\(\dot N_{\rm static}\)`}</span> is the constant particle-entry rate during initialization.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="results-title">
        <h2 id="results-title">Collapse Models and Capture Volumes</h2>
        <p>
          Each animation shows planetesimals passing through an evolving cloud, paired with the capture-volume curve from
          the corresponding simulation suite. The left panel of each plot gives the capture volume, while the right panel
          normalizes it by the cloud’s initial volume.
        </p>

        <SimulationPair
          model="Homogeneous Collapse"
          description="We assume a homogeneous density profile that collapses at a fixed fraction of the free-fall rate. While this is not the most realistic model of a collapsing prestellar core, it admits a semi-analytic expression for the rate at which planetesimals are captured and serves as a good test of our numerical procedures."
          animation="planetesimal-simulations/homogeneous-trajectories.html"
          plot="planetesimal-homogeneous-capture-volume.png"
          plotAlt="Homogeneous-collapse capture volume versus initial planetesimal speed"
          caption={
            <>
              Capture volume versus <span>{String.raw`\(v_0/c_s\)`}</span> for three initial cloud radii. The black curve
              is the analytic approximation.
            </>
          }
        />

        <SimulationPair
          model="Larson Collapse"
          description="For the Larson model, we used the same simulation procedure as in the homogeneous case, but assumed that the gas density follows the self-similar solution of Larson (1969). We chose the cloud’s external radius so that its total mass is one solar mass and used the numerical Larson solution, subject to the boundary conditions described in that paper."
          animation="planetesimal-simulations/larson-trajectories.html"
          plot="planetesimal-larson-capture-volume.png"
          plotAlt="Larson-collapse capture volume versus initial planetesimal speed"
          caption="Capture volume for the Larson solution. Different colors represent different initial collapse scales."
        />

        <SimulationPair
          model="Shu Collapse"
          description="The final stage of star formation is the accretion of material onto the young protostar. We model that stage using the self-similar “expansion-wave collapse solution” of Shu (1977), in which a central point mass grows with time inside a continuous, spherically symmetric envelope. Although the Larson solution approaches a 1/r² density profile and the Shu solution begins with one, their normalization constants differ by a factor of 4.4, so we treat them as separate models rather than two stages of the same process."
          animation="planetesimal-simulations/shu-trajectories.html"
          plot="planetesimal-shu-capture-volume.png"
          plotAlt="Shu-collapse capture volume versus initial planetesimal speed"
          caption="Capture volume for the Shu solution. Different colors represent different final expansion-wave radii."
        />

        <p>
          Capture is strongly weighted toward slow encounters. Taking{' '}
          <span>{String.raw`\(c_s=\sqrt{3.36\times10^4}\,\mathrm{m\,s^{-1}}\approx0.18\,\mathrm{km\,s^{-1}}\)`}</span>, the
          highest sampled velocities with nonzero capture give conservative reported cutoffs of{' '}
          <span>{String.raw`\(5.2c_s\)`}</span> (0.95 km/s) for the Larson model and{' '}
          <span>{String.raw`\(1.2c_s\)`}</span> (0.22 km/s) for the Shu model. The idealized homogeneous model has no finite
          cutoff: it can capture planetesimals with arbitrarily large <span>{String.raw`\(v_0\)`}</span>, although the
          capture volume decreases steeply as <span>{String.raw`\(V_{\mathrm{capt}}\propto v_0^{-6}\)`}</span>.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="significance-title">
        <h2 id="significance-title">Implications for Planet Formation</h2>
        <p>
          A real population has a distribution of encounter speeds rather than a single value. We therefore average the
          simulated capture volumes over a Maxwellian speed distribution. The Galactic-field case uses a one-dimensional
          velocity dispersion of 25 km/s. For a birth cluster, we use 1 km/s. Because capture falls steeply with speed, the
          low-velocity cluster environment produces a much larger effective capture volume.
        </p>

        <figure className="media-card result-figure compact-result-figure">
          <a href={assetPath('planetesimal-maxwellian-capture-volume.png')} target="_blank" rel="noreferrer">
            <img
              src={assetPath('planetesimal-maxwellian-capture-volume.png')}
              alt="Maxwellian-averaged capture volume for the homogeneous, Larson, and Shu models"
              loading="lazy"
            />
          </a>
          <figcaption>
            Capture volume averaged over encounter speeds. The vertical lines mark the birth-cluster and Galactic-field
            velocity dispersions.
          </figcaption>
        </figure>

        <p>
          To estimate the largest body captured, we combine the averaged capture volume with the cometary size
          distribution measured by Boe et al. and normalize it for two environments. The assumed planetesimal mass density
          in the birth cluster is about 400 times the Galactic-field value. Since gravitational capture is independent of
          size, the expected number above a diameter <span>{String.raw`\(D\)`}</span> is the capture volume multiplied by
          the cumulative number density <span>{String.raw`\(N(>D)\)`}</span>. The largest expected body is where that number
          falls to one.
        </p>

        <figure className="media-card result-figure compact-result-figure">
          <a href={assetPath('planetesimal-expected-captured-size.png')} target="_blank" rel="noreferrer">
            <img
              src={assetPath('planetesimal-expected-captured-size.png')}
              alt="Expected number of captured planetesimals larger than a given diameter in the Galactic field and a birth cluster"
              loading="lazy"
            />
          </a>
          <figcaption>
            Expected number of captured bodies larger than <span>{String.raw`\(D\)`}</span> in the Galactic field (left)
            and a birth cluster (right). The crossing at <span>{String.raw`\(N=1\)`}</span> gives the characteristic largest
            captured body.
          </figcaption>
        </figure>

        <p>
          Measured against the roughly 100 km scale for efficient pebble accretion, capture from the Galactic population
          falls short by one to two orders of magnitude in size and is unlikely to seed planet formation. In the paper’s
          birth-cluster scenario with the efficiency factor set to one, capture reaches or exceeds that scale and could
          provide a seed for subsequent growth.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="project-info-title">
        <p>
          I presented preliminary results at the Texas Section meeting of the American Physical Society. A manuscript
          based on the project is in preparation.
        </p>
        <div className="project-links">
          <a href={assetPath('TAOAPS_Poster_3-3.pdf')} target="_blank" rel="noreferrer">
            View the TAOAPS poster
          </a>
        </div>
      </section>
    </div>
  );
}

export default PlanetesimalProject;

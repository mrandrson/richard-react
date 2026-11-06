import assetPath from '../utils/assetPath';

const PREPRINT_URL = 'https://arxiv.org/abs/2611.00537';

function SimulationPair({ model, description, animation, plot, plotAlt, caption }) {
  return (
    <article className="simulation-example">
      <h3>{model}</h3>
      {description}
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
              Explore trajectories ↗
            </a>
          </p>
          <p className="figure-note">
            Dots show test particles and lines trace their paths. Red indicates negative specific orbital energy;
            blue indicates positive energy. Background shading shows gas density on a logarithmic scale.
            Use Pause to stop playback and the slider to choose a time.
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
    <div className="planetesimal-project">
      <div className="page-header project-page-header">
        <h1>Gravitational Capture of Large Interstellar Planetesimals by Collapsing Prestellar Cores</h1>
      </div>

      <div className="project-summary">
        <p className="project-authors">
          Richard Anderson and{' '}
          <a href="https://sites.google.com/view/kedron-silsbee" target="_blank" rel="noreferrer">
            Kedron Silsbee
          </a>
        </p>
        <p className="publication-status">Submitted for publication · Preprint available on arXiv</p>
        <div className="project-links" aria-label="Research materials">
          <a href={PREPRINT_URL} target="_blank" rel="noreferrer">Preprint</a>
          <a href={assetPath('TAOAPS_Poster_3-3.pdf')} target="_blank" rel="noreferrer">Conference poster</a>
        </div>
        <p>
          With Kedron Silsbee, we investigated the capture of free-floating planetesimals by the time-varying
          gravitational potential of a collapsing prestellar core. We used analytic methods and numerical simulations
          to calculate planetesimal capture in three idealized, one-dimensional collapse models.
        </p>
        <p>
          Under the assumed population models, the characteristic largest captured diameters from the Galactic
          population are only a few kilometers. Capture from a denser, slower-moving birth-cluster population can
          instead yield bodies hundreds to roughly a thousand kilometers in diameter, comparable to the seeds that
          may grow to planet size through pebble accretion. These estimates describe capture into orbit around the
          forming protostar; whether the captured bodies become entrained in the protoplanetary disk remains unresolved.
        </p>
      </div>

      <section className="writeup-section" aria-labelledby="principal-result-title">
        <h2 id="principal-result-title">Principal result</h2>
        <div className="research-table-scroll" role="region" aria-labelledby="principal-result-title" tabIndex={0}>
          <table aria-describedby="diameter-note">
            <thead>
              <tr>
                <th scope="col">Source of planetesimals</th>
                <th scope="col">Mean relative speed</th>
                <th scope="col">Characteristic largest captured diameter</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Galactic field</th><td>56 km/s</td><td>2.8–6.4 km</td></tr>
              <tr><th scope="row">Birth cluster, fast</th><td>8.5 km/s</td><td>70–150 km</td></tr>
              <tr><th scope="row">Birth cluster, slow</th><td>0.7 km/s</td><td>520–1200 km</td></tr>
            </tbody>
          </table>
        </div>
        <p id="diameter-note" className="figure-note">
          The characteristic largest captured diameter is defined by one expected capture at larger diameters. Ranges
          span the three collapse models for a fixed population model; they do not include uncertainty in the assumed
          density, velocity distribution, or size distribution.
        </p>
        <figure className="media-card result-figure leading-result-figure">
          <a href={assetPath('planetesimal-expected-captured-size.png')} target="_blank" rel="noreferrer">
            <img
              src={assetPath('planetesimal-expected-captured-size.png')}
              alt="Expected count above each planetesimal diameter for three collapse models in the Galactic field, slow birth cluster, and fast birth cluster"
            />
          </a>
          <figcaption>
            Expected number of captured planetesimals larger than diameter <span>{String.raw`\(D\)`}</span> for the
            homogeneous, Larson–Penston, and Shu collapse models. From left to right, the panels show the Galactic
            field, slow birth cluster, and fast birth cluster. The horizontal dashed line marks one expected capture
            and defines the characteristic largest captured diameter. In all three models, the birth-cluster
            populations yield substantially larger captured bodies than the Galactic population.
          </figcaption>
        </figure>
        <p>
          Within each population, the characteristic largest captured diameters differ by approximately a factor of
          two between collapse models. The difference between the Galactic and birth-cluster populations is much
          larger. The slow-cluster estimates are comparable to seed diameters that may allow growth to planet size
          via pebble accretion, provided the captured bodies become entrained in the disk material.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="motivation-title">
        <h2 id="motivation-title">Motivation</h2>
        <p>
          Collisional fragmentation and rapid radial drift within the disk can inhibit the growth of solids into
          planetesimals. Planetesimals ejected from disks around other stars may be captured and act as seeds of planet
          formation, growing through accretion of pebbles present in their host disks. We ask whether a forming star
          can capture bodies large enough for this process; the required seed diameter depends on the assumed disk
          parameters and pebble population.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="capture-mechanism-title">
        <h2 id="capture-mechanism-title">Capture mechanism</h2>
        <p>
          In an isolated, time-independent two-body potential, an initially unbound planetesimal cannot become bound
          without an additional mechanism for losing orbital energy. During the collapse of a prestellar core, the
          gravitational potential in the vicinity of the forming protostar becomes more negative. A planetesimal
          crossing the core during this evolution can therefore lose energy.
        </p>
        <p>
          For a test particle with specific orbital energy <span>{String.raw`\(E=\tfrac12v^2+\phi\)`}</span>,
        </p>
        <div className="math-block">
          {String.raw`\[\frac{dE}{dt}=\frac{\partial\phi}{\partial t}.\]`}
        </div>
        <p>
          A planetesimal becomes gravitationally bound if its final specific orbital energy is negative in the
          reference frame co-moving with the star, with the potential taken to vanish at infinity. With
          non-gravitational forces neglected, capture depends on the initial trajectory and is independent of
          planetesimal size. Capture strongly favors low initial speeds: the required energy loss is smaller,
          the crossing time is longer, and gravitational focusing is stronger.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="capture-volume-title">
        <h2 id="capture-volume-title">Analytic and numerical approach</h2>
        <p>
          We calculated test-particle trajectories in the time-varying potentials of three one-dimensional collapse
          models: a homogeneous spherical density distribution, the self-similar Larson–Penston solution, and the Shu
          inside-out collapse model. In each case, the total cloud mass is one solar mass. We used the{' '}
          <a href="https://rebound.hanno-rein.de/" target="_blank" rel="noreferrer">REBOUND</a> code with the{' '}
          <a href="https://rebound.hanno-rein.de/integrators/" target="_blank" rel="noreferrer">IAS15 integrator</a>,
          varying the initial speed and range of impact parameters of incoming planetesimals. Planetesimals with
          negative specific orbital energy at the end of the modeled evolution are classified as captured.
        </p>
        <p>
          We define the capture volume as
        </p>
        <div className="math-block">
          {String.raw`\[V_{\rm capt}(v_0)=\frac{N_{\rm capt}(v_0)}{n_0},\]`}
        </div>
        <p>
          where <span>{String.raw`\(N_{\rm capt}\)`}</span> is the number of captured planetesimals for an incoming
          population with uniform number density <span>{String.raw`\(n_0\)`}</span> and initial speed{' '}
          <span>{String.raw`\(v_0\)`}</span> at infinity. This is the total volume of space from which planetesimals
          are captured over the modeled collapse, independent of the assumed number density. The homogeneous model
          provides a semi-analytic estimate against which to test the numerical calculations.
        </p>
        <details className="research-details methods-details">
          <summary>Numerical methods and sampling</summary>
          <div className="research-details-body">
            <p>
              The homogeneous and Larson–Penston simulations proceed in two phases. The gravitational potential is
              first held fixed to populate the cloud with a realistic distribution of particle positions and
              velocities, then allowed to evolve according to the collapse model. The Shu simulations follow the
              evolution to final times of 350,000, 35,000, or 3,500 years, when the expansion wave reaches approximately
              all, one tenth, or one hundredth of the initial cloud mass, respectively. Final energy is evaluated at
              the end of the modeled stage; subsequent orbital evolution and entrainment in the disk are not followed.
            </p>
            <p>
              We ran simulations for 79 ranges of impact parameter evenly separated in log-space between{' '}
              <span>{String.raw`\(10^9\)`}</span> and <span>{String.raw`\(10^{17}\)`}</span> m. During the static
              phase, planetesimals with impact parameters between the bounds of each annulus enter at a rate
              proportional to the annular area and incoming flux:
            </p>
            <div className="math-block">
              {String.raw`\[\dot N_{\rm static}=\pi(b_2^2-b_1^2)\,v_0 n_0.\]`}
            </div>
            <p>
              The initial velocities account for gravitational focusing, and the entry rate is modified to account
              for the motion of the cloud boundary. We obtain the total capture volume by summing the numbers
              captured in each impact-parameter range, divided by the number density used in that calculation.
              Annular area and incoming flux are included in the entry rates, so equal logarithmic intervals do not
              correspond to equal numbers of incoming planetesimals.
            </p>
            <p>
              The homogeneous analytic approximation serves as a test of the numerical procedures. The upper
              impact-parameter bound exceeds the maximum for particles that would enter the cloud. Even if every
              particle below the lower bound were captured, its contribution to the capture volume would be
              negligible. The{' '}
              <a href="https://arxiv.org/html/2611.00537v1#S2.SS4" target="_blank" rel="noreferrer">
                preprint’s numerical methods
              </a>{' '}
              describe the initialization and boundary treatment in detail.
            </p>
          </div>
        </details>
      </section>

      <section className="writeup-section" aria-labelledby="population-title">
        <h2 id="population-title">From capture volumes to planetesimal sizes</h2>
        <p>
          To estimate the largest planetesimal typically captured, we must assume a distribution of initial speeds
          and a number density of planetesimals as a function of size. We assume that the initial speeds relative to
          the collapsing core follow a Maxwellian speed distribution <span>{String.raw`\(f(v_0)\)`}</span> and average
          the capture volume over this distribution:
        </p>
        <div className="math-block">
          {String.raw`\[\bar V_{\rm capt}=\int_0^\infty f(v_0)\,V_{\rm capt}(v_0)\,dv_0.\]`}
        </div>
        <p>
          For the Galactic population, we assume a planetesimal mass density of 4 Earth masses per cubic parsec and a
          mean relative speed of approximately 56 km/s. For the birth-cluster population, we assume a mass density of
          800 Earth masses per cubic parsec and consider slow and fast models with mean relative speeds of 0.7 and
          8.5 km/s. These densities and speed distributions are inputs to the population models.
        </p>
        <figure className="media-card result-figure compact-result-figure">
          <a href={assetPath('planetesimal-maxwellian-capture-volume.png')} target="_blank" rel="noreferrer">
            <img
              src={assetPath('planetesimal-maxwellian-capture-volume.png')}
              alt="Speed-averaged capture volume versus mean relative speed for the homogeneous, Larson–Penston, and Shu models"
              loading="lazy"
            />
          </a>
          <figcaption>
            Maxwellian-averaged capture volume as a function of mean relative speed for the three collapse models.
            The shaded region corresponds to the range of speeds considered for the birth-cluster population, and
            the vertical dashed line marks the Galactic value. The lower mean speeds in the birth cluster result in
            substantially larger averaged capture volumes in all three models.
          </figcaption>
        </figure>
        <p>
          When the speeds contributing significantly to capture are small compared to the mean relative speed, the
          exponential in the Maxwellian distribution approaches unity over the relevant speed range. In this limit,{' '}
          <span>{String.raw`\(\bar V_{\rm capt}\propto\langle v_0\rangle^{-3}\)`}</span>: a factor-of-ten reduction
          in mean speed gives approximately a factor-of-a-thousand increase in averaged capture volume. This scaling
          is not generally applicable when the mean speed is comparable to the speeds contributing to capture.
        </p>
        <p>
          We assume that the interstellar planetesimal size distribution has the same shape as the measured
          long-period-comet distribution, used here as a proxy, and determine its normalization from the assumed
          planetesimal mass density. Since gravitational capture is independent of planetesimal size, this shape is
          preserved if the velocity distribution is also size-independent. Multiplying the Maxwellian-averaged
          capture volume by <span>{String.raw`\(n(>D)\)`}</span>, the <strong>number density</strong> of planetesimals
          with diameters larger than <span>{String.raw`\(D\)`}</span>, gives the expected number captured:
        </p>
        <div className="math-block">
          {String.raw`\[\mathcal N(>D)=\bar V_{\rm capt}\,n(>D),\qquad \mathcal N(>D_{\rm char})=1.\]`}
        </div>
        <p>
          We define the characteristic largest captured diameter by the second condition, corresponding to one
          expected capture at larger diameters. This is not a guaranteed maximum or the mean of the maximum
          diameter. For Poisson-distributed capture counts, the probability of at least one capture above this
          diameter is <span>{String.raw`\(1-e^{-1}\approx63\%\)`}</span>.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="results-title">
        <h2 id="results-title">Collapse-model comparison</h2>
        <p>
          The capture rate depends sharply on the initial speed in all three models. In the Larson–Penston and Shu
          models, capture drops to zero above approximately <span>{String.raw`\(6c_s\)`}</span> and{' '}
          <span>{String.raw`\(1.4c_s\)`}</span>, respectively. The homogeneous model has no finite cutoff in the
          idealized limit of collapse to a point. We take the sound speed to be{' '}
          <span>{String.raw`\(c_s=183\)`}</span> m/s.
        </p>
        <div className="research-table-scroll" role="region" aria-labelledby="results-title" tabIndex={0}>
          <table>
            <thead>
              <tr><th scope="col">Model</th><th scope="col">Purpose in the study</th><th scope="col">Main behavior</th></tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Homogeneous</th><td>Analytic benchmark</td>
                <td>Strong dependence on initial speed; finite initial radius limits low-speed capture</td>
              </tr>
              <tr>
                <th scope="row">Larson–Penston</th><td>Self-similar core collapse</td>
                <td>Capture drops to zero near <span>{String.raw`\(6c_s\)`}</span></td>
              </tr>
              <tr>
                <th scope="row">Shu</th><td>Expansion-wave collapse and accretion</td>
                <td>Capture drops to zero near <span>{String.raw`\(1.4c_s\)`}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="figure-note">
          Each model includes an interactive trajectory animation and a capture-volume plot.
          Select any plot to open the full-resolution figure.
        </p>

        <SimulationPair
          model="Homogeneous Collapse"
          description={
            <>
              <p>
                We assume a homogeneous spherical density distribution collapsing at a fixed fraction{' '}
                <span>{String.raw`\(\alpha\)`}</span> of the free-fall rate. This model admits a semi-analytic
                expression for the number of captured planetesimals and serves as a test of the numerical procedures.
                In the slow-collapse approximation, before the finite initial radius limits capture,
              </p>
              <div className="math-block">
                {String.raw`\[
                  N_{\rm capt}(v_0) \approx 38\,\alpha^{3/2} n_0 \left(\frac{GM}{v_0^2}\right)^3 .
                \]`}
              </div>
              <p>
                The length scale <span>{String.raw`\(GM/v_0^2\)`}</span> characterizes the region in which the
                gravitational potential strongly perturbs a trajectory with initial speed{' '}
                <span>{String.raw`\(v_0\)`}</span>. The capture volume scales as the cube of this length, giving a
                dependence of <span>{String.raw`\(v_0^{-6}\)`}</span>; within this regime, halving the initial speed
                increases the capture volume by a factor of 64. Arbitrarily fast-moving planetesimals can in principle
                be captured as the cloud collapses to a point. The numerical results follow the analytic approximation
                until <span>{String.raw`\(v_0\)`}</span> is sufficiently small that the finite initial cloud radius
                modifies the capture volume.
              </p>
            </>
          }
          animation="planetesimal-simulations/homogeneous-trajectories.html"
          plot="planetesimal-homogeneous-capture-volume.png"
          plotAlt="Homogeneous-collapse capture volume versus initial planetesimal speed"
          caption={
            <>
              Top panel: capture volume as a function of initial speed normalized by the sound speed,{' '}
              <span>{String.raw`\(v_0/c_s\)`}</span>. Different curves correspond to three initial cloud radii; the
              dashed curve shows the analytic approximation. Bottom panel: capture volume normalized by the initial
              cloud volume. The capture volume is roughly equal to the cloud volume when{' '}
              <span>{String.raw`\(v_0\)`}</span> is comparable to the initial escape speed.
            </>
          }
        />

        <SimulationPair
          model="Larson–Penston Collapse"
          description={
            <>
              <p>
                The Larson–Penston self-similar solution has an approximately uniform central density and an envelope
                whose density declines as <span>{String.raw`\(1/r^2\)`}</span>. The scale radius separating these
                regions decreases with time, while the dimensionless density profile retains its shape. We truncate
                the solution at the radius enclosing one solar mass.
              </p>
              <p>
                The rapid evolution of the central potential does not allow capture of arbitrarily fast-moving
                planetesimals. The crossing time of the central region also decreases, and the specific energy lost
                remains of order <span>{String.raw`\(c_s^2\)`}</span>, approaching zero in the limit of collapse.
                A rough analytic estimate gives a maximum initial speed of a few times{' '}
                <span>{String.raw`\(c_s\)`}</span>. The numerical capture rate drops to zero above approximately{' '}
                <span>{String.raw`\(6c_s\)`}</span>, or about 1 km/s, in rough agreement with this estimate.
              </p>
            </>
          }
          animation="planetesimal-simulations/larson-trajectories.html"
          plot="planetesimal-larson-capture-volume.png"
          plotAlt="Larson-Penston capture volume versus initial planetesimal speed"
          caption={
            <>
              Top panel: capture volume as a function of <span>{String.raw`\(v_0/c_s\)`}</span> for three initial
              scale radii, corresponding to different starting times in the collapse. Bottom panel: capture volume
              normalized by the volume of the truncated cloud at the initial time. Capture drops to zero near{' '}
              <span>{String.raw`\(6c_s\)`}</span>.
            </>
          }
        />

        <SimulationPair
          model="Shu Collapse"
          description={
            <>
              <p>
                We model accretion onto the young protostar using the Shu self-similar expansion-wave collapse
                solution. A growing central point mass is surrounded by a spherically symmetric envelope. An expansion
                wave propagates outward at the sound speed, separating infalling gas from the static outer envelope.
                The gravitational potential is time-dependent only inside the expansion wave, so planetesimals must
                enter this region to lose energy.
              </p>
              <p>
                The Larson–Penston solution approaches a <span>{String.raw`\(1/r^2\)`}</span> density profile, and
                the Shu solution begins with this radial dependence. Their density normalizations differ by a factor
                of 4.4, however, so we treat them as separate models rather than two stages of the same process.
                The Shu solution has the lowest cutoff speed of the three models: capture drops to zero above
                approximately <span>{String.raw`\(1.4c_s\)`}</span>, or 0.26 km/s.
              </p>
            </>
          }
          animation="planetesimal-simulations/shu-trajectories.html"
          plot="planetesimal-shu-capture-volume.png"
          plotAlt="Shu-collapse capture volume versus initial planetesimal speed"
          caption={
            <>
              Top panel: capture volume as a function of <span>{String.raw`\(v_0/c_s\)`}</span> for three final
              expansion-wave radii, when the wave reaches approximately all, one tenth, or one hundredth of the initial
              cloud mass. Bottom panel: capture volume normalized by the volume within the final expansion-wave
              radius. The cutoff speed is <span>{String.raw`\(1.4c_s\)`}</span> in all three cases.
            </>
          }
        />

      </section>

      <section className="writeup-section" aria-labelledby="implications-title">
        <h2 id="implications-title">Interpretation and limitations</h2>
        <p>
          We find that the total mass budget of solid material within a protoplanetary disk is not significantly
          augmented by gravitationally captured planetesimals. Our model with the highest Maxwellian-integrated
          capture volume is the Larson–Penston collapse model with <span>{String.raw`\(\langle v_0\rangle=0.7\)`}</span>{' '}
          km/s. In this case, the total captured mass is{' '}
          <span>{String.raw`\(M_{\rm capt}=\rho_{\rm ptml}^{\rm clus}\bar V_{\rm capt}=0.07\,M_\oplus\)`}</span>.
          Since this is significantly less than the expected mass in a typical protoplanetary disk, and it is by no
          means certain that all of, or even a majority of, the objects captured gravitationally will make it into
          the protoplanetary disk, we do not consider it plausible that gravitational capture of planetesimals
          significantly impacts the overall solid abundance in the disk.
        </p>
        <p>
          On the other hand, a single sufficiently large planetesimal, if entrained within the flow of the local disk
          material, may grow to planet size within the disk lifetime by accretion of pebbles that formed within the
          disk.{' '}
          <a href="https://doi.org/10.1051/0004-6361/201219127" target="_blank" rel="noreferrer">
            Lambrechts and Johansen (2012)
          </a>{' '}
          and{' '}
          <a href="https://doi.org/10.3847/1538-4357/acaf5b" target="_blank" rel="noreferrer">
            Lyra et al. (2023)
          </a>{' '}
          study the rate at which planetesimals may grow as a result of collisions with small aerodynamically coupled
          solid objects, in the process known as “pebble accretion.” They find that growth to planet size within
          1 million years is possible at 5 AU from the central star starting from a seed planetesimal with diameter
          between a few hundred and about 1,000 km, depending on the assumed disk mass, pebble size distribution, and
          disk pressure profile. These numbers are comparable to or smaller than our estimates for the largest body
          captured from the birth cluster, but much larger than the largest body reasonably captured from the Galactic
          planetesimal population. Thus, we conclude that gravitational capture of planetesimals from the same birth
          cluster may accelerate planet formation in some stars, or even enable it to occur in disks that are, for
          whatever reason, not efficient at forming their own planetesimals.
        </p>
        <p>
          The one-dimensional collapse models studied here are not sufficient to determine whether the captured
          planetesimals actually end up entrained in the disk material. Thus, our estimate of the largest body captured
          should be taken as an upper bound on the largest body that is entrained in the disk material. This question,
          as well as the possibility of erosion of the planetesimals by sand-blasting with pebbles as they interact
          with the disk, will be investigated in the future.
        </p>
      </section>

      <p className="figure-note">
        Preliminary results were presented at the Texas Section meeting of the American Physical Society.
        A more detailed description of the methods and results is available in the {' '}
        <a href={PREPRINT_URL} target="_blank" rel="noreferrer">preprint</a>.
      </p>
    </div>
  );
}

export default PlanetesimalProject;

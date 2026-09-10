import PebbleCoreViewer from '../components/PebbleCoreViewer';
import assetPath from '../utils/assetPath';

function PebbleBedReactors() {
  return (
    <div>
      <div className="page-header">
        <h1>DEM–Monte Carlo Modeling of Burnup in a Pebble-Bed Reactor</h1>
      </div>

      <section className="writeup-section" aria-labelledby="pebble-context-title">
        <h2 id="pebble-context-title">Pebble-Bed Reactors and Nuclear Safeguards</h2>

        <p>
          Pebble-bed reactors are a type of high-temperature gas-cooled nuclear reactor that operate by continuously
          circulating spherical graphite pebbles embedded with fissile material throughout the reactor core. As the
          pebbles flow downward through the core, they are exposed to neutron flux and undergo burnup. After completing a
          certain number of passes, the fuel reaches a spent state and must be removed from the system.
        </p>

        <p>
          This dynamic fuel configuration offers advantages for nuclear nonproliferation. Each tristructural isotropic
          (TRISO) fuel particle encapsulates fissile material in multiple protective ceramic layers, making mechanical
          separation and chemical reprocessing of the fissile material more difficult than in conventional fuel designs.
          Over the course of reactor operation, radioactive isotopes accumulate within the fuel, introducing additional
          challenges for safety, waste handling, and Materials Control and Accountability. For these reasons, accurate
          tools for modeling burnup behavior in pebble-bed reactors are important for both reactor operation and regulatory
          compliance.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="pebble-objective-title">
        <h2 id="pebble-objective-title">Project Objective</h2>

        <p>
          As a DOE SULI intern in Brookhaven National Laboratory’s Nonproliferation and National Security Department, I
          worked on a computational framework for modeling fuel motion and burnup in a pebble-bed reactor. The project
          aimed to use the open-source Monte Carlo neutron-transport code OpenMC to generate simulated neutron and gamma-ray
          spectra for individual pebbles or reactor fuel elements at various stages of burnup.
        </p>

        <p>
          In conjunction with OpenMC, the LIGGGHTS discrete-element-method code can model the motion and configuration of
          pebbles in a geometrically accurate reactor model. A comprehensive dataset of spectral signatures corresponding
          to different burnup levels could then provide the foundation for training a machine-learning model to predict
          the burnup of previously unseen pebbles based only on their measured spectra. This approach could provide a
          real-time, nondestructive method for estimating burnup and improve reactor monitoring, fuel-cycle management,
          and safety assessments.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="pebble-methods-title">
        <h2 id="pebble-methods-title">Coupling Pebble Motion and Neutron Transport</h2>

        <p>
          This project used OpenMC and LIGGGHTS in tandem to model both the neutronics and the mechanical motion of pebbles
          within a pebble-bed reactor core. The simulation began with the generation of a reactor geometry. Pebbles were
          introduced from the top of a chute to simulate gravity-driven loading. As the simulation progressed, the motion
          and settling of each pebble were tracked, and their positions were recorded over time as they filled the reactor
          core. These time-dependent spatial configurations were then exported and converted into geometries for OpenMC.
        </p>

        <p>
          Within OpenMC, each pebble was populated with a graphite lattice structure, and TRISO fuel particles were
          randomly distributed throughout its interior. The intended coupled workflow used the geometries recorded by LIGGGHTS in
          neutron-transport and depletion calculations. These calculations would solve for the evolving isotopic
          composition of each pebble and determine its burnup at each timestep. As neutron interactions occur over time,
          the initial fissile isotopes undergo transmutation, producing a changing mixture of fission products and
          actinides. That isotopic composition can be used to calculate burnup and produce the simulated spectra needed for
          burnup-prediction models.
        </p>

        <h3>Interactive Core Geometry</h3>
        <p>
          The interactive view below lets you rotate and inspect a pebble-bed core geometry.
        </p>
        <PebbleCoreViewer height={560} />
      </section>

      <section className="writeup-section" aria-labelledby="pebble-computation-title">
        <h2 id="pebble-computation-title">Computational Challenges and Future Work</h2>

        <p>
          OpenMC represents the reactor using constructive solid geometry. This method defines surfaces and regions analytically
          through Boolean operations on quadratic surfaces, enabling precise spatial modeling without premeshed volumes.
          To represent the fuel microstructure inside each pebble, OpenMC uses lattice universes that place fuel particles
          in a repeated pattern. In this project, a three-dimensional lattice inside each pebble represented TRISO fuel
          particles at predefined positions within the graphite matrix.
        </p>

        <p>
          This representation introduces significant computational challenges, particularly in memory usage. The poster
          cites Liang et al.’s study of the virtual lattice method for memory requirements that can exceed 192 GB in
          realistic reactor geometries, posing a substantial barrier to full-scale simulation. During this project, I
          explored downsizing the geometry, simplifying the lattice, and experimenting with a virtual-lattice approach
          designed to reduce the number of explicitly constructed lattice elements.
        </p>

        <p>
          Even with these adjustments, the computational time required for burnup calculations remained a limiting factor.
          The poster identifies more memory-efficient and computationally efficient algorithms for lattice construction
          as the focus of future work. These improvements would make full-core simulations more practical and enable
          the generation of simulated burnup spectra for burnup-prediction models.
        </p>

        <p>
          The original poster below describes the methods and computational limitations and includes the references to
          Romano et al. on OpenMC and Liang et al. on the virtual lattice method.
        </p>
      </section>

      <div>
        <iframe
          src={assetPath('Anderson_R_poster_final.pdf')}
          className="document-frame"
          title="WDTS SULI Pebble Bed Poster"
        ></iframe>
        <p>
          <a href={assetPath('Anderson_R_poster_final.pdf')} download>
            Download the poster (PDF)
          </a>{' '}
          |{' '}
          <a href={assetPath('Anderson_R_poster_final.pptx')} download>
            Original PPTX
          </a>
        </p>
      </div>
    </div>
  );
}

export default PebbleBedReactors;

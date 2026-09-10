import assetPath from '../utils/assetPath';

function NextDataAnalysis() {
  return (
    <div>
      <div className="page-header">
        <h1>Research with the NEXT Experiment</h1>
      </div>

      <section className="writeup-section" aria-labelledby="next-purpose-title">
        <h2 id="next-purpose-title">Why NEXT Searches for Neutrinoless Double-Beta Decay</h2>

        <p>
          The Standard Model is the most successful theory for describing how the universe works. However, there are still
          major questions that are not understood within this framework, including the mechanism behind neutrino mass and
          what gave rise to the matter-antimatter asymmetry. Neutrinos are among the least understood particles in the
          Standard Model and may provide answers to these questions. One possibility is that neutrinos are their own
          antiparticles, also called Majorana fermions. This would allow processes that violate lepton-number conservation
          and could provide an explanation for how neutrinos get their mass.
        </p>

        <p>
          The most sensitive method of determining whether the neutrino is a Majorana fermion is to search for the
          ultra-rare process known as neutrinoless double-beta decay, or <span>{String.raw`\(0\nu\beta\beta\)`}</span>. The{' '}
          <a href="https://next-experiment.org/" target="_blank" rel="noreferrer">
            Neutrino Experiment with a Xenon TPC (NEXT)
          </a>{' '}
          searches for this process using a high-pressure gaseous-xenon time-projection chamber. Unlike Standard Model
          two-neutrino double-beta decay, no neutrinos are emitted in <span>{String.raw`\(0\nu\beta\beta\)`}</span>, so the
          process would violate lepton-number conservation. The decay of <span>{String.raw`\(^{136}\mathrm{Xe}\)`}</span>{' '}
          produces a <span>{String.raw`\(^{136}\mathrm{Ba}^{2+}\)`}</span> daughter ion and two electrons whose summed energy
          is 2.458 MeV.
        </p>

        <div className="math-block">
          {String.raw`\[
            2\nu\beta\beta:\qquad
            (A,Z)\rightarrow(A,Z+2)+2e^-+2\bar{\nu}_e
          \]
          \[
            0\nu\beta\beta:\qquad
            (A,Z)\rightarrow(A,Z+2)+2e^-
          \]`}
        </div>

        <figure className="media-card">
          <img
            src={assetPath('next-double-beta-decay.png')}
            alt="Feynman diagrams comparing two-neutrino and neutrinoless double-beta decay"
          />
          <figcaption>
            The Standard Model <span>{String.raw`\(2\nu\beta\beta\)`}</span> process (left) and{' '}
            <span>{String.raw`\(0\nu\beta\beta\)`}</span> (right).
          </figcaption>
        </figure>
      </section>

      <section className="writeup-section" aria-labelledby="next-detector-title">
        <h2 id="next-detector-title">How NEXT-100 Turns a Decay into a 3D Track</h2>

        <p>
          NEXT-100 has an active volume approximately one meter in diameter and 1.3 meters long. Charged particles produced
          inside the active volume ionize and excite the xenon. Excitation produces the primary-scintillation signal, S1.
          The ionization electrons are then drifted to the electroluminescence region and amplified to produce the S2 light.
          An array of 60 photomultiplier tubes and 3,584 silicon photomultipliers at the end caps measures the energy and
          provides tracking information from the light produced.
        </p>

        <p>The position-dependent detected signals can be written as</p>

        <div className="math-block">
          {String.raw`\[
            N_1(x,y,z)=\epsilon_1(x,y,z)N_{\mathrm{ph}},
            \qquad
            N_2(x,y,z)=\epsilon_2(x,y,z)\eta_{\mathrm{EL}}N_e.
          \]`}
        </div>

        <p>
          Here, <span>{String.raw`\(N_1\)`}</span> and <span>{String.raw`\(N_2\)`}</span> are the detected S1 and S2 signals,
          expressed in photoelectrons. <span>{String.raw`\(N_{\mathrm{ph}}\)`}</span> and{' '}
          <span>{String.raw`\(N_e\)`}</span> are the scintillation photons and ionization electrons, while{' '}
          <span>{String.raw`\(\eta_{\mathrm{EL}}\)`}</span> is the effective electron-to-photon amplification factor from
          electroluminescence. The position-dependent efficiencies <span>{String.raw`\(\epsilon_1\)`}</span> and{' '}
          <span>{String.raw`\(\epsilon_2\)`}</span> include photocathode coverage, quantum efficiency, light absorption, and
          electron-attachment effects.
        </p>

        <p>
          The primary electrons scatter through the xenon gas, ionizing and exciting the gas as they deposit energy. In
          xenon, primary electrons travel roughly 20 cm at 10 bar and 2 m at 1 bar. This allows track features to be
          resolved, including the increase in energy density as each electron stops, known as the Bragg peak. A
          three-dimensional track topology, consisting of voxels with an <span>{String.raw`\(x\)`}</span>,{' '}
          <span>{String.raw`\(y\)`}</span>, <span>{String.raw`\(z\)`}</span>, and energy, can be recovered after the ionization
          charge is drifted to the anode, amplified, converted to light, and detected by the light sensors.
        </p>

        <div className="media-grid">
          <figure className="media-card">
            <img
              src={assetPath('next-tpc-schematic.png')}
              alt="Schematic of S1 production, electron drift, and S2 production in a NEXT time-projection chamber"
            />
            <figcaption>A diagram of the NEXT time-projection chamber and the production of S1 and S2 light.</figcaption>
          </figure>

          <figure className="media-card">
            <img
              src={assetPath('next-two-blob-track.png')}
              alt="Reconstructed NEXT event with high-energy blobs at both ends of the track"
            />
            <figcaption>
              A pair-production interaction in NEXT-White. The colors indicate the energy-deposition density; the two
              blobs at the ends correspond to the Bragg peaks of the electron and positron.
            </figcaption>
          </figure>
        </div>

        <p>
          The NEXT-100 simulation framework is divided into two software packages.{' '}
          <a href="https://github.com/next-exp/nexus/" target="_blank" rel="noreferrer">
            NEXUS
          </a>{' '}
          is the first simulation stage and uses Geant4 to handle the detector geometry and physics. It produces energy
          deposits inside the detector. In fast-simulation mode, the simulation stops after producing the energy deposits;
          in full-simulation mode, ionization charge and photons are created and propagated toward the sensors.{' '}
          <a href="https://github.com/next-exp/IC" target="_blank" rel="noreferrer">
            Invisible Cities
          </a>{' '}
          handles the subsequent reconstruction steps, including sensor calibration, reconstruction, and deconvolution.
        </p>
      </section>

      <section className="writeup-section" aria-labelledby="alpha-recombination-title">
        <h2 id="alpha-recombination-title">Alpha-Particle Recombination Studies with NEXT-100</h2>

        <p>
          The NEXT program is phased, beginning with smaller prototype detectors such as NEXT-DEMO in Valencia and
          NEXT-White at the Canfranc Underground Laboratory in Spain. At the time of this project, NEXT-100 had begun
          commissioning and was taking alpha-particle runs with argon. The alpha particles were typically progeny of the
          radon-222 decay chain, including alphas with energies of 5.59 MeV from radon-222, 6.115 MeV from polonium-218,
          and 7.834 MeV from polonium-214.
        </p>

        <p>
          During the circulation of argon through the ambient-temperature getter, which purifies the gas of impurities
          such as oxygen, radon was also circulated inside the detector because of emanation from the getter cartridge.
          Daughter isotopes produced in the decay are often positively charged and can therefore be affected by the
          detector’s electrostatic fields. Plating of these daughters on detector surfaces such as the cathode is common.
        </p>

        <figure className="media-card">
          <img
            src={assetPath('next-radon-222-decay.png')}
            alt="Radon-222 decay chain with alpha and beta decay energies and isotope half-lives"
          />
          <figcaption>The radon-222 decay chain.</figcaption>
        </figure>

        <p>
          My first project with the NEXT collaboration examined electron-ion recombination in alpha-particle events
          associated with the commissioning of NEXT-100. NEXT-100 is a high-pressure time-projection chamber designed to
          search for neutrinoless double-beta decay. When a charged particle deposits energy in the detector gas, it
          produces both excited atoms and electron-ion pairs. Electrons that remain free drift toward the
          electroluminescence region and contribute to the secondary-scintillation signal, S2. Electrons that recombine
          with ions instead increase the primary-scintillation signal, S1, while reducing S2. Consequently, measurements
          of the S1-to-S2 ratio at fixed pressure and different electric-field strengths can be used to quantify
          recombination.
        </p>

        <p>
          Recombination is a function of the electric field. As the field is increased, ionization electrons are pulled
          away more quickly and are less likely to recombine. It is also a function of gas pressure because pressure
          changes the density of atoms per unit volume. Alpha particles have a short range in the gas and are highly
          ionizing, so they typically exhibit significant recombination. In NEXT-100, the ratio of S1 to S2 can be studied
          as a function of electric field at fixed pressure to measure the amount of recombination.
        </p>

        <p>
          Using the Geant4-based NEXUS detector simulation, I generated alpha-particle events in the NEXT-100 geometry. I
          modeled the longitudinal and transverse diffusion of electrons in argon at 4.1 bar, incorporated
          electron-lifetime effects associated with attachment to impurities, and investigated the electric-field
          strengths and optical gain required to resolve changes in the S1 and S2 signals. These ingredients were
          necessary to determine whether recombination could be measured reliably under the expected commissioning
          conditions.
        </p>

        <div className="media-grid">
          <figure className="media-card">
            <img src={assetPath('3031S1Fit.png')} alt="Example S1 fit" />
            <figcaption>Example fit to an S1 waveform.</figcaption>
          </figure>

          <figure className="media-card">
            <img src={assetPath('3031S2Fit.png')} alt="Example S2 fit" />
            <figcaption>Example fit to an S2 waveform.</figcaption>
          </figure>
        </div>

        <p>
          I analyzed the resulting events using Invisible Cities, NEXT’s Python-based reconstruction framework. This
          included reconstructing the longitudinal and transverse positions of alpha events, examining their spatial and
          temporal distributions, and applying fiducial cuts to remove events near detector boundaries or other
          problematic regions. I also performed waveform analysis in Python to characterize signal shapes, including
          decay constants and peak widths. By comparing reconstructed data with simulation across electric-field settings,
          I extracted the recombination parameter as a function of field strength. I additionally fit the reconstructed
          alpha-energy distributions to determine their energy resolution. This project gave me experience connecting
          microscopic detector physics to simulated and reconstructed observables using Geant4, NEXUS, Invisible Cities,
          and Python-based data analysis.
        </p>

        <figure className="media-card">
          <div className="quadrant-grid">
            <img src={assetPath('quadrantfit1.png')} alt="Charge-lifetime fit in detector quadrant 1" />
            <img src={assetPath('quadrantfit2.png')} alt="Charge-lifetime fit in detector quadrant 2" />
            <img src={assetPath('quadrantfit3.png')} alt="Charge-lifetime fit in detector quadrant 3" />
            <img src={assetPath('quadrantfit4.png')} alt="Charge-lifetime fit in detector quadrant 4" />
          </div>
          <figcaption>Charge-lifetime fits across four regions of the detector plane.</figcaption>
        </figure>
      </section>

      <section className="writeup-section" aria-labelledby="next-eft-title">
        <h2 id="next-eft-title">Effective-Field-Theory Signatures in the NEXT Experiment</h2>

        <p>
          My second NEXT project investigated how different mechanisms of neutrinoless double-beta decay could modify
          observables measured by a high-pressure xenon time-projection chamber. The conventional description of
          neutrinoless double-beta decay involves the exchange of virtual light Majorana neutrinos. This mechanism,
          however, represents only one possible source of lepton-number violation. Higher-dimensional operators in
          Standard Model effective field theory can produce the same decay while changing its total rate, the individual
          energies of the emitted electrons, and their angular correlation.
        </p>

        <p>
          This formalism is called Standard Model effective field theory, in which the Standard Model Lagrangian is written
          as an expansion in terms of a higher energy scale, <span>{String.raw`\(E_{\mathrm{new}}\)`}</span>. The first
          higher-order term is the dimension-five Weinberg operator, which gives Majorana neutrinos a mass. Additional
          lepton-number-violating physics can arise from other odd-dimensional operators in the expansion. Tracking
          detectors that can resolve the individual electrons, such as NEXT, offer a direct connection between image
          topology and the underlying lepton-number-violating quantum-field-theory operators.
        </p>

        <div className="math-block">
          {String.raw`\[
            \mathcal{L}
            =\mathcal{L}_{\mathrm{SM}}
            +\frac{1}{E_{\mathrm{new}}}\mathcal{L}_1
            +\frac{1}{E_{\mathrm{new}}^2}\mathcal{L}_2
            +\cdots
          \]`}
        </div>

        <p>
          In this formalism, the inverse half-life of <span>{String.raw`\(0\nu\beta\beta\)`}</span> can be written in the
          general form
        </p>

        <div className="math-block">
          {String.raw`\[
            T_{1/2}^{-1}
            =g_A^4\sum_k G_{0k}
            \left|\mathcal{A}_k\!\left(\{C_i\},\mathrm{NME},\mathrm{LEC}\right)\right|^2.
          \]`}
        </div>

        <p>
          Here, <span>{String.raw`\(g_A\)`}</span> is the axial-vector coupling constant,{' '}
          <span>{String.raw`\(G_{0k}\)`}</span> denotes atomic phase-space factors, and the sub-amplitudes{' '}
          <span>{String.raw`\(\mathcal{A}_k\)`}</span> contain the nuclear matrix elements, low-energy constants, and Wilson
          coefficients of the higher-dimensional operators.
        </p>

        <p>
          I used the nuDoBE Python package to calculate electron-energy and angular distributions associated with
          different lepton-number-violating operators and Wilson coefficients, beginning with the dimension-six
          right-handed vector coefficient <span>{String.raw`\(C_{VR}^{(6)}\)`}</span>. Rather than examining only the total
          decay rate, I focused on the differential observables that could distinguish mechanisms producing otherwise
          similar event rates. I then incorporated the energy and angular distributions generated by nuDoBE into an event
          generator for NEXUS, allowing events predicted by the effective-field-theory calculations to be propagated
          through a simulation of the NEXT detector.
        </p>

        <figure className="media-card">
          <img
            src={assetPath('next-nudobe-spectra.png')}
            alt="nuDoBE comparison of electron spectra from light-Majorana exchange and a right-handed vector operator"
          />
          <figcaption>Comparison of the event spectra from two models in nuDoBE.</figcaption>
        </figure>

        <p>
          The event generator uses the electron-energy and angular distributions from nuDoBE to set the initial momenta
          of the two electrons in NEXUS. NEXUS then transports the electrons through the xenon gas, where scattering and
          energy loss turn the initial two-vector configuration into extended tracks. The reconstruction problem is to
          compare the opening angle inferred from those tracks with the true angle supplied to the generator and to test
          whether the energy deposited near the end of each track can be used to estimate the individual electron
          energies.
        </p>

        <figure className="media-card">
          <img
            src={assetPath('next-track-topology.png')}
            alt="Initial momenta of two electrons and their simulated tracks after propagation through xenon gas"
          />
          <figcaption>
            The initial electron momentum vectors, <span>{String.raw`\(\mathbf{p}_1\)`}</span> and{' '}
            <span>{String.raw`\(\mathbf{p}_2\)`}</span> (left), and the corresponding tracks after propagation through the
            detector gas (right).
          </figcaption>
        </figure>

        <p>
          To compare the angular signatures, I analyzed the distribution of the opening angle between the two emitted
          electrons and calculated the forward-backward asymmetry. This statistic compares events with{' '}
          <span>{String.raw`\(\cos\theta>0\)`}</span>, in which the electrons are preferentially emitted in similar
          directions, with events having <span>{String.raw`\(\cos\theta<0\)`}</span>, in which they are preferentially
          emitted back-to-back. Because different lepton-number-violating operators can produce distinct angular and
          single-electron energy distributions, these observables may help separate competing mechanisms even when their
          predicted total rates are degenerate.
        </p>

        <div className="math-block">
          {String.raw`\[
            A_{\theta}
            =\frac{N_{\theta>\pi/2}-N_{\theta<\pi/2}}
            {N_{\theta>\pi/2}+N_{\theta<\pi/2}}.
          \]`}
        </div>

        <p>
          The project established a computational connection between effective-field-theory predictions and
          detector-level simulation: nuDoBE supplied the theoretical decay distributions, while NEXUS modeled how the
          corresponding events would appear in NEXT. This work gave me experience with effective field theory, Wilson
          coefficients, differential decay observables, Monte Carlo event generation, and the use of angular correlations
          to investigate possible sources of physics beyond the Standard Model.
        </p>
      </section>
    </div>
  );
}

export default NextDataAnalysis;

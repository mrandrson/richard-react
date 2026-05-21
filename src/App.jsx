import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PlanetesimalProject from './pages/PlanetesimalProject';
import NextDataAnalysis from './pages/NextDataAnalysis';
import MissileSystems from './pages/MissileSystems';
import PersonalProjects from './pages/PersonalProjects';
import PebbleBedReactors from './pages/PebbleBedReactors';
import Research from './pages/Research';
import About from './pages/About';
import SpectralLearning from './pages/SpectralLearning';
import SpinningPendulum from './pages/SpinningPendulum';
import NBodySimulation from './pages/NBodySimulation';
import QuantumWavePacket from './pages/QuantumWavePacket';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pproject" element={<PlanetesimalProject />} />
          <Route path="nextdataanalysis" element={<NextDataAnalysis />} />
          <Route path="missilesystems" element={<MissileSystems />} />
          <Route path="personalprojects" element={<PersonalProjects />} />
          <Route path="pebblebed" element={<PebbleBedReactors />} />
          <Route path="rprojects" element={<Research />} />
          <Route path="spectrallearning" element={<SpectralLearning />} />
          <Route path="spinningpendulum" element={<SpinningPendulum />} />
          <Route path="nbodysimulation" element={<NBodySimulation />} />
          <Route path="quantumwavepacket" element={<QuantumWavePacket />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

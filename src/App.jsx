import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PlanetesimalProject from './pages/PlanetesimalProject';
import NextDataAnalysis from './pages/NextDataAnalysis';
import PersonalProjects from './pages/PersonalProjects';
import PebbleBedReactors from './pages/PebbleBedReactors';
import Research from './pages/Research';
import About from './pages/About';
import SpectralLearning from './pages/SpectralLearning';
import SpinningPendulum from './pages/SpinningPendulum';
import NBodySimulation from './pages/NBodySimulation';
import QuantumWavePacket from './pages/QuantumWavePacket';
import CV from './pages/CV';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pproject" element={<PlanetesimalProject />} />
          <Route path="nextdataanalysis" element={<NextDataAnalysis />} />
          <Route path="personalprojects" element={<Navigate to="/code" replace />} />
          <Route path="pebblebed" element={<PebbleBedReactors />} />
          <Route path="research" element={<Research />} />
          <Route path="rprojects" element={<Navigate to="/research" replace />} />
          <Route path="code" element={<PersonalProjects />} />
          <Route path="cv" element={<CV />} />
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

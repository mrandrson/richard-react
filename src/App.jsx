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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pproject" element={<PlanetesimalProject />} />
          <Route path="nextdataanalysis" element={<NextDataAnalysis />} />
          <Route path="missilesystems" element={<MissileSystems />} />
          <Route path="personalprojects" element={<PersonalProjects />} />
          <Route path="pebblebed" element={<PebbleBedReactors />} />
          <Route path="rprojects" element={<Research />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

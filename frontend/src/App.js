import './App.css';
import Candidates from './profiles/Candidates';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './profiles/Nav';
import AddCandidates from './profiles/AddCandidate'
import Home from './profiles/Home';
import About from './profiles/About';
import AddCandidate from './profiles/AddCandidate';
import EditCandidate from './profiles/EditCandidate';
import Gallery from './profiles/Gallery';
//1:05


function App() {

  return (
    <BrowserRouter >
      <Nav />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates/new" element={<AddCandidates />} />
        <Route path="/add" element={<AddCandidate />} />
        <Route path="/editCand" element={<EditCandidate />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

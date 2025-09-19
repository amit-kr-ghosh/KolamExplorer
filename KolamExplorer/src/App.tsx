import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Gallery from './pages/Gallery';
import Create from './pages/Create';
import Analyse from './pages/Analyse';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/create" element={<Create />} />
          <Route path="/analyse" element={<Analyse />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
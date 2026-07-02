import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AjoutEmploye from './pages/AjoutEmploye';
import ListeEmployes from './pages/ListeEmployes';
import BilanStats from './pages/BilanStats';
import PrivateRoute from './components/PrivateRoute';
import Profil from './pages/Profil';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/ajout" element={<PrivateRoute><AjoutEmploye /></PrivateRoute>} />
        <Route path="/liste" element={<PrivateRoute><ListeEmployes /></PrivateRoute>} />
        <Route path="/bilan" element={<PrivateRoute><BilanStats /></PrivateRoute>} />
        <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
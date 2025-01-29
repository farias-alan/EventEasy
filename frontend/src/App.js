import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RecuperarSenha from './Modal/RecuperarSenha'; 
import CadastroPage from './pages/CadastroPage/CadastroPage';
import ParticipantePage from './pages/ParticipantePage/ParticipantePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/participante" element={<ParticipantePage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "../../templates/logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleRegisterClick = () => {
    navigate("/cadastro"); 
  };

  return (
    <div className="home-container">
      <img src={logo} alt="EventEasy Logo" className="logo" />
      <div className="content">
        <h2 className="description">
          EventEasy, sua<br />
          plataforma de<br />
          gerenciar eventos.
        </h2>
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleLoginClick}>
            Entrar
          </button>
          <p>OU</p>
          <button className="btn btn-secondary" onClick={handleRegisterClick}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

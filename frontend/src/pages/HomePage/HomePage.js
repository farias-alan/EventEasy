import React from "react";
import "./HomePage.css";
import logo from "../../templates/logo.png";

const HomePage = () => {
  return (
    <div className="home-container">
      
      <img src={logo} alt="EventEasy Logo" className="logo" />

     
      <div className="content">
        <h2 className="description">
          EventEasy, sua<br />
          plataforma de gerenciar<br />
          eventos.
        </h2>
        <div className="buttons">
          <button className="btn btn-primary">Entrar</button>
          <p>OU</p>
          <button className="btn btn-secondary">Cadastrar</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

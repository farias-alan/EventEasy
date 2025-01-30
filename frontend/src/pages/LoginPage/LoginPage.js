import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../templates/logo.png";
import React, { useState } from "react";
import RecuperarSenha from "../../Modal/RecuperarSenha";

const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("https://eventeasy-api.onrender.com/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar login. Verifique suas credenciais.");
      }

      const data = await response.json();
      console.log("Login bem-sucedido!", data);

      
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userType", data.tipoUsuario);

      
      if (data.tipoUsuario === "Administrador") {
        navigate("/administrador");
      } else if (data.tipoUsuario === "Participante") {
        navigate("/participante");
      } else {
        alert("Tipo de usuário desconhecido.");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="EventEasy Logo" className="login-logo" />
      <div className="login-box">
        <h2 className="login-title">Bem-vindo!</h2>
        <form onSubmit={handleLogin}>
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Digite seu email"
            required
            //pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
          />

          <label className="input-label" htmlFor="password">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Digite sua senha"
            required
            minLength="6"
          />

          <button
            type="button"
            className="esqueci-senha"
            onClick={() => setIsModalOpen(true)}
          >
            Esqueceu a senha?
          </button>

          <button type="submit" className="btn login-btn">
            Entrar
          </button>
        </form>
        <p className="signup-text">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="signup-link">
            <br></br>Cadastre-se
          </Link>
        </p>
      </div>
      {isModalOpen && (
        <RecuperarSenha onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default LoginPage;

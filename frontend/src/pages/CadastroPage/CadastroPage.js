import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./CadastroPage.css";
import logo from "../../templates/logo.png";



const CadastroPage = () => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipoUsuario: "",
  });

  //const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!form.nome || !form.cpf || !form.email || !form.senha || !form.confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!form.tipoUsuario) {
      alert("Por favor, selecione uma opção de usuário.");
      return;
    }

    console.log("Formulário enviado com sucesso:", form);

    // Envio para o backend
    /*
  try {
    const response = await fetch("LINK DO ENDPOINT AQUI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar. Tente novamente.");
    }

    const data = await response.json();
    console.log("Cadastro realizado com sucesso:", data);

    
    alert("Cadastro realizado com sucesso!");
    navigate("/login");

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar. Por favor, tente novamente mais tarde.");
  }
  */
};
  

  return (
    <div className="cadastro-container">
      <img src={logo} alt="EventEasy Logo" className="cadastro-logo" />
      <div className="cadastro-box">
        <h2 className="cadastro-title">Cadastrar</h2>
        <form onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="input-field"
            placeholder="Digite seu nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label className="input-label" htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            className="input-field"
            placeholder="Digite seu CPF"
            value={form.cpf}
            onChange={handleChange}
            required
          />

          <label className="input-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="input-label" htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            className="input-field"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <label className="input-label" htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            className="input-field"
            placeholder="Confirme sua senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />

          <div className="checkbox-group">
            <label>
              <input
                type="radio"
                name="tipoUsuario"
                value="participante"
                onChange={handleChange}
              />
              Sou Participante
            </label>
            <label>
              <input
                type="radio"
                name="tipoUsuario"
                value="administrador"
                onChange={handleChange}
              />
              Sou Administrador de Eventos
            </label>
          </div>

          <button type="submit" className="btn cadastro-btn">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPage;

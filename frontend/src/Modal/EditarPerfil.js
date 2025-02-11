import React, { useState, useEffect } from "react";

const token = localStorage.getItem("authToken");

const EditarPerfil = ({ userId, closeModal }) => {
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
    email: "",
  });

  const [senhaData, setSenhaData] = useState({
    novaSenha: "",
    confirmaNovaSenha: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch("https://eventeasy-api.onrender.com/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do usuário");
        }

        const data = await response.json();
        setUserData({
          nome: data.nome || "",
          cpf: data.cpf || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const response = await fetch("https://eventeasy-api.onrender.com/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      alert("Perfil atualizado com sucesso!");
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao atualizar o perfil. Verifique os dados e tente novamente.");
    }
  };

  const handleChangePassword = async () => {
    if (senhaData.novaSenha !== senhaData.confirmaNovaSenha) {
      alert("As senhas não coincidem!");
      return;
    }
  
    try {
      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }
  
      const response = await fetch("https://eventeasy-api.onrender.com/api/users/mudar-senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          novaSenha: senhaData.novaSenha,
          confirmaNovaSenha: senhaData.confirmaNovaSenha,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Erro ao trocar a senha: ${errorText}`);
      }

      alert("Senha alterada com sucesso!");
      setSenhaData({ novaSenha: "", confirmaNovaSenha: "" });
    } catch (error) {
      console.error("Erro ao alterar a senha:", error.message);
      alert(error.message); 
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>

        <h2 className="modal-title">Editar Perfil</h2>

        <label className="modal-label">Nome</label>
        <input
          type="text"
          className="modal-input"
          value={userData.nome}
          onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
        />

        <label className="modal-label">CPF</label>
        <input type="text" className="modal-input" value={userData.cpf} disabled />

        <label className="modal-label">Email</label>
        <input
          type="email"
          className="modal-input"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <button className="modal-btn" onClick={handleSave}>Salvar</button>

        <h3 className="modal-subtitle">Trocar Senha</h3>

        <label className="modal-label">Nova Senha</label>
        <input
          type="password"
          className="modal-input"
          value={senhaData.novaSenha}
          onChange={(e) => setSenhaData({ ...senhaData, novaSenha: e.target.value })}
        />

        <label className="modal-label">Confirme a Senha</label>
        <input
          type="password"
          className="modal-input"
          value={senhaData.confirmaNovaSenha}
          onChange={(e) => setSenhaData({ ...senhaData, confirmaNovaSenha: e.target.value })}
        />

        <button className="modal-btn" onClick={handleChangePassword}>Trocar a Senha</button>
      </div>

      {/* 🔹 CSS embutido no componente */}
      <style>
        {`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: #D9D9D9;
          padding: 20px;
          border-radius: 10px;
          width: 350px;
          text-align: center;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }

        .modal-title {
          color: #1B1A67;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .modal-label {
          display: block;
          text-align: left;
          font-weight: bold;
          color: #1B1A67;
          margin-bottom: 5px;
        }

        .modal-input {
          width: 100%;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .modal-btn {
          width: 100%;
          background: #1B1A67;
          color: white;
          padding: 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        }

        .modal-btn:hover {
          background-color: #3533CD;
        }

        .modal-subtitle {
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
          color: #1B1A67;
        }
        `}
      </style>
    </div>
  );
};

export default EditarPerfil;

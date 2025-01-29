import React, { useState, useEffect } from "react";

const EditarPerfil = ({ userId, closeModal }) => {
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
    email: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await fetch(`link api/${userId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do usuário");
        }
        const data = await response.json();
        setUserData({
          nome: data.nome || "",
          cpf: data.cpf || "",
          email: data.email || "",
          novaSenha: "",
          confirmarSenha: "",
        });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await fetch(`link api/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        closeModal();
      } else {
        throw new Error("Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={(e) => { e.stopPropagation(); closeModal(); }}>✖</button>

        <h2 className="modal-title">Editar Perfil</h2>

        <label className="modal-label">Nome</label>
        <input
          type="text"
          className="modal-input"
          value={userData.nome}
          onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
        />

        <label className="modal-label">CPF</label>
        <input
          type="text"
          className="modal-input"
          value={userData.cpf}
          disabled
        />

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
          value={userData.novaSenha}
          onChange={(e) => setUserData({ ...userData, novaSenha: e.target.value })}
        />

        <label className="modal-label">Confirme a Senha</label>
        <input
          type="password"
          className="modal-input"
          value={userData.confirmarSenha}
          onChange={(e) => setUserData({ ...userData, confirmarSenha: e.target.value })}
        />

        <button className="modal-btn" onClick={handleSave}>Trocar a Senha</button>
      </div>
    </div>
  );
};

export default EditarPerfil;


const styles = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #D9D9D9;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-height: 500px;
  overflow-y: auto;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
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
  color: #1B1A67;
}

.close-btn:hover {
  color: #3533CD;
}

.modal-title {
  color: #1B1A67;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-label {
  color: #1B1A67;
  font-size: 14px;
  text-align: left;
  display: block;
  margin-top: 5px;
}

.modal-input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: white;
  margin-bottom: 10px;
}

.modal-btn {
  background: #3533CD;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
}

.modal-btn:hover {
  background: #1B1A67;
}

.modal-subtitle {
  color: #1B1A67;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
}`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

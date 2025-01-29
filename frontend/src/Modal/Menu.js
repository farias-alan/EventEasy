import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditarPerfil from "./EditarPerfil";

const Menu = ({ closeMenu }) => {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("link da api/logout", {
        method: "POST",
        credentials: "include", 
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        navigate("/"); 
      } else {
        console.error("Erro ao realizar logoff");
      }
    } catch (error) {
      console.error("Erro ao se comunicar com o backend:", error);
    }
  };

  return (
    <>
      <div className="menu-container">
        <div className="menu-item" onClick={() => setMostrarModal(true)}>Editar Perfil</div>
        <div className="menu-item" onClick={handleLogout}>Sair</div>
      </div>

      
      {mostrarModal && <EditarPerfil closeModal={() => setMostrarModal(false)} />}
    </>
  );
};

export default Menu;


const styles = `
.menu-container {
  position: absolute;
  top: 70px;  /* Move o menu mais para baixo */
  right: 30px; /* Move um pouco para a esquerda */
  background: #D9D9D9;
  width: 140px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.menu-item {
  color: #1B1A67;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 15px;
  text-align: right;
  cursor: pointer;
}

.menu-item:hover {
  background: rgba(27, 26, 103, 0.1);
}`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

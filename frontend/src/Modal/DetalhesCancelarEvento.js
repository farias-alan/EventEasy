import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditarEvento from "./EditarEvento";


const DetalhesCancelarEvento = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`link api/${eventoId}`);
        if (!response.ok) throw new Error("Erro ao buscar evento");

        const data = await response.json();
        setEvento(data);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [eventoId]);

  const handleCancelar = async () => {
    if (window.confirm("Tem certeza que deseja cancelar este evento?")) {
      try {
        const response = await fetch(`link api/${eventoId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Erro ao cancelar evento");

        alert("Evento cancelado com sucesso!");
        closeModal();
      } catch (error) {
        console.error("Erro ao cancelar evento:", error);
        alert("Erro ao cancelar evento.");
      }
    }
  };

  
  const handleSalvar = async (eventoEditado) => {
    try {
      const response = await fetch(`link api/${eventoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventoEditado),
      });

      if (!response.ok) throw new Error("Erro ao atualizar evento");

      setEvento(eventoEditado);
      alert("Evento atualizado com sucesso!");
      setModalEditarAberto(false);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      alert("Erro ao atualizar evento.");
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">Carregando...</div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">Erro ao carregar evento</div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>

       
        <h2 className="modal-title">
          {evento.nome}
          <FaEdit className="edit-icon" onClick={() => setModalEditarAberto(true)} />
        </h2>

        <div className="form-group">
          <label>Data:</label>
          <input type="text" value={evento.data} disabled />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <input type="text" value={evento.hora} disabled />
        </div>

        <div className="form-group">
          <label>Local:</label>
          <input type="text" value={evento.local} disabled />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea value={evento.descricao} disabled className="no-resize" />
        </div>

        <div className="form-group">
          <label>Palestras:</label>
          <textarea 
            value={evento.palestras.map(p => `${p.tema} - ${p.palestrante}`).join("\n")} 
            disabled 
            className="large-box"
          />
        </div>

        <button className="cancel-btn" onClick={handleCancelar}>Cancelar Evento</button>
      </div>

      
      {modalEditarAberto && (
        <EditarEvento
          evento={evento}
          closeModal={() => setModalEditarAberto(false)}
          onSalvar={handleSalvar}
        />
      )}
    </div>
  );
};

export default DetalhesCancelarEvento;


const styles = `
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
  font-family: Arial, sans-serif;
}

.modal-content {
  background: #D9D9D9;
  padding: 20px;
  border-radius: 8px;
  min-height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-btn {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #1B1A67;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.edit-icon {
  font-size: 18px;
  cursor: pointer;
  color: #1B1A67;
  margin-left: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  color: #1B1A67;
  margin-bottom: 5px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f0f0f0;
}

.no-resize {
  resize: none;
  height: 80px;
}

.large-box {
  height: 120px;
  width: 100%;
}

.cancel-btn {
  background: #D9534F;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
}

.cancel-btn:hover {
  background: #B52A27;
}
`;


const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

import React, { useEffect, useState } from "react";
import EditarEvento from "./EditarEvento";

const DetalhesCancelarEvento = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(true);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        if (!token) {
          alert("Token de autenticação não encontrado.");
          return;
        }
        const response = await fetch(`https://eventeasy-api.onrender.com/api/eventos/${eventoId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar evento");

        const data = await response.json();
        setEvento(data);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
        setEvento(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [eventoId]);

  const handleCancelar = async () => {
    if (window.confirm("Tem certeza que deseja cancelar este evento?")) {
      try {
        const token = localStorage.getItem("authToken");
          console.log("Token:", token); 
        
        if (!token) {
          alert("Token de autenticação não encontrado.");
          return;
        }
        const response = await fetch(`https://eventeasy-api.onrender.com/api/eventos/${eventoId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
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
        <div className="modal-content">Erro ao carregar evento.</div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      {modalEditarAberto ? (
        <EditarEvento
          eventoId={eventoId}
          evento={evento}
          closeModal={() => {
            setModalEditarAberto(false);
            setModalDetalhesAberto(true);
          }}
        />
      ) : (
        modalDetalhesAberto && (
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖</button>

            <h2 className="modal-title">{evento.nome}</h2>

            
            <div className="event-image-container">
              {evento.imagem ? (
                <img src={`data:image/png;base64,${evento.imagem}`} alt="Evento" className="event-image" />
              ) : (
                <div className="image-placeholder">Imagem do Evento</div>
              )}
            </div>

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
                value={evento.palestras?.length ? evento.palestras.map(p => `${p.tema} - ${p.palestrante}`).join("\n") : "Nenhuma palestra cadastrada"} 
                disabled 
              />
            </div>

           
            <button 
              className="edit-btn"
              onClick={() => {
                setModalDetalhesAberto(false);
                setModalEditarAberto(true);
              }}
            >
              Editar Evento
            </button>

            <button className="cancel-btn" onClick={handleCancelar}>Cancelar Evento</button>
          </div>
        )
      )}

    
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
          text-align: left;
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
          text-align: center;
          color: #1B1A67;
          font-size: 20px;
          font-weight: bold;
        }

        .event-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
        }

        .event-image {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: 10px;
        }

        .image-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 150px;
          background: #e0e0e0;
          color: #1B1A67;
          font-size: 16px;
          border-radius: 10px;
        }

        .form-group {
          margin-bottom: 10px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
          color: #1B1A67;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .edit-btn {
          background: #1B1A67;
          color: white;
          padding: 8px;
          width: 100%;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
        }

        .edit-btn:hover {
          background-color: #3533CD;
        }

        .cancel-btn {
          width: 100%;
          background: red;
          color: white;
          padding: 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          margin-top: 10px;
        }

        .cancel-btn:hover {
          background-color: darkred;
        }
        `}
      </style>
    </div>
  );
};

export default DetalhesCancelarEvento;

import React, { useState, useEffect } from "react";

const ModalInscricao = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inscrito, setInscrito] = useState(false);

  
  const getToken = () => {
    return localStorage.getItem("authToken"); 
  };

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const token = getToken();
        const response = await fetch(`https://eventeasy-api.onrender.com/api/eventos/${eventoId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar detalhes do evento");
        }

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

  const handleInscricao = async () => {
    try {
      const token = getToken();
      const response = await fetch("https://eventeasy-api.onrender.com/api/inscricoes", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ eventoId })
      });

      if (response.ok) {
        setInscrito(true);
        alert("Inscrição realizada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao se inscrever no evento:", error);
    }
  };

  if (loading) return <div className="modal">Carregando...</div>;
  if (!evento) return <div className="modal">Evento não encontrado</div>;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>

        <h2 className="modal-title">{evento.nome}</h2>

        
        <div className="modal-group">
          <label className="modal-label"><strong>Data:</strong></label>
          <div className="modal-box">{evento.data}</div>
        </div>

        <div className="modal-group">
          <label className="modal-label"><strong>Hora:</strong></label>
          <div className="modal-box">{evento.hora}</div>
        </div>

        <div className="modal-group">
          <label className="modal-label"><strong>Local:</strong></label>
          <div className="modal-box">{evento.local}</div>
        </div>

        <label className="modal-label"><strong>Descrição:</strong></label>
        <div className="modal-description">{evento.descricao}</div>

        <label className="modal-label"><strong>Palestras:</strong></label>
        <div className="modal-description">
          {evento.palestras?.length > 0 ? (
            evento.palestras.map((palestra, index) => (
              <p key={index}>{palestra.tema} - {palestra.palestrante}</p>
            ))
          ) : (
            <p>Nenhuma palestra cadastrada</p>
          )}
        </div>

        {!inscrito ? (
          <button className="modal-btn" onClick={handleInscricao}>Inscrever-se</button>
        ) : (
          <p className="success-message">Inscrição realizada com sucesso!</p>
        )}
      </div>

      
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
          width: 400px;
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

        .modal-label {
          display: block;
          font-weight: bold;
          color: #1B1A67;
          margin-top: 10px;
        }

        .modal-box {
          background: white;
          padding: 10px;
          border-radius: 5px;
          color: black;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .modal-description {
          background: white;
          padding: 8px;
          border-radius: 5px;
          color: black;
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
          margin-top: 15px;
        }

        .modal-btn:hover {
          background-color: #3533CD;
        }

        .success-message {
          color: green;
          font-weight: bold;
          text-align: center;
          margin-top: 10px;
        }
        `}
      </style>
    </div>
  );
};

export default ModalInscricao;

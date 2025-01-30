import React, { useEffect, useState } from "react";

const DetalhesEvento = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch(`http://localhost:8080/api/eventos/${eventoId}`, {
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
        <div className="modal-content">
          <button className="close-btn" onClick={closeModal}>✖</button>
          <h2 className="modal-title">Erro ao carregar evento</h2>
          <p>O evento não pôde ser carregado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2 className="modal-title">{evento.nome}</h2>

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
          <label>Quantidade de Participantes:</label>
          <input type="text" value={evento.quantidadeParticipantes} disabled />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea value={evento.descricao} disabled />
        </div>

        <div className="form-group">
          <label>Imagem:</label>
          {evento.imagem ? (
            <img
              src={`data:image/png;base64,${evento.imagem}`}
              alt="Imagem do evento"
              className="event-image"
            />
          ) : (
            <p>Sem imagem disponível</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesEvento;

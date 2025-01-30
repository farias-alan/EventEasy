import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditarEvento from "./EditarEvento";

const token = localStorage.getItem("authToken");

const DetalhesCancelarEvento = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);

        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
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
            value={evento.palestras?.length ? evento.palestras.map(p => `${p.tema} - ${p.palestrante}`).join("\n") : "Nenhuma palestra cadastrada"}
            disabled
          />
        </div>

        <button className="cancel-btn" onClick={handleCancelar}>Cancelar Evento</button>
      </div>

      {modalEditarAberto && (
        <EditarEvento
          eventoId={evento.id}  // Passando o ID do evento para o modal EditarEvento
          closeModal={() => setModalEditarAberto(false)}
        />
      )}
    </div>
  );
};

export default DetalhesCancelarEvento;

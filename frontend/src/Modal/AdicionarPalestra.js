import React, { useState } from "react";

const AdicionarPalestra = ({ closeModal, onAdicionar, eventoId }) => {
  const [tema, setTema] = useState("");
  const [palestrante, setPalestrante] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  const handleSubmit = async () => {
    if (!tema || !palestrante || !data || !hora || !local || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaPalestra = {
      tema,
      palestrante,
      data,
      hora,
      local,
      descricao,
    };

    console.log("JSON enviado:", JSON.stringify(novaPalestra));

    setLoading(true);
    try {
      const response = await fetch(
        `https://eventeasy-api.onrender.com/api/palestras/${eventoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(novaPalestra),
        }
      );

      if (!response.ok) throw new Error("Erro ao adicionar palestra.");

      const palestraCriada = await response.json();
      onAdicionar(palestraCriada);
      closeModal();
    } catch (error) {
      console.error("Erro ao adicionar palestra:", error);
      alert("Erro ao adicionar a palestra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>
          ✖
        </button>
        <h2 className="modal-title">Adicionar Palestra</h2>

        <div className="form-group">
          <label>Tema:</label>
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Palestrante:</label>
          <input
            type="text"
            value={palestrante}
            onChange={(e) => setPalestrante(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Local:</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        {/* 🔹 Botão corrigido para manter o padrão da aplicação */}
        <button className="modal-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar Palestra"}
        </button>
      </div>

      {/* 🔹 CSS corrigido para manter o estilo padronizado */}
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
          background: white;
        }

        .modal-btn {
          background: #3533CD;
          color: white;
          padding: 10px;
          width: 100%;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
        }

        .modal-btn:hover {
          background-color: #1B1A67;
        }
        `}
      </style>
    </div>
  );
};

export default AdicionarPalestra;

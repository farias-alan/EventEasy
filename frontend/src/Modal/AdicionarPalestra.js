import React, { useState } from "react";

const AdicionarPalestra = ({ closeModal, onAdicionar }) => {
  const [tema, setTema] = useState("");
  const [palestrante, setPalestrante] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

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
      descricao
    };

    setLoading(true);
    try {
      const response = await fetch("link api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaPalestra)
      });

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
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2 className="modal-title">Adicionar Palestra</h2>

        <div className="form-group">
          <label>Tema:</label>
          <input type="text" value={tema} onChange={(e) => setTema(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Palestrante:</label>
          <input type="text" value={palestrante} onChange={(e) => setPalestrante(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Local:</label>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>

        <button className="add-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </div>
    </div>
  );
};

export default AdicionarPalestra;


/* 🔹 CSS atualizado */
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
}

.modal-content {
  background: #D9D9D9;
  padding: 20px;
  border-radius: 8px;
  width: 280px;
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
  font-size: 20px;
  font-weight: bold;
  color: #1B1A67;
  margin-bottom: 10px;
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
}

.add-btn {
  background: #3533CD;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
}

.add-btn:hover {
  background: #1B1A67;
}
`;

/* Adiciona o CSS dinamicamente */
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

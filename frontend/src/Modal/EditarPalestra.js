import React, { useState } from "react";

const EditarPalestra = ({ palestra, closeModal, onAtualizar }) => {
  const [tema, setTema] = useState(palestra.tema);
  const [palestrante, setPalestrante] = useState(palestra.palestrante);
  const [data, setData] = useState(palestra.data || "");
  const [hora, setHora] = useState(palestra.hora || "");
  const [local, setLocal] = useState(palestra.local || "");
  const [descricao, setDescricao] = useState(palestra.descricao || "");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    if (!tema || !palestrante || !data || !hora || !local || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`link api/${palestra.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema, palestrante, data, hora, local, descricao }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar palestra.");

      const updatedPalestra = await response.json();
      onAtualizar(updatedPalestra);
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar palestra:", error);
      alert("Erro ao salvar a palestra.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta palestra?")) return;

    setLoading(true);
    try {
      const response = await fetch(`link api/${palestra.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir palestra.");

      onAtualizar(null); 
      closeModal();
    } catch (error) {
      console.error("Erro ao excluir palestra:", error);
      alert("Erro ao excluir a palestra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2 className="modal-title">Editar Palestra</h2>

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

        <div className="button-group">
          <button className="save-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <button className="delete-btn" onClick={handleDelete} disabled={loading}>
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarPalestra;

/* CSS */
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
  width: 350px;
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

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.save-btn, .delete-btn {
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  border: none;
  border-radius: 4px;
  width: 48%;
  cursor: pointer;
  text-align: center;
}

.save-btn {
  background: #3533CD;
  color: white;
}

.save-btn:hover {
  background: #1B1A67;
}

.delete-btn {
  background: red;
  color: white;
}

.delete-btn:hover {
  background: darkred;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

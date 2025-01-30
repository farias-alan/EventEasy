import React, { useEffect, useState } from "react";


const DetalhesEvento = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`link api/${eventoId}`);
        if (!response.ok) throw new Error("Erro ao buscar evento");

        const data = await response.json();
        setEvento(data);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
        setEvento({
          id: 99,
          nome: "Evento Teste",
          data: "20/06/2025",
          hora: "15h",
          local: "Centro de Eventos",
          descricao: "Descrição de teste. Este evento simulado é um exemplo.",
          quantidade_participantes: "100",
          palestras: [
            { tema: "Tecnologias Modernas", palestrante: "Carlos Silva" },
            { tema: "Futuro da IA", palestrante: "Ana Souza" },
            { tema: "Cloud Computing", palestrante: "Mariana Costa" },
          ],
        });
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
          <input type="text" value={evento.quantidade_participantes} disabled />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea 
            value={evento.descricao} 
            disabled 
            className="no-resize"
          />
        </div>

        <div className="form-group">
          <label>Palestras:</label>
          <textarea 
            value={
              evento.palestras?.length
                ? evento.palestras.map(p => `${p.tema} - ${p.palestrante}`).join("\n")
                : "Nenhuma palestra cadastrada"
            } 
            disabled 
            className="no-resize large-box"
          />
        </div>
      </div>
    </div>
  );
};

export default DetalhesEvento;

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
  padding: 25px;
  border-radius: 10px;
  width: 500px; 
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.close-btn {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-title {
  font-size: 22px;
  font-weight: bold;
  color: #1B1A67;
  text-align: center;
  width: 100%;
}


.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 12px;
}

.form-group label {
  font-size: 16px;
  font-weight: bold;
  color: #1B1A67;
  margin-bottom: 5px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f0f0f0;
  font-size: 14px;
}

.no-resize {
  resize: none;
  height: 100px;
}

.large-box {
  height: 80px !important;
  width: 100% !important;
}
`;


const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

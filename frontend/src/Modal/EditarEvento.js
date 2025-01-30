import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import AdicionarPalestra from "./AdicionarPalestra";
import EditarPalestra from "./EditarPalestra";

const EditarEvento = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalAdicionarPalestra, setModalAdicionarPalestra] = useState(false);
  const [modalEditarPalestra, setModalEditarPalestra] = useState(null);

  
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`api link/${eventoId}`);
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

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvento({ ...evento, imagem: URL.createObjectURL(file) });
    }
  };

  
  const handleAdicionarPalestra = async (novaPalestra) => {
    try {
      const response = await fetch(`api link/${evento.id}/palestras`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...evento.palestras, novaPalestra]),
      });

      if (!response.ok) throw new Error("Erro ao adicionar palestra.");

      setEvento({ ...evento, palestras: [...evento.palestras, novaPalestra] });
      setModalAdicionarPalestra(false);
    } catch (error) {
      console.error("Erro ao adicionar palestra:", error);
    }
  };

  
  const handleEditarPalestra = async (id, palestraAtualizada) => {
    try {
      const palestrasAtualizadas = evento.palestras.map(p => 
        p.id === id ? palestraAtualizada : p
      );

      const response = await fetch(`api link/${evento.id}/palestras`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(palestrasAtualizadas),
      });

      if (!response.ok) throw new Error("Erro ao editar palestra.");

      setEvento({ ...evento, palestras: palestrasAtualizadas });
      setModalEditarPalestra(null);
    } catch (error) {
      console.error("Erro ao editar palestra:", error);
    }
  };

  
  const handleSalvar = async () => {
    try {
      const response = await fetch(`api link/${evento.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
      });

      if (!response.ok) throw new Error("Erro ao salvar evento.");

      alert("Evento atualizado com sucesso!");
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Erro ao salvar evento.");
    }
  };

  if (loading) return <div className="modal-overlay"><div className="modal-content">Carregando...</div></div>;
  if (!evento) return <div className="modal-overlay"><div className="modal-content">Erro ao carregar evento</div></div>;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>
        
        <div className="event-name-container">
          <input
            type="text"
            value={evento.nome}
            onChange={(e) => setEvento({ ...evento, nome: e.target.value })}
            className="event-name-input"
          />
        </div>

        <div className="form-group">
          <label>Adicionar Imagem:</label>
          <div className="image-upload-box">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          {evento.imagem && <img src={evento.imagem} alt="" className="preview-image" />}
        </div>

        <div className="form-group">
          <label>Data:</label>
          <input type="date" value={evento.data} onChange={(e) => setEvento({ ...evento, data: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <input type="time" value={evento.hora} onChange={(e) => setEvento({ ...evento, hora: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Local:</label>
          <input type="text" value={evento.local} onChange={(e) => setEvento({ ...evento, local: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea value={evento.descricao} onChange={(e) => setEvento({ ...evento, descricao: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Quantidade de Participantes:</label>
          <input type="number" value={evento.quantidade} onChange={(e) => setEvento({ ...evento, quantidade: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Palestras:</label>
          <ul className="palestra-list">
            {evento.palestras.map((palestra) => (
              <li key={palestra.id} className="palestra-item">
                {palestra.tema} - {palestra.palestrante}
                <FaEdit className="edit-icon" onClick={() => setModalEditarPalestra(palestra.id)} />
              </li>
            ))}
          </ul>
          <button className="add-palestra-btn" onClick={() => setModalAdicionarPalestra(true)}>
            <FaPlusCircle className="icon" /> Adicionar Palestra
          </button>
        </div>

        <button className="save-event-btn" onClick={handleSalvar}>Salvar</button>
      </div>

      {modalAdicionarPalestra && (
        <AdicionarPalestra closeModal={() => setModalAdicionarPalestra(false)} onAdicionar={handleAdicionarPalestra} />
      )}

      {modalEditarPalestra && (
        <EditarPalestra
          palestra={evento.palestras.find(p => p.id === modalEditarPalestra)}
          closeModal={() => setModalEditarPalestra(null)}
          onEditar={handleEditarPalestra}
        />
      )}
    </div>
  );
};

export default EditarEvento;




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
  border-radius: 10px;
  width: 320px;
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

.event-name-container {
  width: 100%;
}

.event-name-input {
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: none;
  background: transparent;
  color: #1B1A67;
}

.image-upload-box {
  background: #fff;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  width: 100%;
}

.preview-image {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
}


.palestra-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.palestra-item {
  background: white;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-icon {
  color: #1B1A67;
  cursor: pointer;
  font-size: 16px;
}


.add-palestra-btn {
  background: #1B1A67;
  color: white;
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.add-palestra-btn:hover {
  background: #3533CD;
}


.save-event-btn {
  width: 100%;
  background: #3533CD;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.save-event-btn:hover {
  background-color: #1B1A67;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

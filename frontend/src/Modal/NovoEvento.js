import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AdicionarPalestra from "./AdicionarPalestra";
import EditarPalestra from "./EditarPalestra";


const NovoEvento = ({ closeModal }) => {
  const [nomeEvento, setNomeEvento] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [imagem, setImagem] = useState(null);
  const [palestras, setPalestras] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(null);

  useEffect(() => {
    // Carregar palestras existentes do backend, se necessário
    const fetchPalestras = async () => {
      try {
        const response = await fetch(`link api/palestras`);
        if (response.ok) {
          const data = await response.json();
          setPalestras(data);
        }
      } catch (error) {
        console.error("Erro ao carregar palestras:", error);
      }
    };

    fetchPalestras();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(URL.createObjectURL(file));
    }
  };

  const handleAdicionarPalestra = (novaPalestra) => {
    setPalestras([...palestras, novaPalestra]);
    setModalAdicionarAberto(false);
  };

  const handleEditarPalestra = (id, palestraAtualizada) => {
    setPalestras(palestras.map(p => (p.id === id ? palestraAtualizada : p)));
    setModalEditarAberto(null);
  };

  const handleExcluirPalestra = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta palestra?")) return;

    try {
      const response = await fetch(`link api/palestras/${id}`, { method: "DELETE" });
      if (response.ok) {
        setPalestras(palestras.filter(p => p.id !== id));
      } else {
        alert("Erro ao excluir palestra.");
      }
    } catch (error) {
      console.error("Erro ao excluir palestra:", error);
      alert("Erro ao excluir a palestra.");
    }
  };

  const handleCriarEvento = async () => {
    if (!nomeEvento || !data || !hora || !local || !descricao || !quantidade) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoEvento = {
      nome: nomeEvento,
      data,
      hora,
      local,
      descricao,
      quantidade,
      palestras,
      imagem
    };

    setLoading(true);
    try {
      const response = await fetch("link api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEvento)
      });

      if (!response.ok) throw new Error("Erro ao criar evento.");

      alert("Evento criado com sucesso!");
      closeModal();
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      alert("Erro ao criar o evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2 className="modal-title">Criar Novo Evento</h2>

        <div className="form-group">
          <label>Adicionar Imagem:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagem && <img src={imagem} alt="Pré-visualização" className="preview-image" />}
        </div>

        <div className="form-group">
          <label>Nome do Evento:</label>
          <input type="text" value={nomeEvento} onChange={(e) => setNomeEvento(e.target.value)} />
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

        <div className="form-group">
          <label>Quantidade de Participantes:</label>
          <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Palestras:</label>
          <ul className="palestra-list">
            {palestras.map((palestra) => (
              <li key={palestra.id} className="palestra-item">
                {palestra.tema} - {palestra.palestrante}
                <FaEdit className="edit-icon" onClick={() => setModalEditarAberto(palestra.id)} />
              </li>
            ))}
          </ul>
          <button className="add-palestra-btn" onClick={() => setModalAdicionarAberto(true)}>+ Adicionar Palestra</button>
        </div>

        <button className="create-event-btn" onClick={handleCriarEvento} disabled={loading}>
          {loading ? "Criando Evento..." : "Criar Evento"}
        </button>
      </div>

      {modalAdicionarAberto && <AdicionarPalestra closeModal={() => setModalAdicionarAberto(false)} onAdicionar={handleAdicionarPalestra} />}
      {modalEditarAberto && (
        <EditarPalestra 
          palestra={palestras.find(p => p.id === modalEditarAberto)} 
          closeModal={() => setModalEditarAberto(null)} 
          onEditar={handleEditarPalestra} 
          onExcluir={handleExcluirPalestra} 
        />
      )}
    </div>
  );
};

export default NovoEvento;



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
}

.add-palestra-btn:hover{
background-color: #3533CD
}

.create-event-btn {
  width: 100%;
  background: #3533CD;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  
}

.create-event-btn:hover{
background-color: #1B1A67
}

/* Estilos para a pré-visualização da imagem */
.preview-image {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
}

/* Lista de palestras */
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



`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

import React, { useState, useEffect } from "react";
import AdicionarPalestra from "./AdicionarPalestra"; // Importa o modal para adicionar palestras

const EditarEvento = ({ eventoId, closeModal, onSalvar }) => {
  const [evento, setEvento] = useState({
    nome: "",
    data: "",
    hora: "",
    local: "",
    descricao: "",
    palestras: [],
    imagem: null, // Estado para armazenar a imagem
  });
  const [loading, setLoading] = useState(true);
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);

  const getToken = () => localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const token = getToken();
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
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [eventoId]);

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvento({ ...evento, imagem: reader.result.split(",")[1] }); // Converte a imagem para Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = async () => {
    try {
      const token = getToken();
      const response = await fetch(`https://eventeasy-api.onrender.com/api/eventos/${eventoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(evento),
      });

      if (!response.ok) throw new Error("Erro ao atualizar evento");

      alert("Evento atualizado com sucesso!");
      onSalvar(evento);
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      alert("Erro ao atualizar evento.");
    }
  };

  const handleAdicionarPalestra = (novaPalestra) => {
    setEvento((prevEvento) => ({
      ...prevEvento,
      palestras: [...prevEvento.palestras, novaPalestra],
    }));
    setModalAdicionarAberto(false);
  };

  if (loading) return <div className="modal">Carregando...</div>;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>✖</button>

        <h2 className="modal-title">
          <input
            type="text"
            name="nome"
            value={evento.nome}
            onChange={handleChange}
            className="input-title"
          />
        </h2>

        {/* 🔹 Upload de Imagem */}
        <div className="form-group">
          <label>Adicionar Imagem:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {evento.imagem && <img src={`data:image/png;base64,${evento.imagem}`} alt="Pré-visualização" className="preview-image" />}
        </div>

        <div className="form-group">
          <label>Data:</label>
          <input type="date" name="data" value={evento.data} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <input type="time" name="hora" value={evento.hora} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Local:</label>
          <input type="text" name="local" value={evento.local} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea name="descricao" value={evento.descricao} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Palestras:</label>
          <button className="add-palestra-btn" onClick={() => setModalAdicionarAberto(true)}>+ Adicionar Palestra</button>
          <textarea
            value={evento.palestras.map(p => `${p.tema} - ${p.palestrante}`).join("\n")}
            disabled
          />
        </div>

        <button className="save-btn" onClick={handleSalvar}>Salvar</button>

        {/* 🔹 Modal para adicionar palestras */}
        {modalAdicionarAberto && (
          <AdicionarPalestra
            closeModal={() => setModalAdicionarAberto(false)}
            onAdicionar={handleAdicionarPalestra}
          />
        )}
      </div>

      {/* 🔹 CSS embutido dentro do componente */}
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

        .input-title {
          width: 100%;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          border: none;
          background: none;
          color: #1B1A67;
          outline: none;
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

        .preview-image {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          margin-top: 10px;
          border-radius: 5px;
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

        .save-btn {
          width: 100%;
          background: #3533CD;
          color: white;
          padding: 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
        `}
      </style>
    </div>
  );
};

export default EditarEvento;

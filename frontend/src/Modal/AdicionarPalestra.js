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
    if (!tema ||!palestrante ||!data ||!hora ||!local ||!descricao) {
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

    console.log("JSON enviado:", JSON.stringify(novaPalestra));  // Adicionando o log

    setLoading(true);
    try {
      const response = await fetch(`https://eventeasy-api.onrender.com/api/palestras/${eventoId}`, { // Utiliza o eventoId na URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
          {loading? "Adicionando...": "Adicionar"}
        </button>
      </div>
    </div>
  );
};

export default AdicionarPalestra;
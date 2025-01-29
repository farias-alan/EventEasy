import React, { useState, useEffect } from "react";

const ModalPalestra = ({ palestraId, closeModal }) => {
  const [palestra, setPalestra] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalestra = async () => {
      try {
        const response = await fetch(`link da api/${palestraId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar detalhes da palestra");
        }
        const data = await response.json();
        setPalestra(data);
      } catch (error) {
        console.error("Erro ao buscar palestra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalestra();
  }, [palestraId]);

  if (loading) return <div className="modal">Carregando...</div>;
  if (!palestra) return <div className="modal">Palestra não encontrada</div>;

  return (
    <div className="modal-overlay" onClick={closeModal} style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "#D9D9D9", padding: "20px", borderRadius: "10px", maxWidth: "500px", width: "100%", textAlign: "center" }}>
        <button className="close-btn" onClick={closeModal} style={{ position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", fontSize: "18px", cursor: "pointer" }}>✖</button>
        <h2 className="modal-title" style={{ textAlign: "center", color: "#1B1A67" }}>{palestra.tema}</h2>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Palestrante:</strong></p>
        <div className="modal-input" style={{ color: "black", textAlign: "left", background: "white", padding: "8px", borderRadius: "5px" }}>{palestra.palestrante}</div>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Data:</strong></p>
        <div className="modal-input" style={{ color: "black", textAlign: "left", background: "white", padding: "8px", borderRadius: "5px" }}>{palestra.data}</div>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Hora:</strong></p>
        <div className="modal-input" style={{ color: "black", textAlign: "left", background: "white", padding: "8px", borderRadius: "5px" }}>{palestra.hora}</div>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Local:</strong></p>
        <div className="modal-input" style={{ color: "black", textAlign: "left", background: "white", padding: "8px", borderRadius: "5px" }}>{palestra.local}</div>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Descrição:</strong></p>
        <div className="modal-description" style={{ color: "black", textAlign: "left", background: "white", padding: "8px", borderRadius: "5px" }}>{palestra.descricao}</div>
      </div>
    </div>
  );
};

export default ModalPalestra;

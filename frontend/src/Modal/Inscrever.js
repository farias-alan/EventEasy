import React, { useState, useEffect } from "react";

const ModalInscricao = ({ eventoId, closeModal }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inscrito, setInscrito] = useState(false);

  // Função para obter o token JWT do localStorage
  const getToken = () => {
    return localStorage.getItem("authToken"); // Supondo que o token esteja armazenado no localStorage
  };

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const token = getToken();
        const response = await fetch(`https://eventeasy-api.onrender.com/api/eventos/${eventoId}`, {
          headers: {
            "Authorization": `Bearer ${token}` // Inclui o token no cabeçalho
          }
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar detalhes do evento");
        }
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

  const handleInscricao = async () => {
    try {
      const token = getToken();
      const response = await fetch("https://eventeasy-api.onrender.com/api/inscricoes", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Inclui o token no cabeçalho
        },
        body: JSON.stringify({ eventoId })
      });
      if (response.ok) {
        setInscrito(true);
      }
    } catch (error) {
      console.error("Erro ao se inscrever no evento:", error);
    }
  };

  if (loading) return <div className="modal">Carregando...</div>;
  if (!evento) return <div className="modal">Evento não encontrado</div>;

  return (
    <div className="modal-overlay" onClick={closeModal} style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: "#D9D9D9", padding: "20px", borderRadius: "10px", maxWidth: "500px", width: "100%", textAlign: "center" }}>
        <button className="close-btn" onClick={closeModal} style={{ position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", fontSize: "18px", cursor: "pointer" }}>✖</button>
        <h2 className="modal-title" style={{ textAlign: "center", color: "#1B1A67" }}>{evento.nome}</h2>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Data:</strong> {evento.data}</p>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Hora:</strong> {evento.hora}</p>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Local:</strong> {evento.local}</p>
        <p style={{ color: "#1B1A67", textAlign: "left" }}><strong>Descrição:</strong></p>
        <div className="modal-description" style={{ color: "black", textAlign: "left", background: "white", padding: "8px", borderRadius: "5px" }}>{evento.descricao}</div>
        {!inscrito ? (
          <button className="modal-btn" onClick={handleInscricao} style={{ marginTop: "20px", background: "#1B1A67", color: "white", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "5px", padding: "10px", width: "100%", cursor: "pointer" }}>Inscrever-se</button>
        ) : (
          <p style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>Inscrição realizada com sucesso!</p>
        )}
      </div>
    </div>
  );
};

export default ModalInscricao;
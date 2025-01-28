import React, { useState } from "react";

const RecuperarSenha = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setError(""); 

    alert("Recuperação de senha enviada para o email fornecido!");

    /*Requisição para o backend 
    try {
      const response = await fetch("LINK_DO_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar email de recuperação.");
      }

      const data = await response.json();
      console.log("Email de recuperação enviado com sucesso!", data);

      alert("Email de recuperação enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar email de recuperação:", error);
      alert("Erro ao enviar email de recuperação. Tente novamente mais tarde.");
    }
      */
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: "16px",
          padding: "20px",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            color: "#1B1A67",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Recuperação de Senha
        </h2>
        <p style={{ color: "#1B1A67", marginBottom: "24px" }}>
          Insira seu email para receber o link de recuperação de senha.
        </p>

        <form onSubmit={handleSendEmail}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "16px",
              boxSizing: "border-box",
            }}
          />
          {error && (
            <p style={{ color: "red", fontSize: "14px", marginBottom: "16px" }}>
              {error}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px", 
              marginTop: "16px",
            }}
          >
            <button
              type="submit"
              style={{
                backgroundColor: "#3533CD",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#1B1A67")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#3533CD")
              }
            >
              Enviar
            </button>

            <button
              type="button"
              style={{
                background: "none",
                border: "1px solid #ccc",
                color: "#555",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecuperarSenha;

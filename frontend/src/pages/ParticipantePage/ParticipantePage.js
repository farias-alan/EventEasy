import React, { useEffect, useState } from "react";
import "./ParticipantePage.css";
import logo from "../../templates/logo.png";
import perfil from "../../templates/perfil.png";
import ModalInscricao from "../../Modal/Inscrever";
import Menu from "../../Modal/Menu";

const ParticipantePage = () => {
  const [eventos, setEventos] = useState([]);
  const [meusEventos, setMeusEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const getToken = () => localStorage.getItem("authToken");

  useEffect(() => {
    setLoading(true);
    const fetchEventos = async () => {
      const token = getToken();
      if (!token) {
        console.error("Token JWT não encontrado. Redirecionando para login.");
        return;
      }

      try {
        const response = await fetch("https://eventeasy-api.onrender.com/api/eventos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar eventos");
        }
        const data = await response.json();
        const eventosFuturos = data.filter(evento => {
          const dataEvento = new Date(evento.data.split("/").reverse().join("-"));
          return dataEvento >= new Date();
        });
        setEventos(eventosFuturos);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);

  useEffect(() => {
    const fetchMeusEventos = async () => {
      const token = getToken();
      if (!token) {
        console.error("Token JWT não encontrado. Redirecionando para login.");
        return;
      }

      try {
        const response = await fetch("https://eventeasy-api.onrender.com/api/inscricoes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar eventos inscritos");
        }
        const data = await response.json();
        setMeusEventos(data);
      } catch (error) {
        console.error("Erro ao buscar eventos inscritos:", error);
      }
    };
    fetchMeusEventos();
  }, []);

  const handleCancelarInscricao = async (inscricaoId) => {
    if (window.confirm("Tem certeza que deseja cancelar sua inscrição?")) {
      const token = getToken();
      if (!token) {
        console.error("Token JWT não encontrado. Redirecionando para login.");
        return;
      }
      
      try {
        const response = await fetch(`https://eventeasy-api.onrender.com/api/inscricoes/${inscricaoId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const eventoCancelado = meusEventos.find(evento => evento.inscricaoId === inscricaoId);
          setEventos([...eventos, eventoCancelado]);
          setMeusEventos(meusEventos.filter(evento => evento.inscricaoId !== inscricaoId));
        }
      } catch (error) {
        console.error("Erro ao cancelar inscrição:", error);
      }
    }
  };

  return (
    <div className="participante-container">
      <header className="participante-header">
        <img src={logo} alt="EventEasy Logo" className="logo" />
        <h1 className="header-title">Área do Participante</h1>
        <img 
          src={perfil} 
          alt="Perfil" 
          className="perfil-icon" 
          onClick={() => setMenuAberto(!menuAberto)}
        />
        {menuAberto && <Menu closeMenu={() => setMenuAberto(false)} />}
      </header>

      <main className="participante-content">
        <h2 className="welcome-message">Seja Bem-Vindo !</h2>
        <h3 className="section-title" style={{ marginTop: "20px" }}>Próximos Eventos</h3>

        {loading ? (
          <p className="loading-message">Carregando eventos...</p>
        ) : eventos.length === 0 ? (
          <p className="no-events">Sem eventos futuros</p>
        ) : (
          <div className="event-list">
            {eventos.map((event, index) => (
              <div key={index} className="event-card">
                <img src={`data:image/png;base64,${event.imagem}`} alt="Evento" className="event-image" />
                <h4 className="event-title">{event.nome}</h4>
                <p className="event-type">{event.tipo}</p>
                <p className="event-details">
                  <strong>Data:</strong> {event.data} &nbsp;&nbsp; <strong>Hora:</strong> {event.hora}
                </p>
                <p className="event-details">
                  <strong>Local:</strong> {event.local}
                </p>
                <button className="event-button" onClick={() => setEventoSelecionado(event.id)}>Inscrever-se</button>
              </div>
            ))}
          </div>
        )}

        <h3 className="section-title" style={{ marginTop: "40px" }}>Meus Eventos Inscritos</h3>
        {meusEventos.length === 0 ? (
          <p className="no-events">Nenhum evento inscrito</p>
        ) : (
          <div className="event-list">
            {meusEventos.map((event, index) => {
              const dataEvento = new Date(event.data.split("/").reverse().join("-"));
              const eventoFuturo = dataEvento >= new Date(); 
              return (
                <div key={index} className="event-card" style={{ backgroundColor: "#1B1A67", color: "white" }}>
                  <img src={`data:image/png;base64,${event.imagem}`} alt="Evento" className="event-image" />
                  <h4 className="event-title">{event.nome}</h4>
                  <p className="event-type">{event.tipo}</p>
                  <p className="event-details">
                    <strong>Data:</strong> {event.data} &nbsp;&nbsp; <strong>Hora:</strong> {event.hora}
                  </p>
                  <p className="event-details">
                    <strong>Local:</strong> {event.local}
                  </p>
                  {eventoFuturo && (
                    <button 
                      className="event-button cancelar" 
                      style={{ backgroundColor: "red", color: "white" }} 
                      onClick={() => handleCancelarInscricao(event.inscricaoId)}
                    >
                      Cancelar Inscrição
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {eventoSelecionado && <ModalInscricao eventoId={eventoSelecionado} closeModal={() => setEventoSelecionado(null)} />}
    </div>
  );
};

export default ParticipantePage;

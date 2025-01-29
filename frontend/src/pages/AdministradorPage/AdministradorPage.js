import React, { useEffect, useState } from "react";
import "./AdministradorPage.css";
import logo from "../../templates/logo.png";
import perfil from "../../templates/perfil.png";
import Menu from "../../Modal/Menu";
import NovoEvento from "../../Modal/NovoEvento"; 


const AdminPage = () => {
  const [eventosProduzidos, setEventosProduzidos] = useState([]);
  const [proximosEventos, setProximosEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    setLoading(true);

    const eventosTeste = [
      {
        id: 1,
        nome: "ConnecTech",
        tipo: "Evento de Tecnologia",
        data: "10/01/2024",
        hora: "09h",
        local: "Polo Tecnológico de Maceió",
        imagem: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        nome: "InovaTech",
        tipo: "Inovação e Startups",
        data: "25/05/2025",
        hora: "14h",
        local: "Centro de Convenções",
        imagem: "https://via.placeholder.com/150",
      },
    ];

    const fetchEventos = async () => {
      try {
        const response = await fetch('link api');
        if (response.ok) {
          const data = await response.json();
          const hoje = new Date();

          const eventosPassados = [...eventosTeste, ...data].filter(evento => {
            const dataEvento = new Date(evento.data.split("/").reverse().join("-"));
            return dataEvento < hoje;
          });

          const eventosFuturos = [...eventosTeste, ...data].filter(evento => {
            const dataEvento = new Date(evento.data.split("/").reverse().join("-"));
            return dataEvento >= hoje;
          });

          setEventosProduzidos(eventosPassados);
          setProximosEventos(eventosFuturos);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleNovoEvento = async (novoEvento) => {
    try {
      const response = await fetch('link api', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEvento),
      });

      if (!response.ok) throw new Error("Erro ao criar evento.");

      const eventoCriado = await response.json();

      const dataEvento = new Date(eventoCriado.data.split("/").reverse().join("-"));
      if (dataEvento >= new Date()) {
        setProximosEventos([...proximosEventos, eventoCriado]);
      } else {
        setEventosProduzidos([...eventosProduzidos, eventoCriado]);
      }

      alert("Evento criado com sucesso!");
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      alert("Erro ao criar o evento.");
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <img src={logo} alt="EventEasy Logo" className="logo" />
        <h1 className="header-title">Área do Administrador de Eventos</h1>
        <img 
          src={perfil} 
          alt="Perfil" 
          className="perfil-icon" 
          onClick={() => setMenuAberto(!menuAberto)}
        />
        {menuAberto && <Menu closeMenu={() => setMenuAberto(false)} />}
      </header>

      <main className="admin-content">
        <h2 className="welcome-message">Seja Bem-Vindo !</h2>

        <div className="add-event-container">
          <button className="add-event-button" onClick={() => setModalAberto(true)}>
            Adicionar Novo Evento
          </button>
        </div>

        <h3 className="section-title">Eventos Produzidos</h3>
        {loading ? (
          <p className="loading-message">Carregando eventos...</p>
        ) : eventosProduzidos.length === 0 ? (
          <p className="no-events">Nenhum evento produzido</p>
        ) : (
          <div className="event-list">
            {eventosProduzidos.map((event, index) => (
              <div key={index} className="event-card">
                <img src={event.imagem} alt="Evento" className="event-image" />
                <h4 className="event-title">{event.nome}</h4>
                <p className="event-type">{event.tipo}</p>
                <p className="event-details">
                  <strong>Data:</strong> {event.data} &nbsp;&nbsp; <strong>Hora:</strong> {event.hora}
                </p>
                <p className="event-details">
                  <strong>Local:</strong> {event.local}
                </p>
                <button className="event-button">Ver Detalhes</button>
              </div>
            ))}
          </div>
        )}

        <h3 className="section-title">Próximos Eventos</h3>
        {loading ? (
          <p className="loading-message">Carregando eventos...</p>
        ) : proximosEventos.length === 0 ? (
          <p className="no-events">Sem eventos futuros</p>
        ) : (
          <div className="event-list">
            {proximosEventos.map((event, index) => (
              <div key={index} className="event-card">
                <img src={event.imagem} alt="Evento" className="event-image" />
                <h4 className="event-title">{event.nome}</h4>
                <p className="event-type">{event.tipo}</p>
                <p className="event-details">
                  <strong>Data:</strong> {event.data} &nbsp;&nbsp; <strong>Hora:</strong> {event.hora}
                </p>
                <p className="event-details">
                  <strong>Local:</strong> {event.local}
                </p>
                <button className="event-button">Ver Detalhes</button>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalAberto && <NovoEvento closeModal={() => setModalAberto(false)} onSalvar={handleNovoEvento} />}
    </div>
  );
};

export default AdminPage;

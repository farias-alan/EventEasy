import React, { useEffect, useState } from "react";
import "./AdministradorPage.css";
import logo from "../../templates/logo.png";
import perfil from "../../templates/perfil.png";
import Menu from "../../Modal/Menu";
import NovoEvento from "../../Modal/NovoEvento";
import DetalhesEvento from "../../Modal/DetalhesEvento";
import DetalhesCancelarEvento from "../../Modal/DetalhesCancelarEvento";

const AdminPage = () => {
  const [eventosProduzidos, setEventosProduzidos] = useState([]);
  const [proximosEventos, setProximosEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalDetalhesProduzido, setModalDetalhesProduzido] = useState(null);
  const [modalDetalhesProximo, setModalDetalhesProximo] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const responseAdmin = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!responseAdmin.ok) throw new Error("Erro ao obter ID do administrador");

        const adminData = await responseAdmin.json();
        const adminId = adminData.id;

        const response = await fetch("http://localhost:8080/api/eventos/administrador/" + adminId, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar eventos");

        const data = await response.json();
        const hoje = new Date();

        const eventosPassados = data.filter((evento) => {
          const dataEvento = new Date(evento.data.split("/").reverse().join("-"));
          return dataEvento < hoje;
        });

        const eventosFuturos = data.filter((evento) => {
          const dataEvento = new Date(evento.data.split("/").reverse().join("-"));
          return dataEvento >= hoje;
        });

        setEventosProduzidos(eventosPassados);
        setProximosEventos(eventosFuturos);

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
      const response = await fetch("link api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEvento),
      });

      if (!response.ok) throw new Error("Erro ao criar evento");

      const eventoCriado = await response.json();
      const dataEvento = new Date(eventoCriado.data.split("/").reverse().join("-"));

      if (dataEvento >= new Date()) {
        setProximosEventos((prev) => [...prev, eventoCriado]);
      } else {
        setEventosProduzidos((prev) => [...prev, eventoCriado]);
      }

      alert("Evento criado com sucesso!");
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      alert("Erro ao criar o evento.");
    }
  };

  const handleCancelarEvento = async (id) => {
    if (!window.confirm("Tem certeza que deseja cancelar este evento?")) return;

    try {
      const response = await fetch(`link api/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Erro ao cancelar evento");

      setProximosEventos((prevEventos) => prevEventos.filter((event) => event.id !== id));
      alert("Evento cancelado com sucesso!");
      setModalDetalhesProximo(null);
    } catch (error) {
      console.error("Erro ao cancelar evento:", error);
      alert("Erro ao cancelar o evento.");
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
        <h2 className="welcome-message">Seja Bem-Vindo!</h2>

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
            {eventosProduzidos.map((event) => {
              const imagemPreview = event.imagem ? `data:image/png;base64,${event.imagem}` : null;
              return (
                <div key={event.id} className="event-card">
                  {imagemPreview && <img src={imagemPreview} alt="Evento" className="event-image" />}
                  <h4 className="event-title">{event.nome}</h4>
                  <p className="event-details">
                    <strong>Data:</strong> {event.data} <strong>Hora:</strong> {event.hora}
                  </p>
                  <p className="event-details"><strong>Local:</strong> {event.local}</p>
                  <button className="event-button" onClick={() => setModalDetalhesProduzido(event.id)}>
                    Ver Detalhes
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <h3 className="section-title">Próximos Eventos</h3>
        {loading ? (
          <p className="loading-message">Carregando eventos...</p>
        ) : proximosEventos.length === 0 ? (
          <p className="no-events">Sem eventos futuros</p>
        ) : (
          <div className="event-list">
            {proximosEventos.map((event) => {
              const imagemPreview = event.imagem ? `data:image/png;base64,${event.imagem}` : null;
              return (
                <div key={event.id} className="event-card">
                  {imagemPreview && <img src={imagemPreview} alt="Evento" className="event-image" />}
                  <h4 className="event-title">{event.nome}</h4>
                  <p className="event-details">
                    <strong>Data:</strong> {event.data} <strong>Hora:</strong> {event.hora}
                  </p>
                  <p className="event-details"><strong>Local:</strong> {event.local}</p>
                  <button className="event-button" onClick={() => setModalDetalhesProduzido(event.id)}>
                    Ver Detalhes
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modais */}
      {modalAberto && <NovoEvento closeModal={() => setModalAberto(false)} onSalvar={handleNovoEvento} />}
      {modalDetalhesProduzido && <DetalhesEvento eventoId={modalDetalhesProduzido} closeModal={() => setModalDetalhesProduzido(null)} />}
      {modalDetalhesProximo && <DetalhesCancelarEvento evento={modalDetalhesProximo} closeModal={() => setModalDetalhesProximo(null)} onCancelar={handleCancelarEvento} />}
    </div>
  );
};

export default AdminPage;

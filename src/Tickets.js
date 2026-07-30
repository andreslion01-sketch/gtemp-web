import React, { useState } from 'react';

function Tickets({ onVolver }) {
  // Estado para la búsqueda y orden
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('recientes');

  // Estados para filtros laterales
  const [filtrosEstado, setFiltrosEstado] = useState({
    abierto: false,
    enProceso: false,
    cerrado: false
  });

  const [filtrosDepto, setFiltrosDepto] = useState({
    tecnologia: false,
    finanzas: false,
    operaciones: false,
    recursosHumanos: false,
    general: false
  });

  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  // Lista base de tickets (vacía por defecto como en tus imágenes)
  const [tickets, setTickets] = useState([]);

  // Manejar cambio en checkboxes de estado
  const handleEstadoChange = (e) => {
    const { name, checked } = e.target;
    setFiltrosEstado({ ...filtrosEstado, [name]: checked });
  };

  // Manejar cambio en checkboxes de departamento
  const handleDeptoChange = (e) => {
    const { name, checked } = e.target;
    setFiltrosDepto({ ...filtrosDepto, [name]: checked });
  };

  // Acción del botón Actualizar
  const handleActualizar = () => {
    // Simula la recarga / refresco de la bandeja
    console.log('Actualizando bandeja de tickets...');
  };

  // Acción del botón Limpiar filtros
  const handleLimpiarFiltros = () => {
    setBusqueda('');
    setOrden('recientes');
    setFiltrosEstado({ abierto: false, enProceso: false, cerrado: false });
    setFiltrosDepto({
      tecnologia: false,
      finanzas: false,
      operaciones: false,
      recursosHumanos: false,
      general: false
    });
    setFechaDesde('');
    setFechaHasta('');
  };

  // Filtrado dinámico
  const ticketsFiltrados = tickets.filter((t) => {
    if (busqueda && !t.asunto.toLowerCase().includes(busqueda.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="tickets-container">
      <div className="sub-breadcrumb">Bandeja de tickets</div>

      <div className="dash-section-header">
        <h1>Listado de tickets</h1>
        <p className="dash-subtitle">
          Solicitudes enviadas desde el menú ☰ → Ticket. Gestione avances y cierre.
        </p>

        {/* INDICADORES DE ESTADO (PUNTOS DE COLOR) */}
        <div className="indicators-row">
          <span className="ind-item">
            <span className="dot dot-orange"></span> Abierto
          </span>
          <span className="ind-item">
            <span className="dot dot-blue"></span> En proceso
          </span>
          <span className="ind-item">
            <span className="dot dot-green"></span> Cerrado
          </span>
        </div>
      </div>

      <div className="tickets-layout">
        {/* COLUMNA IZQUIERDA: BUSCADOR, BANDEJA Y MESA PRINCIPAL */}
        <div className="tickets-main-content">
          <div className="tickets-top-bar">
            <input
              type="text"
              placeholder="Escriba y pulse intro para buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-search-ticket"
            />

            <div className="top-right-controls">
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="select-orden-ticket"
              >
                <option value="recientes">Ordenar por fecha (recientes)</option>
                <option value="antiguos">Ordenar por fecha (antiguos)</option>
                <option value="estado">Ordenar por estado</option>
              </select>

              <span className="count-label">{ticketsFiltrados.length} de {tickets.length}</span>

              <button className="btn-actualizar-ticket" onClick={handleActualizar}>
                ↻ Actualizar
              </button>
            </div>
          </div>

          {/* ÁREA DE CONTENIDO / MENSAJE VACÍO */}
          <div className="card-tickets-empty">
            {ticketsFiltrados.length === 0 ? (
              <p className="text-empty-msg">No hay tickets con estos filtros.</p>
            ) : (
              <div className="lista-tickets">
                {/* Si hubiera tickets se mapearían aquí */}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: FILTROS LATERALES */}
        <div className="card-filtros-sidebar">
          <h3>Filtros</h3>

          {/* FILTRO ESTADO */}
          <div className="filtro-group">
            <label className="filtro-title">Estado</label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="abierto"
                checked={filtrosEstado.abierto}
                onChange={handleEstadoChange}
              />
              Abierto
            </label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="enProceso"
                checked={filtrosEstado.enProceso}
                onChange={handleEstadoChange}
              />
              En proceso
            </label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="cerrado"
                checked={filtrosEstado.cerrado}
                onChange={handleEstadoChange}
              />
              Cerrado
            </label>
          </div>

          {/* FILTRO DEPARTAMENTO */}
          <div className="filtro-group">
            <label className="filtro-title">Departamento</label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="tecnologia"
                checked={filtrosDepto.tecnologia}
                onChange={handleDeptoChange}
              />
              Tecnología / sistemas
            </label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="finanzas"
                checked={filtrosDepto.finanzas}
                onChange={handleDeptoChange}
              />
              Finanzas / legalización
            </label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="operaciones"
                checked={filtrosDepto.operaciones}
                onChange={handleDeptoChange}
              />
              Operaciones / campo
            </label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="recursosHumanos"
                checked={filtrosDepto.recursosHumanos}
                onChange={handleDeptoChange}
              />
              Recursos humanos
            </label>
            <label className="chk-label">
              <input
                type="checkbox"
                name="general"
                checked={filtrosDepto.general}
                onChange={handleDeptoChange}
              />
              General
            </label>
          </div>

          {/* FILTRO FECHA */}
          <div className="filtro-group">
            <label className="filtro-title">Fecha</label>

            <div className="form-group-date">
              <label className="sub-label">Desde</label>
              <input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="input-date-ticket"
              />
            </div>

            <div className="form-group-date" style={{ marginTop: '8px' }}>
              <label className="sub-label">Hasta</label>
              <input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="input-date-ticket"
              />
            </div>
          </div>

          {/* BOTÓN LIMPIAR */}
          <button className="btn-limpiar-filtros" onClick={handleLimpiarFiltros}>
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
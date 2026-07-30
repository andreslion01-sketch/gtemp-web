import React, { useState } from 'react';

function Aprobaciones({ onVolver }) {
  const [subTab, setSubTab] = useState('niveles');

  const [busquedaAsignaciones, setBusquedaAsignaciones] = useState('');
  const [busquedaTecnicos, setBusquedaTecnicos] = useState('');

  const [mensaje, setMensaje] = useState('');

  // Formularios visibles abajo
  const [mostrarFormNivel, setMostrarFormNivel] = useState(false);
  const [mostrarFormAsignacion, setMostrarFormAsignacion] = useState(false);
  const [mostrarFormTecnico, setMostrarFormTecnico] = useState(false);

  // Edición inline o modal
  const [nivelEditando, setNivelEditando] = useState(null);

  // 1. DATOS NIVELES POR MONTO
  const [niveles, setNiveles] = useState([
    { id: 1, orden: 1, montoDesde: '0', montoHasta: '—', perfil: 'coordinador', activo: true },
    { id: 2, orden: 2, montoDesde: '0', montoHasta: '—', perfil: 'gerente', activo: true },
    { id: 3, orden: 3, montoDesde: '0', montoHasta: '—', perfil: 'director', activo: true },
    { id: 4, orden: 4, montoDesde: '0', montoHasta: '—', perfil: 'financiero', activo: true }
  ]);

  const [nuevoNivel, setNuevoNivel] = useState({
    orden: 1,
    montoDesde: '0',
    montoHasta: '',
    perfil: 'Coordinador'
  });

  // 2. DATOS ASIGNACIONES
  const [asignaciones, setAsignaciones] = useState([
    { id: 1, usuario: 'Financiero demo', cc: '2222222222', perfil: 'financiero', proyecto: 'PRY-DEMO', centro: '—', activo: true },
    { id: 2, usuario: 'Auxiliar financiero demo', cc: '5555555555', perfil: 'auxiliar', proyecto: 'PRY-DEMO', centro: '—', activo: true },
    { id: 3, usuario: 'Director demo', cc: '4444444444', perfil: 'director', proyecto: 'PRY-DEMO', centro: '—', activo: true },
    { id: 4, usuario: 'Gerente demo', cc: '3333333333', perfil: 'gerente', proyecto: 'PRY-DEMO', centro: '—', activo: true }
  ]);

  const [nuevaAsignacion, setNuevaAsignacion] = useState({
    usuarioBusqueda: '',
    usuarioSelect: '',
    proyectoBusqueda: '',
    proyectoSelect: 'Cualquiera',
    centroBusqueda: '',
    centroSelect: 'Cualquiera'
  });

  // 3. DATOS ASIGNACIÓN TÉCNICOS
  const [tecnicos, setTecnicos] = useState([
    { id: 1, tecnico: 'Técnico demo', cc: '1234567890', proyecto: 'PRY-DEMO', proyectoNombre: 'Proyecto demo instalaciones', centro: 'Todos los centros', activo: true }
  ]);

  const [nuevoTecnicoForm, setNuevoTecnicoForm] = useState({
    tecnicoBusqueda: '',
    tecnicoSelect: '',
    proyectoBusqueda: '',
    proyectoSelect: '',
    centroBusqueda: '',
    centroSelect: 'Todos los centros del proyecto'
  });

  // OPCIONES DE USUARIOS DEMO PARA LOS SELECT
  const listaUsuariosDemo = [
    { label: '—', value: '' },
    { label: 'Coordinador respaldo demo (10987654321) • coordinador', value: 'Coordinador respaldo demo' },
    { label: 'Gerente respaldo demo (20987654321) • gerente', value: 'Gerente respaldo demo' },
    { label: 'Director respaldo demo (30987654321) • director', value: 'Director respaldo demo' },
    { label: 'Financiero respaldo demo (40987654321) • financiero', value: 'Financiero respaldo demo' },
    { label: 'Auxiliar respaldo demo (50987654321) • auxiliar', value: 'Auxiliar respaldo demo' },
    { label: 'Coordinador demo (9876543210) • coordinador', value: 'Coordinador demo' },
    { label: 'Gerente demo (3333333333) • gerente', value: 'Gerente demo' },
    { label: 'Director demo (4444444444) • director', value: 'Director demo' },
    { label: 'Auxiliar financiero demo (5555555555) • auxiliar', value: 'Auxiliar financiero demo' },
    { label: 'Administrador demo (1111111111) • administrador', value: 'Administrador demo' },
    { label: 'Financiero demo (2222222222) • financiero', value: 'Financiero demo' }
  ];

  // ACCIONES NIVELES
  const handleToggleNivel = (id) => {
    setNiveles(niveles.map(n => n.id === id ? { ...n, activo: !n.activo } : n));
  };

  const handleEliminarNivel = (id) => {
    if (window.confirm('¿Eliminar este nivel?')) {
      setNiveles(niveles.filter(n => n.id !== id));
      setMensaje('Nivel eliminado con éxito.');
    }
  };

  const handleCrearNivel = (e) => {
    e.preventDefault();
    const registro = {
      id: Date.now(),
      orden: parseInt(nuevoNivel.orden, 10) || 1,
      montoDesde: nuevoNivel.montoDesde || '0',
      montoHasta: nuevoNivel.montoHasta || '—',
      perfil: nuevoNivel.perfil.toLowerCase(),
      activo: true
    };
    setNiveles([...niveles, registro]);
    setMostrarFormNivel(false);
    setMensaje('Nuevo nivel añadido exitosamente.');
    setNuevoNivel({ orden: 1, montoDesde: '0', montoHasta: '', perfil: 'Coordinador' });
  };

  const handleGuardarNivelEditado = (e) => {
    e.preventDefault();
    setNiveles(niveles.map(n => n.id === nivelEditando.id ? nivelEditando : n));
    setNivelEditando(null);
    setMensaje('Nivel actualizado exitosamente.');
  };

  // ACCIONES ASIGNACIONES
  const handleToggleAsignacion = (id) => {
    setAsignaciones(asignaciones.map(a => a.id === id ? { ...a, activo: !a.activo } : a));
  };

  const handleEliminarAsignacion = (id) => {
    if (window.confirm('¿Eliminar esta asignación?')) {
      setAsignaciones(asignaciones.filter(a => a.id !== id));
      setMensaje('Asignación eliminada.');
    }
  };

  const handleCrearAsignacion = (e) => {
    e.preventDefault();
    const usuarioFinal = nuevaAsignacion.usuarioSelect || nuevaAsignacion.usuarioBusqueda;
    if (!usuarioFinal) {
      alert('Debe seleccionar o escribir un usuario.');
      return;
    }
    const registro = {
      id: Date.now(),
      usuario: usuarioFinal,
      cc: '0000000000',
      perfil: 'coordinador',
      proyecto: nuevaAsignacion.proyectoSelect !== 'Cualquiera' ? nuevaAsignacion.proyectoSelect : (nuevaAsignacion.proyectoBusqueda || 'PRY-DEMO'),
      centro: nuevaAsignacion.centroSelect !== 'Cualquiera' ? nuevaAsignacion.centroSelect : '—',
      activo: true
    };
    setAsignaciones([...asignaciones, registro]);
    setMostrarFormAsignacion(false);
    setMensaje('Nueva asignación creada.');
    setNuevaAsignacion({ usuarioBusqueda: '', usuarioSelect: '', proyectoBusqueda: '', proyectoSelect: 'Cualquiera', centroBusqueda: '', centroSelect: 'Cualquiera' });
  };

  // ACCIONES TÉCNICOS
  const handleToggleTecnico = (id) => {
    setTecnicos(tecnicos.map(t => t.id === id ? { ...t, activo: !t.activo } : t));
  };

  const handleEliminarTecnico = (id) => {
    if (window.confirm('¿Eliminar esta asignación técnica?')) {
      setTecnicos(tecnicos.filter(t => t.id !== id));
      setMensaje('Asignación técnica eliminada.');
    }
  };

  const handleCrearTecnico = (e) => {
    e.preventDefault();
    const tecFinal = nuevoTecnicoForm.tecnicoSelect || nuevoTecnicoForm.tecnicoBusqueda || 'Técnico demo';
    const registro = {
      id: Date.now(),
      tecnico: tecFinal,
      cc: '1234567890',
      proyecto: 'PRY-DEMO',
      proyectoNombre: 'Proyecto demo instalaciones',
      centro: nuevoTecnicoForm.centroSelect,
      activo: true
    };
    setTecnicos([...tecnicos, registro]);
    setMostrarFormTecnico(false);
    setMensaje('Nueva asignación de técnico guardada.');
  };

  // FILTRADOS
  const asignacionesFiltradas = asignaciones.filter(a =>
    a.usuario.toLowerCase().includes(busquedaAsignaciones.toLowerCase()) ||
    a.cc.includes(busquedaAsignaciones) ||
    a.perfil.toLowerCase().includes(busquedaAsignaciones.toLowerCase()) ||
    a.proyecto.toLowerCase().includes(busquedaAsignaciones.toLowerCase())
  );

  const tecnicosFiltrados = tecnicos.filter(t =>
    t.tecnico.toLowerCase().includes(busquedaTecnicos.toLowerCase()) ||
    t.cc.includes(busquedaTecnicos) ||
    t.proyecto.toLowerCase().includes(busquedaTecnicos.toLowerCase())
  );

  return (
    <div className="aprobaciones-container">
      {/* HEADER DESCRIPCIÓN */}
      <div className="dash-section-header">
        <h1>Aprobaciones</h1>
        <p className="dash-subtitle">
          <strong>Cadena de aprobación</strong> (vistos buenos): típicamente <strong>técnico → coordinador → gerente → director → auxiliar financiero → financiero</strong>. Defina <strong>rangos de monto</strong> y el <strong>perfil</strong> que actúa en cada paso (orden 1, 2, ...). Luego asigne <strong>usuarios</strong> (con ese perfil en la base) a <strong>proyectos</strong> y/o <strong>centros de costo</strong>: comodín «Cualquiera» en proyecto o centro; ambos vacíos = toda la organización. Cuando la cadena concluye bien, el gasto pasa a <strong>autorizado</strong> (estado «Gasto autorizado»); si no hay niveles, puede autorizarse al enviar.
        </p>
        <p className="dash-subtitle" style={{ marginTop: '10px' }}>
          <strong>Respaldo de aprobadores (modelo «mismo perfil»):</strong> el backend exige al menos <strong>dos usuarios distintos</strong> activos por cada perfil y alcance (proyecto/centro del gasto) en cada paso de la cadena que corresponda al monto, y también <strong>dos auxiliares</strong> y <strong>dos financieros</strong> con asignación a ese alcance antes de que el técnico pueda enviar el paquete de legalización. No cambia el orden de aprobaciones ni las reglas de rechazo; solo evita depender de una sola persona.
        </p>
      </div>

      {/* NAVEGACIÓN DE SUB-PESTAÑAS */}
      <div className="subtabs-aprobaciones">
        <button
          className={`btn-subtab ${subTab === 'niveles' ? 'btn-subtab-active' : ''}`}
          onClick={() => setSubTab('niveles')}
        >
          Niveles por monto
        </button>
        <button
          className={`btn-subtab ${subTab === 'asignaciones' ? 'btn-subtab-active' : ''}`}
          onClick={() => setSubTab('asignaciones')}
        >
          Asignaciones
        </button>
        <button
          className={`btn-subtab ${subTab === 'tecnicos' ? 'btn-subtab-active' : ''}`}
          onClick={() => setSubTab('tecnicos')}
        >
          Asignación técnicos
        </button>
      </div>

      {mensaje && <div className="success-banner">{mensaje}</div>}

      {/* ---------------- SUB-PESTAÑA 1: NIVELES POR MONTO ---------------- */}
      {subTab === 'niveles' && (
        <div className="tab-content-box">
          <div className="tabla-responsive">
            <table className="tabla-admin border-table">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Monto desde</th>
                  <th>Monto hasta</th>
                  <th>Perfil aprobador</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {niveles.map((n) => (
                  <tr key={n.id}>
                    <td>{n.orden}</td>
                    <td>{n.montoDesde}</td>
                    <td>{n.montoHasta}</td>
                    <td>{n.perfil}</td>
                    <td>{n.activo ? 'Sí' : 'No'}</td>
                    <td>
                      <div className="btn-group-actions">
                        <button className="btn-action-edit" onClick={() => setNivelEditando({ ...n })}>
                          Editar
                        </button>
                        <button
                          className={n.activo ? 'btn-toggle-desactivar' : 'btn-toggle-activar'}
                          onClick={() => handleToggleNivel(n.id)}
                        >
                          {n.activo ? 'Desactivar' : 'Activar'}
                        </button>
                        <button className="btn-action-delete" onClick={() => handleEliminarNivel(n.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!mostrarFormNivel ? (
            <button className="btn-nuevo-tipo" style={{ marginTop: '20px' }} onClick={() => setMostrarFormNivel(true)}>
              + Nuevo nivel
            </button>
          ) : (
            <div className="card-form-inline" style={{ marginTop: '24px' }}>
              <div className="card-form-header">
                <h2>Nuevo nivel</h2>
                <button type="button" className="btn-close-form" onClick={() => setMostrarFormNivel(false)}>✕ Cerrar</button>
              </div>
              <form onSubmit={handleCrearNivel} className="modal-form">
                <div className="form-group">
                  <label>Orden del paso (1 = primero)</label>
                  <input
                    type="number"
                    value={nuevoNivel.orden}
                    onChange={(e) => setNuevoNivel({ ...nuevoNivel, orden: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Monto desde (COP)</label>
                  <input
                    type="text"
                    value={nuevoNivel.montoDesde}
                    onChange={(e) => setNuevoNivel({ ...nuevoNivel, montoDesde: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Monto hasta (COP, vacío = sin tope)</label>
                  <input
                    type="text"
                    placeholder="Sin tope"
                    value={nuevoNivel.montoHasta}
                    onChange={(e) => setNuevoNivel({ ...nuevoNivel, montoHasta: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Perfil que aprueba en este paso</label>
                  <select
                    value={nuevoNivel.perfil}
                    onChange={(e) => setNuevoNivel({ ...nuevoNivel, perfil: e.target.value })}
                  >
                    <option value="Coordinador">Coordinador</option>
                    <option value="Gerente de proyecto">Gerente de proyecto</option>
                    <option value="Director de proyecto">Director de proyecto</option>
                    <option value="Auxiliar financiero">Auxiliar financiero</option>
                    <option value="Financiero">Financiero</option>
                  </select>
                </div>
                <div className="form-buttons-row">
                  <button type="submit" className="btn-submit-green-full">Añadir nivel</button>
                  <button type="button" className="btn-modal-cancel" onClick={() => setMostrarFormNivel(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ---------------- SUB-PESTAÑA 2: ASIGNACIONES ---------------- */}
      {subTab === 'asignaciones' && (
        <div className="tab-content-box">
          <div className="card-filtro-busqueda" style={{ marginBottom: '16px' }}>
            <label>Buscar en la tabla</label>
            <input
              type="text"
              placeholder="Usuario, cédula, perfil, proyecto, centro..."
              value={busquedaAsignaciones}
              onChange={(e) => setBusquedaAsignaciones(e.target.value)}
            />
            <span className="filas-count">{asignacionesFiltradas.length} fila(s)</span>
          </div>

          <div className="tabla-responsive">
            <table className="tabla-admin border-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Perfil</th>
                  <th>Proyecto</th>
                  <th>Centro</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {asignacionesFiltradas.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div><strong>{a.usuario}</strong></div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>CC {a.cc}</div>
                    </td>
                    <td>{a.perfil}</td>
                    <td>{a.proyecto}</td>
                    <td>{a.centro}</td>
                    <td>{a.activo ? 'Sí' : 'No'}</td>
                    <td>
                      <div className="btn-group-actions">
                        <button className="btn-action-edit">Editar</button>
                        <button
                          className={a.activo ? 'btn-toggle-desactivar' : 'btn-toggle-activar'}
                          onClick={() => handleToggleAsignacion(a.id)}
                        >
                          {a.activo ? 'Desactivar' : 'Activar'}
                        </button>
                        <button className="btn-action-delete" onClick={() => handleEliminarAsignacion(a.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!mostrarFormAsignacion ? (
            <button className="btn-nuevo-tipo" style={{ marginTop: '20px' }} onClick={() => setMostrarFormAsignacion(true)}>
              + Nueva asignación
            </button>
          ) : (
            <div className="card-form-inline" style={{ marginTop: '24px' }}>
              <div className="card-form-header">
                <h2>Nueva asignación</h2>
                <button type="button" className="btn-close-form" onClick={() => setMostrarFormAsignacion(false)}>✕ Cerrar</button>
              </div>
              <p className="dash-subtitle" style={{ marginBottom: '16px' }}>
                Asigne coordinador, gerente, director, auxiliar financiero o financiero a proyecto/centro. El <strong>técnico de campo no es aprobador</strong> y no puede recibir esta asignación. Para aprobar un paso, el perfil del usuario debe coincidir con el paso y la asignación debe cubrir el gasto.
              </p>
              <form onSubmit={handleCrearAsignacion} className="modal-form">
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    type="text"
                    placeholder="Nombre, cédula o perfil"
                    value={nuevaAsignacion.usuarioBusqueda}
                    onChange={(e) => setNuevaAsignacion({ ...nuevaAsignacion, usuarioBusqueda: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Usuario</label>
                  <select
                    value={nuevaAsignacion.usuarioSelect}
                    onChange={(e) => setNuevaAsignacion({ ...nuevaAsignacion, usuarioSelect: e.target.value })}
                  >
                    {listaUsuariosDemo.map((u, idx) => (
                      <option key={idx} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Proyecto (opcional)</label>
                  <input
                    type="text"
                    placeholder="Código o nombre de proyecto"
                    value={nuevaAsignacion.proyectoBusqueda}
                    onChange={(e) => setNuevaAsignacion({ ...nuevaAsignacion, proyectoBusqueda: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Proyecto</label>
                  <select
                    value={nuevaAsignacion.proyectoSelect}
                    onChange={(e) => setNuevaAsignacion({ ...nuevaAsignacion, proyectoSelect: e.target.value })}
                  >
                    <option value="Cualquiera">Cualquiera</option>
                    <option value="PRY-DEMO">PRY-DEMO • Proyecto demo instalaciones</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Centro de costo (opcional)</label>
                  <input
                    type="text"
                    placeholder="Código o nombre de centro"
                    value={nuevaAsignacion.centroBusqueda}
                    onChange={(e) => setNuevaAsignacion({ ...nuevaAsignacion, centroBusqueda: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Centro de costo</label>
                  <select
                    value={nuevaAsignacion.centroSelect}
                    onChange={(e) => setNuevaAsignacion({ ...nuevaAsignacion, centroSelect: e.target.value })}
                  >
                    <option value="Cualquiera">Cualquiera</option>
                    <option value="GD-001">GD-001 • Centro general demo</option>
                    <option value="OP-001">OP-001 • Operativo campo demo</option>
                  </select>
                </div>
                <div className="form-buttons-row">
                  <button type="submit" className="btn-submit-green-full">Guardar asignación</button>
                  <button type="button" className="btn-modal-cancel" onClick={() => setMostrarFormAsignacion(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ---------------- SUB-PESTAÑA 3: ASIGNACIÓN TÉCNICOS ---------------- */}
      {subTab === 'tecnicos' && (
        <div className="tab-content-box">
          <p className="dash-subtitle" style={{ marginBottom: '16px' }}>
            Defina en qué <strong>proyecto</strong> y <strong>centro de costo</strong> puede registrar gastos cada <strong>técnico</strong>. Centro vacío = todos los centros enlazados al proyecto. Sin asignación activa el técnico no verá imputaciones al crear gastos.
          </p>

          <div className="card-filtro-busqueda" style={{ marginBottom: '16px' }}>
            <label>Buscar en la tabla</label>
            <input
              type="text"
              placeholder="Nombre, cédula, proyecto, centro..."
              value={busquedaTecnicos}
              onChange={(e) => setBusquedaTecnicos(e.target.value)}
            />
            <span className="filas-count">{tecnicosFiltrados.length} fila(s)</span>
          </div>

          <div className="tabla-responsive">
            <table className="tabla-admin border-table">
              <thead>
                <tr>
                  <th>Técnico</th>
                  <th>Proyecto</th>
                  <th>Centro</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tecnicosFiltrados.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div><strong>{t.tecnico}</strong></div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>CC {t.cc}</div>
                    </td>
                    <td>
                      <div><strong>{t.proyecto}</strong></div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{t.proyectoNombre}</div>
                    </td>
                    <td>{t.centro}</td>
                    <td>{t.activo ? 'Sí' : 'No'}</td>
                    <td>
                      <div className="btn-group-actions">
                        <button className="btn-action-edit">Editar</button>
                        <button
                          className={t.activo ? 'btn-toggle-desactivar' : 'btn-toggle-activar'}
                          onClick={() => handleToggleTecnico(t.id)}
                        >
                          {t.activo ? 'Desactivar' : 'Activar'}
                        </button>
                        <button className="btn-action-delete" onClick={() => handleEliminarTecnico(t.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!mostrarFormTecnico ? (
            <button className="btn-nuevo-tipo" style={{ marginTop: '20px' }} onClick={() => setMostrarFormTecnico(true)}>
              + Nueva asignación técnico
            </button>
          ) : (
            <div className="card-form-inline" style={{ marginTop: '24px' }}>
              <div className="card-form-header">
                <h2>Nueva asignación técnico</h2>
                <button type="button" className="btn-close-form" onClick={() => setMostrarFormTecnico(false)}>✕ Cerrar</button>
              </div>
              <form onSubmit={handleCrearTecnico} className="modal-form">
                <div className="form-group">
                  <label>Técnico</label>
                  <input
                    type="text"
                    placeholder="Nombre o cédula"
                    value={nuevoTecnicoForm.tecnicoBusqueda}
                    onChange={(e) => setNuevoTecnicoForm({ ...nuevoTecnicoForm, tecnicoBusqueda: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Técnico</label>
                  <select
                    value={nuevoTecnicoForm.tecnicoSelect}
                    onChange={(e) => setNuevoTecnicoForm({ ...nuevoTecnicoForm, tecnicoSelect: e.target.value })}
                  >
                    <option value="">—</option>
                    <option value="Técnico demo">Técnico demo (1234567890) • tecnico</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Proyecto</label>
                  <input
                    type="text"
                    placeholder="Código o nombre de proyecto"
                    value={nuevoTecnicoForm.proyectoBusqueda}
                    onChange={(e) => setNuevoTecnicoForm({ ...nuevoTecnicoForm, proyectoBusqueda: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Proyecto</label>
                  <select
                    value={nuevoTecnicoForm.proyectoSelect}
                    onChange={(e) => setNuevoTecnicoForm({ ...nuevoTecnicoForm, proyectoSelect: e.target.value })}
                  >
                    <option value="">—</option>
                    <option value="PRY-DEMO">PRY-DEMO • Proyecto demo instalaciones</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Centro de costo (opcional)</label>
                  <input
                    type="text"
                    placeholder="Código o nombre de centro"
                    value={nuevoTecnicoForm.centroBusqueda}
                    onChange={(e) => setNuevoTecnicoForm({ ...nuevoTecnicoForm, centroBusqueda: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Centro de costo</label>
                  <select
                    value={nuevoTecnicoForm.centroSelect}
                    onChange={(e) => setNuevoTecnicoForm({ ...nuevoTecnicoForm, centroSelect: e.target.value })}
                  >
                    <option value="Todos los centros del proyecto">Todos los centros del proyecto</option>
                    <option value="GD-001">GD-001 • Centro general demo</option>
                    <option value="OP-001">OP-001 • Operativo campo demo</option>
                  </select>
                </div>
                <div className="form-buttons-row">
                  <button type="submit" className="btn-submit-green-full">Guardar asignación</button>
                  <button type="button" className="btn-modal-cancel" onClick={() => setMostrarFormTecnico(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* MODAL EDITAR NIVEL */}
      {nivelEditando && (
        <div className="modal-overlay">
          <div className="modal-panel-right">
            <h2>Editar nivel • orden {nivelEditando.orden}</h2>
            <p className="dash-subtitle" style={{ marginBottom: '16px' }}>
              Cambie orden, rangos en COP, perfil aprobador o estado activo. Los perfiles <strong>técnico</strong> y <strong>auxiliar</strong> no aplican en la cadena del gasto (el backend los rechaza).
            </p>
            <form onSubmit={handleGuardarNivelEditado} className="modal-form">
              <div className="form-group">
                <label>Orden del paso (1 = primero)</label>
                <input
                  type="number"
                  value={nivelEditando.orden}
                  onChange={(e) => setNivelEditando({ ...nivelEditando, orden: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Monto desde (COP)</label>
                <input
                  type="text"
                  value={nivelEditando.montoDesde}
                  onChange={(e) => setNivelEditando({ ...nivelEditando, montoDesde: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Monto hasta (COP, vacío = sin tope)</label>
                <input
                  type="text"
                  placeholder="Sin tope"
                  value={nivelEditando.montoHasta === '—' ? '' : nivelEditando.montoHasta}
                  onChange={(e) => setNivelEditando({ ...nivelEditando, montoHasta: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Perfil que aprueba en este paso</label>
                <select
                  value={nivelEditando.perfil}
                  onChange={(e) => setNivelEditando({ ...nivelEditando, perfil: e.target.value })}
                >
                  <option value="coordinador">Coordinador</option>
                  <option value="gerente">Gerente de proyecto</option>
                  <option value="director">Director de proyecto</option>
                  <option value="financiero">Financiero</option>
                </select>
              </div>
              <div className="form-group-checkbox">
                <input
                  type="checkbox"
                  id="chkNivelActivo"
                  checked={nivelEditando.activo}
                  onChange={(e) => setNivelEditando({ ...nivelEditando, activo: e.target.checked })}
                />
                <label htmlFor="chkNivelActivo">Activo</label>
              </div>
              <div className="form-buttons-row">
                <button type="submit" className="btn-submit-green-full">Guardar cambios</button>
                <button type="button" className="btn-modal-cancel" onClick={() => setNivelEditando(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Aprobaciones;
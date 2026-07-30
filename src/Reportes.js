import React, { useState } from 'react';

function Reportes({ onVolver }) {
  const [umbralRiesgo, setUmbralRiesgo] = useState('10.000.000');
  const [mostrarToast, setMostrarToast] = useState(false);

  const [tramosSLA, setTramosSLA] = useState([
    { id: 1, nombre: 'Coordinador — paso en cadena', cod: 'coordinador', horas: 72, min: 0, alHoras: 24, alMin: 0, meta: 95 },
    { id: 2, nombre: 'Director — paso en cadena', cod: 'director', horas: 48, min: 0, alHoras: 24, alMin: 0, meta: 96 },
    { id: 3, nombre: 'Financiero — paso en cadena', cod: 'financiero', horas: 48, min: 0, alHoras: 24, alMin: 0, meta: 96 },
    { id: 4, nombre: 'Gerente — paso en cadena', cod: 'gerente', horas: 72, min: 0, alHoras: 24, alMin: 0, meta: 95 },
    { id: 5, nombre: 'Legalización — revisión auxiliar (tras envío técnico)', cod: 'legalizacion_auxiliar', horas: 120, min: 0, alHoras: 24, alMin: 0, meta: 93 },
    { id: 6, nombre: 'Legalización — aprobación financiero', cod: 'legalizacion_financiero', horas: 72, min: 0, alHoras: 24, alMin: 0, meta: 94 },
    { id: 7, nombre: 'Legalización técnico (desde fecha del gasto hasta envío)', cod: 'legalizacion_tecnico', horas: 720, min: 0, alHoras: 168, alMin: 0, meta: 92 },
    { id: 8, nombre: 'Técnico — desde autorización del gasto hasta envío de solicitud de legalización', cod: 'tecnico_solicitud_legalizacion', horas: 240, min: 0, alHoras: 48, alMin: 0, meta: 90 }
  ]);

  const [fechaDesde, setFechaDesde] = useState('2026-06-30');
  const [fechaHasta, setFechaHasta] = useState('2026-07-30');
  const [proyectoFiltro, setProyectoFiltro] = useState('Todos');
  const [tecnicoFiltro, setTecnicoFiltro] = useState('Todos');
  const [tramoFiltro, setTramoFiltro] = useState('Todos los tramos');
  const [usuarioFiltro, setUsuarioFiltro] = useState('Todos');
  const [desgloseUsuario, setDesgloseUsuario] = useState(true);

  const [mostrarEvaluacion, setMostrarEvaluacion] = useState(false);

  const handleInputChange = (id, campo, valor) => {
    setTramosSLA(tramosSLA.map(t => t.id === id ? { ...t, [campo]: valor } : t));
  };

  const handleGuardarParametros = () => {
    setMostrarToast(true);
    setTimeout(() => {
      setMostrarToast(false);
    }, 4000);
  };

  const handleToggleEvaluar = () => {
    setMostrarEvaluacion(!mostrarEvaluacion);
  };

  return (
    <div className="legalizacion-sla-container">
      {/* ALERTA GUARDADO SUPERIOR */}
      {mostrarToast && (
        <div className="toast-top-banner">
          <div className="toast-content">
            <span className="toast-icon">✓</span>
            <span>Parámetros guardados.</span>
          </div>
          <button className="toast-close-btn" onClick={() => setMostrarToast(false)}>✕</button>
        </div>
      )}

      {/* HEADER DE SECCIÓN */}
      <div className="dash-section-header">
        <h1>Parámetros de legalización, riesgo y SLA</h1>
        <p className="dash-subtitle">
          Los <strong>SLA por perfil</strong> cubren la cadena de aprobación, el tramo del <strong>técnico</strong> entre la última autorización y el envío de la solicitud de legalización, el plazo desde la <strong>fecha del gasto</strong> hasta ese envío (riesgo / consistencia), y los tramos <strong>auxiliar</strong> y financiero tras el envío. Las alertas se calculan al consultar listados y detalle. El <strong>KPI</strong> puede evaluarse por rango de fechas, con filtro por tramo y por <strong>usuario</strong> (aprobador o técnico dueño del gasto según corresponda), y desglose por usuario. El <strong>umbral de riesgo</strong> es global. Los topes técnicos siguen en <strong>Usuarios</strong>.
        </p>
      </div>

      {/* UMBRAL DE RIESGO */}
      <div className="card-sla-box" style={{ maxWidth: '380px', marginBottom: '24px' }}>
        <h3>Umbral de riesgo (global)</h3>
        <div className="form-group" style={{ marginTop: '12px' }}>
          <label style={{ fontSize: '0.8rem', color: '#6b7280' }}>Monto (COP) a partir del cual se muestra alerta en listados</label>
          <input
            type="text"
            value={umbralRiesgo}
            onChange={(e) => setUmbralRiesgo(e.target.value)}
            className="input-custom-sla"
          />
        </div>
      </div>

      {/* SLA Y META KPI POR PERFIL */}
      <div className="card-sla-box">
        <h3>SLA y meta KPI por perfil</h3>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', marginBottom: '16px' }}>
          Plazos en <strong>horas y minutos</strong>. En cadena: desde <code>creado_at</code> del paso. En «técnico solicitud»: desde <code>cadena_aprobada_at</code> hasta <code>legalizado_at</code>. En «legalización técnico»: desde la fecha del gasto hasta el envío.
        </p>

        <div className="tabla-responsive">
          <table className="tabla-sla-exact">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Perfil / tramo</th>
                <th>SLA horas</th>
                <th>SLA minutos</th>
                <th>Alerta horas antes</th>
                <th>Alerta minutos antes</th>
                <th>Meta KPI %</th>
              </tr>
            </thead>
            <tbody>
              {tramosSLA.map((t) => (
                <tr key={t.id}>
                  <td style={{ textAlign: 'left' }}>
                    <div><strong>{t.nombre}</strong></div>
                    <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{t.cod}</div>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={t.horas}
                      onChange={(e) => handleInputChange(t.id, 'horas', e.target.value)}
                      className="input-sla-cell"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={t.min}
                      onChange={(e) => handleInputChange(t.id, 'min', e.target.value)}
                      className="input-sla-cell"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={t.alHoras}
                      onChange={(e) => handleInputChange(t.id, 'alHoras', e.target.value)}
                      className="input-sla-cell"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={t.alMin}
                      onChange={(e) => handleInputChange(t.id, 'alMin', e.target.value)}
                      className="input-sla-cell"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={t.meta}
                      onChange={(e) => handleInputChange(t.id, 'meta', e.target.value)}
                      className="input-sla-cell"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="btn-guardar-parametros-full" onClick={handleGuardarParametros}>
          Guardar parámetros
        </button>
      </div>

      {/* EVALUACIÓN KPI EN RANGO DE FECHAS */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
          Evaluación KPI en rango de fechas
        </h2>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', marginBottom: '16px' }}>
          Pasos de cadena: decisión en el rango. Legalización técnico: <code>legalizado_at</code> en el rango. Filtre por tramo, usuario, proyecto o técnico dueño; active el desglose para ver cumplimiento por persona.
        </p>

        <div className="panel-evaluacion-filtros">
          <div className="grupo-fecha">
            <label>Desde</label>
            <input
              type="text"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="input-date-exact"
            />
            <button className="btn-calendario-sub">Calendario</button>
          </div>

          <div className="grupo-fecha">
            <label>Hasta</label>
            <input
              type="text"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="input-date-exact"
            />
            <button className="btn-calendario-sub">Calendario</button>
          </div>

          <div className="grupo-select">
            <label>Proyecto (opcional)</label>
            <select value={proyectoFiltro} onChange={(e) => setProyectoFiltro(e.target.value)}>
              <option value="Todos">Todos</option>
              <option value="PRY-DEMO">PRY-DEMO</option>
            </select>
          </div>

          <div className="grupo-select">
            <label>Técnico dueño (opcional)</label>
            <select value={tecnicoFiltro} onChange={(e) => setTecnicoFiltro(e.target.value)}>
              <option value="Todos">Todos</option>
            </select>
          </div>

          <div className="grupo-select">
            <label>Tramo (perfil SLA)</label>
            <select value={tramoFiltro} onChange={(e) => setTramoFiltro(e.target.value)}>
              <option value="Todos los tramos">Todos los tramos</option>
            </select>
          </div>

          <div className="grupo-select">
            <label>Usuario (opcional)</label>
            <select value={usuarioFiltro} onChange={(e) => setUsuarioFiltro(e.target.value)}>
              <option value="Todos">Todos</option>
            </select>
          </div>

          <div className="grupo-chk">
            <input
              type="checkbox"
              id="chkDesgloseKpi"
              checked={desgloseUsuario}
              onChange={(e) => setDesgloseUsuario(e.target.checked)}
            />
            <label htmlFor="chkDesgloseKpi">Desglose por usuario</label>
          </div>

          <button className="btn-evaluar-green" onClick={handleToggleEvaluar}>
            Evaluar
          </button>
        </div>

        {mostrarEvaluacion && (
          <div className="resultados-desplegados-container" style={{ marginTop: '20px' }}>
            <div className="kpi-panel-cards">
              <div className="kpi-card-exact">
                <span className="kpi-lbl">PERIODO</span>
                <span className="kpi-val-bold">2026-06-30 → 2026-07-30</span>
              </div>
              <div className="kpi-card-exact">
                <span className="kpi-lbl">TRAMOS</span>
                <span className="kpi-val-big">4</span>
              </div>
              <div className="kpi-card-exact">
                <span className="kpi-lbl">CASOS EVALUADOS</span>
                <span className="kpi-val-big">0</span>
              </div>
              <div className="kpi-card-exact">
                <span className="kpi-lbl">A TIEMPO</span>
                <span className="kpi-val-big">0</span>
              </div>
              <div className="kpi-card-exact kpi-card-green-light">
                <span className="kpi-lbl">TRAMOS QUE CUMPLEN META</span>
                <span className="kpi-val-big">0 / 4</span>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                Resultado por perfil / tramo
              </h3>
              <div className="tabla-responsive">
                <table className="tabla-admin border-table">
                  <thead>
                    <tr>
                      <th>Perfil / tramo</th>
                      <th>Total</th>
                      <th>A tiempo</th>
                      <th>Fuera plazo</th>
                      <th>% cumplimiento</th>
                      <th>Meta</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div><strong>Legalización — revisión auxiliar (tras envío técnico)</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>legalizacion_auxiliar</div>
                      </td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td>—</td>
                      <td><strong>93%</strong></td>
                      <td><span className="badge-sin-dato">Sin dato</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div><strong>Legalización — aprobación financiero</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>legalizacion_financiero</div>
                      </td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td>—</td>
                      <td><strong>94%</strong></td>
                      <td><span className="badge-sin-dato">Sin dato</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div><strong>Legalización técnico (desde fecha del gasto hasta envío)</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>legalizacion_tecnico</div>
                      </td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td>—</td>
                      <td><strong>92%</strong></td>
                      <td><span className="badge-sin-dato">Sin dato</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div><strong>Técnico — desde autorización del gasto hasta envío de solicitud de legalización</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>tecnico_solicitud_legalizacion</div>
                      </td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td><strong>0</strong></td>
                      <td>—</td>
                      <td><strong>90%</strong></td>
                      <td><span className="badge-sin-dato">Sin dato</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '12px' }}>
                Desglose activo: no hay filas por usuario en el rango con los filtros actuales.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reportes;
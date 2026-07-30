import React, { useState } from 'react';

function DashboardAdmin({ onNavegar }) {
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState('1234567890');

  return (
    <div className="dash-admin-container">
      {/* HEADER TABLERO E INDICADORES */}
      <div className="dash-section-header">
        <h1>Tablero e indicadores</h1>
        <p className="dash-subtitle">
          <strong>Gastos técnicos</strong> — resumen operativo, alertas y accesos a la configuración del sistema.
        </p>
      </div>

      {/* ALERTAS Y SEGUIMIENTO */}
      <section className="dash-block">
        <h3 className="block-title">Alertas y seguimiento</h3>
        <div className="alert-card-success">
          <strong>Sin alertas críticas</strong>
          <p>No hay pendientes de aprobación ni situaciones destacadas según los indicadores actuales.</p>
        </div>
      </section>

      {/* GASTOS POR ESTADO */}
      <section className="dash-block">
        <h3 className="block-title">Gastos por estado</h3>
        <p className="block-desc">
          Cantidad y monto total por cada estado en base de datos. Desde una fila puede abrir el listado filtrado.
        </p>

        <div className="tabla-responsive">
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Monto total (COP)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" className="text-center-muted">Sin registros de gastos.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="indicator-note">
          Indicadores de riesgo sobre el universo de gastos: <strong>0</strong> con monto sobre umbral; <strong>0</strong> con legalización próxima a vencer (según parámetros en <span className="link-text" onClick={() => onNavegar('reportes')}>Legalización / riesgo</span>).
        </p>
      </section>

      {/* MAESTROS Y VOLUMETRÍA */}
      <section className="dash-block">
        <h3 className="block-title">Maestros y volumetría</h3>
        <div className="grid-maestros">
          <div className="card-volumetria">
            <h4>Usuarios</h4>
            <p className="metric-text"><strong>12</strong> activos de 12 totales</p>
            <button className="btn-outline-green" onClick={() => onNavegar('usuarios')}>Gestionar</button>
          </div>

          <div className="card-volumetria">
            <h4>Centros de costo</h4>
            <p className="metric-text"><strong>2</strong> activos de 2 totales</p>
            <button className="btn-outline-green">Gestionar</button>
          </div>

          <div className="card-volumetria">
            <h4>Proyectos</h4>
            <p className="metric-text"><strong>1</strong> activos de 1 totales</p>
            <button className="btn-outline-green">Gestionar</button>
          </div>

          <div className="card-volumetria">
            <h4>Tipos de gasto</h4>
            <p className="metric-text"><strong>3</strong> activos de 3 totales</p>
            <button className="btn-outline-green">Gestionar</button>
          </div>

          <div className="card-volumetria">
            <h4>Gastos (todos)</h4>
            <p className="metric-text"><strong>0</strong> registros en el sistema</p>
            <p className="sub-metric">Montos: borrador $ 0 • pendiente $ 0 • autorizado gasto $ 0 • rechazado $ 0</p>
            <button className="btn-outline-green" onClick={() => onNavegar('registro-gasto')}>Supervisar gastos</button>
          </div>
        </div>
      </section>

      {/* CONFIGURACIÓN */}
      <section className="dash-block">
        <h3 className="block-title">Configuración</h3>
        <p className="block-desc">Accesos directos a las pantallas donde se parametriza el comportamiento del flujo de gastos.</p>
        
        <div className="grid-config">
          <div className="card-config">
            <h4>Usuarios</h4>
            <p>Perfiles, activación y datos por usuario (COP de referencia).</p>
            <button className="btn-solid-green" onClick={() => onNavegar('usuarios')}>Abrir</button>
          </div>

          <div className="card-config">
            <h4>Aprobaciones</h4>
            <p>Niveles por monto y asignaciones a proyecto/centro.</p>
            <button className="btn-solid-green" onClick={() => onNavegar('aprobaciones')}>Abrir</button>
          </div>

          <div className="card-config">
            <h4>Legalización y riesgo</h4>
            <p>Plazos, umbral de alerta y días de vencimiento.</p>
            <button className="btn-solid-green" onClick={() => onNavegar('reportes')}>Abrir</button>
          </div>

          <div className="card-config">
            <h4>Ajustes</h4>
            <p>Nombre y NIT de la organización.</p>
            <button className="btn-solid-green">Abrir</button>
          </div>

          <div className="card-config">
            <h4>Constancia PDF (legalizado)</h4>
            <p>Orden de bloques, adjuntos, saltos de página y vista previa con datos de ejemplo.</p>
            <button className="btn-solid-green" onClick={() => onNavegar('reportes')}>Abrir</button>
          </div>

          <div className="card-config">
            <h4>Tipos de gasto</h4>
            <p>Catálogo para clasificación en registros.</p>
            <button className="btn-solid-green">Abrir</button>
          </div>

          <div className="card-config">
            <h4>Tipos de consignación</h4>
            <p>Categorías que el financiero elige al registrar dinero al técnico.</p>
            <button className="btn-solid-green">Abrir</button>
          </div>

          <div className="card-config">
            <h4>Centros de costo</h4>
            <p>Maestro de centros y estado activo.</p>
            <button className="btn-solid-green">Abrir</button>
          </div>

          <div className="card-config">
            <h4>Proyectos</h4>
            <p>Proyectos e imputación a centros.</p>
            <button className="btn-solid-green">Abrir</button>
          </div>
        </div>
      </section>

      {/* TABLA MATEMÁTICA Y AUDITORÍA */}
      <section className="dash-block">
        <h3 className="block-title">Tabla matemática (estados y dinero del técnico)</h3>
        <p className="block-desc">
          Referencia de cómo se relacionan las tarjetas del tablero del técnico con la base de datos. Solo está disponible aquí; elija un técnico de campo activo.
        </p>

        <div className="select-tecnico-box">
          <label htmlFor="selectTecnico">Técnico</label>
          <select 
            id="selectTecnico" 
            value={tecnicoSeleccionado} 
            onChange={(e) => setTecnicoSeleccionado(e.target.value)}
          >
            <option value="1234567890">Técnico demo • CC 1234567890</option>
            <option value="9876543210">Coordinador demo • CC 9876543210</option>
          </select>
        </div>

        {/* 1. GASTOS POR ESTADO */}
        <div className="math-section">
          <h4>1. Gastos por estado (tabla «por estado» en BD)</h4>
          <div className="tabla-responsive">
            <table className="tabla-admin border-table">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Significado del monto</th>
                  <th>En el tablero</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Borrador (sin enviar)</td>
                  <td>Σ monto donde estado = borrador</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Pendiente en cadena (tras enviar)</td>
                  <td>Σ monto donde estado = pendiente_aprobacion</td>
                  <td>$ 0 (= tarjeta «Cadena de aprobación (solo enviados)»)</td>
                </tr>
                <tr>
                  <td>Gasto autorizado (BD)</td>
                  <td>Σ monto donde estado = aprobado (todos los aprobados)</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Rechazado_A</td>
                  <td>Σ monto donde estado = rechazado_a</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Rechazado_L</td>
                  <td>Σ monto donde estado = rechazado_l</td>
                  <td>$ 0</td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>Acumulado total</strong></td>
                  <td>Cadena + Autorizado + Rechazado_A + Rechazado_L = pendiente + aprobado + rechazado_a + rechazado_l</td>
                  <td><strong>$ 0</strong> <span className="check-text">✓ coincide con la suma de las tres filas sin borrador</span></td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>Cadena + autorizado</strong></td>
                  <td>Σ monto donde estado ∈ &#123;pendiente_aprobacion, aprobado&#125;</td>
                  <td><strong>$ 0</strong> = $ 0 + $ 0</td>
                </tr>
                <tr>
                  <td>Total en borrador (tarjeta)</td>
                  <td>Igual que fila borrador (solo técnico en tablero)</td>
                  <td>$ 0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. SOLO GASTOS AUTORIZADOS */}
        <div className="math-section">
          <h4>2. Solo gastos «autorizados»: desglose legalización</h4>
          <p className="math-formula-sub">Sea <strong>A</strong> = Σ monto de gastos en estado aprobado (fila anterior). Se parte <strong>A</strong> en cuatro tramos mutuamente excluyentes:</p>
          <div className="tabla-responsive">
            <table className="tabla-admin border-table">
              <thead>
                <tr>
                  <th>Tramo</th>
                  <th>Definición (filtros)</th>
                  <th>Monto (COP)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>En proceso de legalización</td>
                  <td>aprobado, sin envío de legalización, y (sin plazo o fecha del gasto + plazo ≥ hoy). Plazo actual: <strong>720 h</strong>.</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Plazo vencido sin legalizar</td>
                  <td>aprobado, sin envío de legalización, y plazo &gt; 0 y vencido respecto a la fecha del gasto</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Pendiente revisión auxiliar (legalización)</td>
                  <td>aprobado, con envío de legalización del técnico, sin constancia de revisión del auxiliar financiero</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Pendiente cierre financiero</td>
                  <td>aprobado, con envío de legalización, revisión auxiliar registrada, sin fecha de cierre del financiero</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Total legalizado (cierre)</td>
                  <td>aprobado con cierre financiero de legalización</td>
                  <td>$ 0</td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>Identidad</strong></td>
                  <td>A = (en proceso) + (vencido) + (pend. rev. aux.) + (pend. fin.) + (legalizado cierre)</td>
                  <td><span className="check-text">✓ $ 0 = suma de los cinco tramos</span></td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>Tarjeta «Gasto autorizado» (iniciar legalización)</strong></td>
                  <td>Solo aprobados <strong>sin</strong> envío de legalización = en proceso + vencido</td>
                  <td><strong>$ 0</strong> <span className="check-text">✓ = en proceso + vencido</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. CONSIGNACIONES */}
        <div className="math-section">
          <h4>3. Consignaciones (dinero a favor del técnico)</h4>
          <div className="tabla-responsive">
            <table className="tabla-admin border-table">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Fórmula</th>
                  <th>Valor (COP)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total consignado</td>
                  <td>Σ consignaciones donde usted es beneficiario</td>
                  <td>$ 0</td>
                </tr>
                <tr>
                  <td>Menos: total legalizado (cierre)</td>
                  <td>Igual al tramo «Total legalizado» de la sección 2</td>
                  <td>-$ 0</td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>Dinero disponible</strong></td>
                  <td>Disponible = Consignado - Legalizado (cierre)</td>
                  <td><strong>$ 0</strong> <span className="check-text">✓ verificado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="cupo-note">
            El <strong>cupo mínimo disponible</strong> (si lo tiene configurado en su usuario) es un piso en COP sobre el «Dinero disponible»; no es una suma de gastos ni entra en las ecuaciones anteriores.
          </p>
        </div>
      </section>
    </div>
  );
}

export default DashboardAdmin;
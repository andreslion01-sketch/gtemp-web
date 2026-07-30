import React, { useState } from 'react';

function Dinero({ onVolver }) {
  // Datos simulados de presupuestos por centro de costo
  const [presupuestos] = useState([
    {
      id: 'CC-101',
      proyecto: 'Proyecto San Francisco',
      asignado: 10000000,
      ejecutado: 4200000,
      comprometido: 120000
    },
    {
      id: 'CC-102',
      proyecto: 'Proyecto Doña Juana',
      asignado: 5000000,
      ejecutado: 3800000,
      comprometido: 85000
    },
    {
      id: 'CC-103',
      proyecto: 'Mantenimiento General',
      asignado: 3000000,
      ejecutado: 1200000,
      comprometido: 0
    }
  ]);

  return (
    <div className="dinero-container">
      <div className="form-header">
        <button onClick={onVolver} className="btn-back">← Volver al panel</button>
        <h2>Tablero de Dinero y Ejecución Presupuestal</h2>
      </div>

      <div className="grid-presupuestos">
        {presupuestos.map((item) => {
          const disponible = item.asignado - item.ejecutado - item.comprometido;
          const porcentajeEjecutado = Math.round(((item.ejecutado + item.comprometido) / item.asignado) * 100);

          return (
            <div key={item.id} className="card-presupuesto">
              <div className="card-presupuesto-header">
                <h3>{item.proyecto}</h3>
                <span className="badge-cc">{item.id}</span>
              </div>

              <div className="presupuesto-monto">
                <small>Saldo Disponible</small>
                <h2>${disponible.toLocaleString()} COP</h2>
              </div>

              <div className="progress-bar-bg">
                <div 
                  className={`progress-bar-fill ${porcentajeEjecutado > 80 ? 'warning' : ''}`} 
                  style={{ width: `${porcentajeEjecutado}%` }}
                ></div>
              </div>

              <div className="presupuesto-detalles">
                <div>
                  <small>Asignado:</small>
                  <span>${item.asignado.toLocaleString()}</span>
                </div>
                <div>
                  <small>Ejecutado:</small>
                  <span>${item.ejecutado.toLocaleString()}</span>
                </div>
                <div>
                  <small>Comprometido:</small>
                  <span>${item.comprometido.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dinero;
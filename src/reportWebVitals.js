import React, { useState } from 'react';

function Reportes({ onVolver }) {
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: '',
    proyecto: 'todos',
    formato: 'excel'
  });

  const [mensaje, setMensaje] = useState('');
  const [generando, setGenerando] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleExportar = (e) => {
    e.preventDefault();
    setMensaje('');
    setGenerando(true);

    // Simulación de generación de reporte auditable con Hash/ID de verificación
    setTimeout(() => {
      setGenerando(false);
      const hashAuditoria = Math.random().toString(36).substring(2, 10).toUpperCase();
      setMensaje(
        `Reporte (${filtros.formato.toUpperCase()}) generado con éxito. ID de firma de auditoría: SEC-${hashAuditoria}`
      );
    }, 1200);
  };

  return (
    <div className="reportes-container">
      <div className="form-header">
        <button onClick={onVolver} className="btn-back">← Volver al panel</button>
        <h2>Exportación de Gastos y Legalización Auditada</h2>
      </div>

      {mensaje && <div className="success-banner">{mensaje}</div>}

      <div className="reportes-card">
        <p className="reportes-intro">
          Seleccione los parámetros de filtrado para exportar la constancia de gastos. Los archivos generados incluyen un sello hash único para control de integridad y trazabilidad legal.
        </p>

        <form onSubmit={handleExportar} className="gasto-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha Inicial</label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={filtros.fechaInicio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaFin">Fecha Final</label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={filtros.fechaFin}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="proyecto">Proyecto / Centro de Costo</label>
              <select
                id="proyecto"
                name="proyecto"
                value={filtros.proyecto}
                onChange={handleInputChange}
              >
                <option value="todos">Todos los proyectos asignados</option>
                <option value="CC-101">Proyecto San Francisco (CC-101)</option>
                <option value="CC-102">Proyecto Doña Juana (CC-102)</option>
                <option value="CC-103">Mantenimiento General (CC-103)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="formato">Formato de Exportación</label>
              <select
                id="formato"
                name="formato"
                value={filtros.formato}
                onChange={handleInputChange}
              >
                <option value="excel">Reporte Excel (.XLSX - Máx 5.000 filas)</option>
                <option value="pdf">Constancia en PDF (Con firmas digitales)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={generando}>
            {generando ? 'Generando archivo auditable...' : `Descargar Reporte ${filtros.formato.toUpperCase()}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reportes;

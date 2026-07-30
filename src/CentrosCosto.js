import React, { useState } from 'react';

function CentrosCosto({ onVolver }) {
  const [centros, setCentros] = useState([
    { id: 1, codigo: 'GD-001', nombre: 'Centro general demo', activo: true, alta: '11/7/2026, 11:48:36 a. m.' },
    { id: 2, codigo: 'OP-001', nombre: 'Operativo campo demo', activo: true, alta: '11/7/2026, 11:48:36 a. m.' }
  ]);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [centroEditando, setCentroEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const [nuevoCentro, setNuevoCentro] = useState({ codigo: '', nombre: '' });

  // Crear nuevo centro de costo
  const handleCrearCentro = (e) => {
    e.preventDefault();
    if (!nuevoCentro.codigo || !nuevoCentro.nombre) return;

    const registro = {
      id: centros.length + 1,
      codigo: nuevoCentro.codigo.toUpperCase(),
      nombre: nuevoCentro.nombre,
      activo: true,
      alta: new Date().toLocaleString()
    };

    setCentros([...centros, registro]);
    setMensaje(`Centro de costo "${nuevoCentro.nombre}" creado exitosamente.`);
    setMostrarCrear(false);
    setNuevoCentro({ codigo: '', nombre: '' });
  };

  // Guardar edición
  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setCentros(centros.map(item => item.id === centroEditando.id ? centroEditando : item));
    setMensaje(`Centro de costo ${centroEditando.codigo} actualizado.`);
    setCentroEditando(null);
  };

  return (
    <div className="centros-costo-container">
      <div className="tipos-header">
        <h1>Centros de costo</h1>
        <button className="btn-nuevo-tipo" onClick={() => setMostrarCrear(true)}>
          + Nuevo centro
        </button>
      </div>

      <p className="tipos-subtitle">
        Código único, nombre y estado activo/inactivo.
      </p>

      {mensaje && <div className="success-banner">{mensaje}</div>}

      <div className="tabla-responsive">
        <table className="tabla-admin border-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Activo</th>
              <th>Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {centros.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><strong>{item.codigo}</strong></td>
                <td>{item.nombre}</td>
                <td>{item.activo ? 'Sí' : 'No'}</td>
                <td>{item.alta}</td>
                <td>
                  <button 
                    className="btn-action-edit-light"
                    onClick={() => setCentroEditando({ ...item })}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: NUEVO CENTRO DE COSTO */}
      {mostrarCrear && (
        <div className="modal-overlay-center">
          <div className="modal-card-center">
            <h2>Nuevo centro de costo</h2>
            <form onSubmit={handleCrearCentro} className="modal-form">
              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  value={nuevoCentro.codigo}
                  onChange={(e) => setNuevoCentro({ ...nuevoCentro, codigo: e.target.value })}
                  placeholder="Ej. GD-001"
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={nuevoCentro.nombre}
                  onChange={(e) => setNuevoCentro({ ...nuevoCentro, nombre: e.target.value })}
                  placeholder="Ej. Centro general demo"
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-modal-cancel" 
                  onClick={() => setMostrarCrear(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-submit">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDITAR CENTRO DE COSTO */}
      {centroEditando && (
        <div className="modal-overlay-center">
          <div className="modal-card-center">
            <h2>Editar • {centroEditando.codigo}</h2>
            <form onSubmit={handleGuardarEdicion} className="modal-form">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={centroEditando.nombre}
                  onChange={(e) => setCentroEditando({ ...centroEditando, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="form-group-checkbox">
                <input
                  type="checkbox"
                  id="chkActivoCentro"
                  checked={centroEditando.activo}
                  onChange={(e) => setCentroEditando({ ...centroEditando, activo: e.target.checked })}
                />
                <label htmlFor="chkActivoCentro">Activo</label>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-modal-cancel" 
                  onClick={() => setCentroEditando(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CentrosCosto;
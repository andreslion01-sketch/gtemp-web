import React, { useState } from 'react';

function TiposConsignacion({ onVolver }) {
  const [tipos, setTipos] = useState([
    { id: 1, codigo: 'VIAT', nombre: 'viáticos', orden: 1, activo: 'Sí', alta: '11/7/2026, 11:48:37 a. m.' },
    { id: 2, codigo: 'COMP', nombre: 'Compras', orden: 2, activo: 'Sí', alta: '11/7/2026, 11:48:37 a. m.' }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoTipo, setNuevoTipo] = useState({
    codigo: '',
    nombre: '',
    orden: 0
  });

  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoTipo({ ...nuevoTipo, [name]: value });
  };

  const handleCrear = (e) => {
    e.preventDefault();
    if (!nuevoTipo.codigo || !nuevoTipo.nombre) {
      alert('El código y el nombre son obligatorios.');
      return;
    }

    const nuevoRegistro = {
      id: tipos.length + 1,
      codigo: nuevoTipo.codigo.toUpperCase(),
      nombre: nuevoTipo.nombre,
      orden: parseInt(nuevoTipo.orden, 10) || 0,
      activo: 'Sí',
      alta: new Date().toLocaleString()
    };

    setTipos([...tipos, nuevoRegistro]);
    setMensaje(`Tipo de consignación "${nuevoTipo.nombre}" creado exitosamente.`);
    setMostrarModal(false);

    // Resetear formulario
    setNuevoTipo({ codigo: '', nombre: '', orden: 0 });
  };

  return (
    <div className="tipos-consignacion-container">
      <div className="tipos-header">
        <h1>Tipos de consignación</h1>
        <button className="btn-nuevo-tipo" onClick={() => setMostrarModal(true)}>
          + Nuevo tipo
        </button>
      </div>

      <p className="tipos-subtitle">
        Catálogo que el perfil <strong>financiero</strong> usa al registrar consignaciones al técnico. Los tipos inactivos no aparecen en el formulario. El técnico ve el tipo de cada consignación como dato informativo.
      </p>

      {mensaje && <div className="success-banner">{mensaje}</div>}

      <div className="tabla-responsive">
        <table className="tabla-admin border-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Orden</th>
              <th>Activo</th>
              <th>Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><strong>{item.codigo}</strong></td>
                <td>{item.nombre}</td>
                <td>{item.orden}</td>
                <td>{item.activo}</td>
                <td>{item.alta}</td>
                <td>
                  <button className="btn-action-edit-light">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VENTANA MODAL FLOTANTE CENTRADA */}
      {mostrarModal && (
        <div className="modal-overlay-center">
          <div className="modal-card-center">
            <h2>Nuevo tipo de consignación</h2>

            <form onSubmit={handleCrear} className="modal-form">
              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  name="codigo"
                  value={nuevoTipo.codigo}
                  onChange={handleInputChange}
                  placeholder="Ej. VIAT"
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevoTipo.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej. Viáticos"
                  required
                />
              </div>

              <div className="form-group">
                <label>Orden</label>
                <input
                  type="number"
                  name="orden"
                  value={nuevoTipo.orden}
                  onChange={handleInputChange}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-submit">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TiposConsignacion;
import React, { useState } from 'react';

function Proyectos({ onVolver }) {
  const [proyectos, setProyectos] = useState([
    {
      id: 1,
      codigo: 'PRY-DEMO',
      nombre: 'Proyecto demo instalaciones',
      descripcion: 'Imputación de ejemplo tras migrate; sustituya o amplíe desde administración.',
      centros: ['GD-001', 'OP-001'],
      activo: true
    }
  ]);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Estado formulario Nuevo Proyecto
  const [nuevoProyecto, setNuevoProyecto] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    centrosSeleccionados: ['GD-001', 'OP-001']
  });

  // MANEJADORES DE NUEVO PROYECTO
  const handleInputChangeNuevo = (e) => {
    const { name, value } = e.target;
    setNuevoProyecto({ ...nuevoProyecto, [name]: value });
  };

  const handleCheckboxNuevo = (codigoCentro) => {
    const seleccionados = nuevoProyecto.centrosSeleccionados.includes(codigoCentro)
      ? nuevoProyecto.centrosSeleccionados.filter(c => c !== codigoCentro)
      : [...nuevoProyecto.centrosSeleccionados, codigoCentro];

    setNuevoProyecto({ ...nuevoProyecto, centrosSeleccionados: seleccionados });
  };

  const handleCrearProyecto = (e) => {
    e.preventDefault();
    if (!nuevoProyecto.codigo || !nuevoProyecto.nombre) {
      alert('Código y Nombre son obligatorios.');
      return;
    }

    const nuevoRegistro = {
      id: proyectos.length + 1,
      codigo: nuevoProyecto.codigo.toUpperCase(),
      nombre: nuevoProyecto.nombre,
      descripcion: nuevoProyecto.descripcion,
      centros: nuevoProyecto.centrosSeleccionados,
      activo: true
    };

    setProyectos([...proyectos, nuevoRegistro]);
    setMensaje(`Proyecto "${nuevoProyecto.nombre}" creado con éxito.`);
    setMostrarCrear(false);
    setNuevoProyecto({ codigo: '', nombre: '', descripcion: '', centrosSeleccionados: [] });
  };

  // MANEJADORES DE EDITAR PROYECTO
  const handleCheckboxEditar = (codigoCentro) => {
    const seleccionados = proyectoEditando.centros.includes(codigoCentro)
      ? proyectoEditando.centros.filter(c => c !== codigoCentro)
      : [...proyectoEditando.centros, codigoCentro];

    setProyectoEditando({ ...proyectoEditando, centros: seleccionados });
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setProyectos(proyectos.map(p => p.id === proyectoEditando.id ? proyectoEditando : p));
    setMensaje(`Proyecto ${proyectoEditando.codigo} actualizado con éxito.`);
    setProyectoEditando(null);
  };

  // MANEJADOR DESACTIVAR / ACTIVAR CON ALERTA NATIVA
  const handleToggleActivo = (p) => {
    const accion = p.activo ? 'Desactivar' : 'Activar';
    const seguro = window.confirm(`¿${accion} proyecto ${p.codigo}?`);

    if (seguro) {
      setProyectos(proyectos.map(item => {
        if (item.id === p.id) {
          return { ...item, activo: !item.activo };
        }
        return item;
      }));
      setMensaje(`Proyecto ${p.codigo} ${p.activo ? 'desactivado' : 'activado'}.`);
    }
  };

  return (
    <div className="proyectos-container">
      <div className="tipos-header">
        <h1>Proyectos</h1>
        <button 
          className="btn-nuevo-tipo" 
          onClick={() => setMostrarCrear(true)}
        >
          + Nuevo proyecto
        </button>
      </div>

      <p className="tipos-subtitle">
        Código único, nombre, descripción opcional y uno o más centros de costo activos.
      </p>

      {mensaje && <div className="success-banner">{mensaje}</div>}

      <div className="tabla-responsive">
        <table className="tabla-admin border-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Centros</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.codigo}</strong></td>
                <td>{p.nombre}</td>
                <td>{p.centros.join(', ')}</td>
                <td>{p.activo ? 'Sí' : 'No'}</td>
                <td>
                  <div className="btn-group-actions-col">
                    <button 
                      className="btn-action-edit-light"
                      onClick={() => setProyectoEditando({ ...p })}
                    >
                      Editar
                    </button>
                    <button 
                      className={`btn-action-desactivar ${!p.activo ? 'btn-action-activar' : ''}`}
                      onClick={() => handleToggleActivo(p)}
                    >
                      {p.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 1. MODAL NUEVO PROYECTO */}
      {mostrarCrear && (
        <div className="modal-overlay">
          <div className="modal-panel-right">
            <h2>Nuevo proyecto</h2>

            <form onSubmit={handleCrearProyecto} className="modal-form">
              <div className="form-group">
                <label>Código *</label>
                <input
                  type="text"
                  name="codigo"
                  value={nuevoProyecto.codigo}
                  onChange={handleInputChangeNuevo}
                  placeholder="Ej. PRY-DEMO"
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevoProyecto.nombre}
                  onChange={handleInputChangeNuevo}
                  placeholder="Ej. Proyecto demo instalaciones"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción (opcional)</label>
                <textarea
                  name="descripcion"
                  rows="3"
                  value={nuevoProyecto.descripcion}
                  onChange={handleInputChangeNuevo}
                  className="textarea-custom"
                ></textarea>
              </div>

              <div className="form-group">
                <fieldset className="fieldset-centros">
                  <legend>Centros de costo</legend>
                  
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={nuevoProyecto.centrosSeleccionados.includes('GD-001')}
                      onChange={() => handleCheckboxNuevo('GD-001')}
                    />
                    <span><strong>GD-001</strong> — Centro general demo</span>
                  </label>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={nuevoProyecto.centrosSeleccionados.includes('OP-001')}
                      onChange={() => handleCheckboxNuevo('OP-001')}
                    />
                    <span><strong>OP-001</strong> — Operativo campo demo</span>
                  </label>
                </fieldset>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-modal-cancel"
                  onClick={() => setMostrarCrear(false)}
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

      {/* 2. MODAL EDITAR PROYECTO */}
      {proyectoEditando && (
        <div className="modal-overlay">
          <div className="modal-panel-right">
            <h2>Editar • {proyectoEditando.codigo}</h2>

            <form onSubmit={handleGuardarEdicion} className="modal-form">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={proyectoEditando.nombre}
                  onChange={(e) => setProyectoEditando({ ...proyectoEditando, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  rows="3"
                  value={proyectoEditando.descripcion || ''}
                  onChange={(e) => setProyectoEditando({ ...proyectoEditando, descripcion: e.target.value })}
                  className="textarea-custom"
                ></textarea>
              </div>

              <div className="form-group-checkbox">
                <input
                  type="checkbox"
                  id="chkActivoPry"
                  checked={proyectoEditando.activo}
                  onChange={(e) => setProyectoEditando({ ...proyectoEditando, activo: e.target.checked })}
                />
                <label htmlFor="chkActivoPry">Activo</label>
              </div>

              <div className="form-group">
                <fieldset className="fieldset-centros">
                  <legend>Centros de costo</legend>
                  
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={proyectoEditando.centros.includes('GD-001')}
                      onChange={() => handleCheckboxEditar('GD-001')}
                    />
                    <span><strong>GD-001</strong> — Centro general demo</span>
                  </label>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={proyectoEditando.centros.includes('OP-001')}
                      onChange={() => handleCheckboxEditar('OP-001')}
                    />
                    <span><strong>OP-001</strong> — Operativo campo demo</span>
                  </label>
                </fieldset>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-modal-cancel"
                  onClick={() => setProyectoEditando(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-submit">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proyectos;
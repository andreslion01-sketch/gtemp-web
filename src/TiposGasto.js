import React, { useState } from 'react';

function TiposGasto({ onVolver }) {
  const [tipos, setTipos] = useState([
    { id: 2, codigo: 'ALOJ', nombre: 'Alojamiento', activo: true, alta: '11/7/2026, 11:48:36 a. m.' },
    { id: 3, codigo: 'MAT', nombre: 'Materiales', activo: true, alta: '11/7/2026, 11:48:36 a. m.' },
    { id: 1, codigo: 'TRANS', nombre: 'Transporte', activo: true, alta: '11/7/2026, 11:48:36 a. m.' }
  ]);

  const [subcategoriasMap, setSubcategoriasMap] = useState({
    ALOJ: [
      { id: 101, codigo: 'APTO', nombre: 'Apartamento / Airbnb', activo: 'Sí' },
      { id: 102, codigo: 'HOT', nombre: 'Hotel', activo: 'Sí' }
    ],
    MAT: [
      { id: 201, codigo: 'HERR', nombre: 'Herramientas', activo: 'Sí' }
    ],
    TRANS: [
      { id: 301, codigo: 'TAXI', nombre: 'Taxi / Uber', activo: 'Sí' }
    ]
  });

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [tipoEditando, setTipoEditando] = useState(null);
  const [tipoSubcat, setTipoSubcat] = useState(null);

  const [nuevoTipo, setNuevoTipo] = useState({ codigo: '', nombre: '' });
  const [nuevaSubcat, setNuevaSubcat] = useState({ codigo: '', nombre: '' });
  const [mensaje, setMensaje] = useState('');

  const handleCrearTipo = (e) => {
    e.preventDefault();
    if (!nuevoTipo.codigo || !nuevoTipo.nombre) return;

    const cod = nuevoTipo.codigo.toUpperCase();
    const registro = {
      id: tipos.length + 1,
      codigo: cod,
      nombre: nuevoTipo.nombre,
      activo: true,
      alta: new Date().toLocaleString()
    };

    setTipos([...tipos, registro]);
    setSubcategoriasMap({ ...subcategoriasMap, [cod]: [] });
    setMensaje(`Tipo de gasto "${nuevoTipo.nombre}" creado exitosamente.`);
    setMostrarCrear(false);
    setNuevoTipo({ codigo: '', nombre: '' });
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setTipos(tipos.map(item => item.id === tipoEditando.id ? tipoEditando : item));
    setMensaje(`Tipo de gasto ${tipoEditando.codigo} actualizado.`);
    setTipoEditando(null);
  };

  const handleToggleActivoTipo = (id) => {
    setTipos(tipos.map(item => item.id === id ? { ...item, activo: !item.activo } : item));
  };

  // FUNCIÓN DE ELIMINAR CON ALERTA IGUAL A LA IMAGEN
  const handleEliminarTipo = (tipo) => {
    const seguro = window.confirm(
      `¿Eliminar el tipo «${tipo.codigo}»? Los gastos que lo usen quedarán sin tipo.`
    );

    if (seguro) {
      setTipos(tipos.filter((item) => item.id !== tipo.id));
      setMensaje(`El tipo de gasto «${tipo.codigo}» ha sido eliminado.`);
    }
  };

  const handleAgregarSubcat = (e) => {
    e.preventDefault();
    if (!nuevaSubcat.codigo || !nuevaSubcat.nombre) return;

    const listaActual = subcategoriasMap[tipoSubcat.codigo] || [];
    const nueva = {
      id: Date.now(),
      codigo: nuevaSubcat.codigo.toUpperCase(),
      nombre: nuevaSubcat.nombre,
      activo: 'Sí'
    };

    setSubcategoriasMap({
      ...subcategoriasMap,
      [tipoSubcat.codigo]: [...listaActual, nueva]
    });

    setNuevaSubcat({ codigo: '', nombre: '' });
  };

  const handleToggleSubcat = (subId) => {
    const listaActual = subcategoriasMap[tipoSubcat.codigo] || [];
    const actualizada = listaActual.map(item => {
      if (item.id === subId) {
        return { ...item, activo: item.activo === 'Sí' ? 'No' : 'Sí' };
      }
      return item;
    });
    setSubcategoriasMap({ ...subcategoriasMap, [tipoSubcat.codigo]: actualizada });
  };

  const handleEliminarSubcat = (subId) => {
    const listaActual = subcategoriasMap[tipoSubcat.codigo] || [];
    setSubcategoriasMap({
      ...subcategoriasMap,
      [tipoSubcat.codigo]: listaActual.filter(item => item.id !== subId)
    });
  };

  return (
    <div className="tipos-gasto-container">
      <div className="tipos-header">
        <h1>Tipos de gasto</h1>
        <button className="btn-nuevo-tipo" onClick={() => setMostrarCrear(true)}>
          + Nuevo tipo
        </button>
      </div>

      <p className="tipos-subtitle">
        Rubros para clasificar gastos (opcional al registrar). Código único y estado activo. Cada tipo puede tener <strong>subcategorías</strong> (detalle operativo) usadas al registrar, aprobar o legalizar.
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
            {tipos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><strong>{item.codigo}</strong></td>
                <td>{item.nombre}</td>
                <td>{item.activo ? 'Sí' : 'No'}</td>
                <td>{item.alta}</td>
                <td>
                  <div className="btn-group-actions">
                    <button className="btn-action-edit" onClick={() => setTipoEditando({ ...item })}>
                      Editar
                    </button>
                    <button className="btn-action-sub" onClick={() => setTipoSubcat(item)}>
                      Subcategorías
                    </button>
                    <button className="btn-action-toggle" onClick={() => handleToggleActivoTipo(item.id)}>
                      {item.activo ? 'Desactivar' : 'Activar'}
                    </button>
                    <button className="btn-action-delete" onClick={() => handleEliminarTipo(item)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL NUEVO TIPO */}
      {mostrarCrear && (
        <div className="modal-overlay-center">
          <div className="modal-card-center">
            <h2>Nuevo tipo de gasto</h2>
            <form onSubmit={handleCrearTipo} className="modal-form">
              <div className="form-group">
                <label>Código</label>
                <input
                  type="text"
                  value={nuevoTipo.codigo}
                  onChange={(e) => setNuevoTipo({ ...nuevoTipo, codigo: e.target.value })}
                  placeholder="Ej. ALOJ"
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={nuevoTipo.nombre}
                  onChange={(e) => setNuevoTipo({ ...nuevoTipo, nombre: e.target.value })}
                  placeholder="Ej. Alojamiento"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setMostrarCrear(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-submit">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {tipoEditando && (
        <div className="modal-overlay-center">
          <div className="modal-card-center">
            <h2>Editar • {tipoEditando.codigo}</h2>
            <form onSubmit={handleGuardarEdicion} className="modal-form">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={tipoEditando.nombre}
                  onChange={(e) => setTipoEditando({ ...tipoEditando, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="form-group-checkbox">
                <input
                  type="checkbox"
                  id="chkActivo"
                  checked={tipoEditando.activo}
                  onChange={(e) => setTipoEditando({ ...tipoEditando, activo: e.target.checked })}
                />
                <label htmlFor="chkActivo">Activo</label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setTipoEditando(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SUBCATEGORÍAS */}
      {tipoSubcat && (
        <div className="modal-overlay-center">
          <div className="modal-card-center modal-subcategorias">
            <h2>Subcategorías • {tipoSubcat.codigo}</h2>
            <p className="modal-sub-info">
              Código único <strong>por tipo</strong>. Las inactivas no aparecen en formularios de gasto.
            </p>

            <div className="subcat-table-wrapper">
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(subcategoriasMap[tipoSubcat.codigo] || []).map((sub) => (
                    <tr key={sub.id}>
                      <td><strong>{sub.codigo}</strong></td>
                      <td>{sub.nombre}</td>
                      <td>{sub.activo}</td>
                      <td>
                        <div className="btn-group-subcat">
                          <button className="btn-action-edit" type="button">Editar</button>
                          <button 
                            className="btn-action-toggle" 
                            type="button" 
                            onClick={() => handleToggleSubcat(sub.id)}
                          >
                            {sub.activo === 'Sí' ? 'Desactivar' : 'Activar'}
                          </button>
                          <button 
                            className="btn-action-delete" 
                            type="button" 
                            onClick={() => handleEliminarSubcat(sub.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(subcategoriasMap[tipoSubcat.codigo] || []).length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center-muted">Sin subcategorías agregadas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="nueva-subcat-box">
              <h3>Nueva subcategoría</h3>
              <form onSubmit={handleAgregarSubcat} className="modal-form">
                <div className="form-group">
                  <label>Código</label>
                  <input
                    type="text"
                    value={nuevaSubcat.codigo}
                    onChange={(e) => setNuevaSubcat({ ...nuevaSubcat, codigo: e.target.value })}
                    placeholder="Ej. APTO"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={nuevaSubcat.nombre}
                    onChange={(e) => setNuevaSubcat({ ...nuevaSubcat, nombre: e.target.value })}
                    placeholder="Ej. Apartamento / Airbnb"
                    required
                  />
                </div>
                <button type="submit" className="btn-submit-green">Agregar</button>
              </form>
            </div>

            <div className="modal-actions-right">
              <button type="button" className="btn-modal-cancel" onClick={() => setTipoSubcat(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TiposGasto;
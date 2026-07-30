import React, { useState } from 'react';

function Usuarios({ onVolver, usuarioLogueado }) {
  // 1. IDENTIFICAR ROL Y CÉDULA DEL USUARIO ACTUAL EN SESIÓN
  // Si no se pasa el objeto, por defecto se asume la sesión actual
  const rolActual = usuarioLogueado?.perfil || 'administrador';
  const cedulaActual = usuarioLogueado?.cedula || '1111111111';
  const esAdmin = rolActual.toLowerCase() === 'administrador';

  // LISTA COMPLETA DE USUARIOS
  const [usuarios, setUsuarios] = useState([
    { id: 1, cedula: '10987654321', nombre: 'Coordinador respaldo demo', perfil: 'coordinador', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 11:48:37 a. m.', passwordActual: '123456' },
    { id: 2, cedula: '20987654321', nombre: 'Gerente respaldo demo', perfil: 'gerente', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 11:48:37 a. m.', passwordActual: '123456' },
    { id: 3, cedula: '30987654321', nombre: 'Director respaldo demo', perfil: 'director', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 11:48:37 a. m.', passwordActual: '123456' },
    { id: 4, cedula: '40987654321', nombre: 'Financiero respaldo demo', perfil: 'financiero', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 11:48:37 a. m.', passwordActual: '123456' },
    { id: 5, cedula: '50987654321', nombre: 'Auxiliar respaldo demo', perfil: 'auxiliar', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 11:48:37 a. m.', passwordActual: '123456' },
    { id: 6, cedula: '1234567890', nombre: 'Técnico demo', perfil: 'tecnico', tope: '50.000.000', cupo: '500.000', celular: '1234567890', correo: 'leonardo.guativa@tempelgroup.com', activo: true, alta: '11/7/2026, 12:18:47 p. m.', passwordActual: '123456' },
    { id: 7, cedula: '9876543210', nombre: 'Coordinador demo', perfil: 'coordinador', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 12:18:47 p. m.', passwordActual: '123456' },
    { id: 8, cedula: '3333333333', nombre: 'Gerente demo', perfil: 'gerente', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 12:18:47 p. m.', passwordActual: '123456' },
    { id: 9, cedula: '4444444444', nombre: 'Director demo', perfil: 'director', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 12:18:47 p. m.', passwordActual: '123456' },
    { id: 10, cedula: '5555555555', nombre: 'Auxiliar financiero demo', perfil: 'auxiliar', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 12:18:47 p. m.', passwordActual: '123456' },
    { id: 11, cedula: '1111111111', nombre: 'Administrador demo', perfil: 'administrador', tope: '0', cupo: '0', celular: '—', correo: '—', activo: true, alta: '11/7/2026, 12:18:47 p. m.', passwordActual: '123456' }
  ]);

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  // CAMPOS DE CONTRASEÑA EN EDICIÓN
  const [passViejaInput, setPassViejaInput] = useState('');
  const [passNuevaInput, setPassNuevaInput] = useState('');

  // Formulario nuevo usuario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    cedula: '',
    nombre: '',
    perfil: 'Técnico',
    password: '',
    celular: '',
    correo: '',
    foto: '',
    tope: '0',
    cupo: '0'
  });

  // ABRIR MODAL EDITAR
  const handleAbrirEditar = (usuario) => {
    // Si no es administrador y la cédula no coincide con su propio usuario, rechaza la edición
    if (!esAdmin && usuario.cedula !== cedulaActual) {
      alert('Acceso restringido: Solo puede modificar los datos de su propio usuario.');
      return;
    }

    setUsuarioEditando({ ...usuario });
    setPassViejaInput('');
    setPassNuevaInput('');
    setErrorPassword('');
  };

  // GUARDAR EDICIÓN CON VALIDACIÓN DE CONTRASEÑA
  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setErrorPassword('');

    if (passViejaInput || passNuevaInput) {
      if (!passViejaInput) {
        setErrorPassword('Debe ingresar la contraseña vieja para realizar el cambio.');
        return;
      }

      const passwordCorrecta = usuarioEditando.passwordActual || '123456';
      if (passViejaInput !== passwordCorrecta) {
        setErrorPassword('Error: La contraseña vieja ingresada no es válida.');
        return;
      }

      if (!passNuevaInput) {
        setErrorPassword('Debe ingresar la nueva contraseña.');
        return;
      }
    }

    const usuarioActualizado = {
      ...usuarioEditando,
      passwordActual: passNuevaInput ? passNuevaInput : usuarioEditando.passwordActual
    };

    setUsuarios(usuarios.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
    setMensaje(`Usuario ${usuarioActualizado.cedula} actualizado exitosamente.`);
    setUsuarioEditando(null);
  };

  // MANEJADORES DE CREAR
  const handleCrearUsuario = (e) => {
    e.preventDefault();

    if (!esAdmin) {
      alert('Permiso denegado: Solo el Administrador puede crear nuevos usuarios.');
      return;
    }

    if (!nuevoUsuario.cedula || !nuevoUsuario.nombre) {
      alert('Cédula y Nombre son obligatorios.');
      return;
    }

    const fechaActual = new Date().toLocaleString('es-CO');
    const nuevoRegistro = {
      id: usuarios.length + 1,
      cedula: nuevoUsuario.cedula,
      nombre: nuevoUsuario.nombre,
      perfil: nuevoUsuario.perfil.toLowerCase(),
      tope: nuevoUsuario.tope || '0',
      cupo: nuevoUsuario.cupo || '0',
      celular: nuevoUsuario.celular || '—',
      correo: nuevoUsuario.correo || '—',
      activo: true,
      alta: fechaActual,
      passwordActual: nuevoUsuario.password || '123456'
    };

    setUsuarios([...usuarios, nuevoRegistro]);
    setMensaje(`Usuario ${nuevoUsuario.nombre} creado con éxito.`);
    setMostrarCrear(false);
    setNuevoUsuario({ cedula: '', nombre: '', perfil: 'Técnico', password: '', celular: '', correo: '', foto: '', tope: '0', cupo: '0' });
  };

  // MANEJADOR DESACTIVAR / ACTIVAR
  const handleToggleActivo = (u) => {
    if (!esAdmin) {
      alert('Permiso denegado: Solo el Administrador puede cambiar el estado de las cuentas.');
      return;
    }

    const accion = u.activo ? 'Desactivar' : 'Activar';
    if (window.confirm(`¿${accion} usuario ${u.nombre}?`)) {
      setUsuarios(usuarios.map(item => item.id === u.id ? { ...item, activo: !item.activo } : item));
      setMensaje(`El usuario ${u.nombre} ha sido ${u.activo ? 'desactivado' : 'activado'}.`);
    }
  };

  return (
    <div className="usuarios-container">
      {/* HEADER DE LA SECCIÓN */}
      <div className="tipos-header">
        <h1>Usuarios</h1>

        {/* SOLO EL ADMINISTRADOR TIENE EL BOTÓN DE CREAR NUEVO USUARIO */}
        {esAdmin && (
          <button className="btn-nuevo-tipo" onClick={() => setMostrarCrear(true)}>
            + Nuevo usuario
          </button>
        )}
      </div>

      <p className="tipos-subtitle">
        Crear, editar perfil y activar o desactivar cuentas. Solo el perfil <strong>técnico</strong> registra gastos en campo; coordinador, gerente, director y financiero actúan en la cadena de autorización del gasto; auxiliar en legalización del paquete y consignaciones según reglas. Para técnicos: el <strong>tope cadena de aprobación</strong> limita cuánto puede tener en «pendiente» más cada envío; el <strong>cupo mínimo disponible</strong> es el piso en COP para (consignado - legalizado), que financiero vigila en su pantalla de consignaciones.
      </p>

      {mensaje && <div className="success-banner">{mensaje}</div>}

      {/* TABLA PRINCIPAL */}
      <div className="tabla-responsive">
        <table className="tabla-admin border-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Perfil</th>
              <th>Tope cadena (COP)</th>
              <th>Cupo mín. disp. (COP)</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Activo</th>
              <th>Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => {
              // Determina si este renglón pertenece al usuario conectado
              const esSuPropioUsuario = u.cedula === cedulaActual;
              const puedeEditarEsteRegistro = esAdmin || esSuPropioUsuario;

              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td><strong>{u.cedula}</strong></td>
                  <td>{u.nombre}</td>
                  <td>{u.perfil}</td>
                  <td>{u.tope}</td>
                  <td>{u.cupo}</td>
                  <td>{u.celular}</td>
                  <td>{u.correo}</td>
                  <td>{u.activo ? 'Sí' : 'No'}</td>
                  <td style={{ fontSize: '0.8rem', color: '#6b7280' }}>{u.alta}</td>
                  <td>
                    <div className="btn-group-actions-col">
                      {/* BOTÓN EDITAR (DISPONIBLE PARA EL ADMIN O PARA EL PROPIO USUARIO) */}
                      {puedeEditarEsteRegistro ? (
                        <button
                          className="btn-action-edit-light"
                          onClick={() => handleAbrirEditar(u)}
                        >
                          Editar
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Solo lectura</span>
                      )}

                      {/* BOTÓN DESACTIVAR (EXCLUSIVO DEL ADMIN) */}
                      {esAdmin && (
                        <button
                          className={`btn-action-desactivar ${!u.activo ? 'btn-action-activar' : ''}`}
                          onClick={() => handleToggleActivo(u)}
                        >
                          {u.activo ? 'Desactivar' : 'Activar'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: EDITAR USUARIO */}
      {usuarioEditando && (
        <div className="modal-overlay">
          <div className="modal-panel-right">
            <h2>Editar • {usuarioEditando.cedula}</h2>

            {errorPassword && <div className="error-banner" style={{ marginBottom: '12px' }}>{errorPassword}</div>}

            <form onSubmit={handleGuardarEdicion} className="modal-form">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={usuarioEditando.nombre}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })}
                  required
                />
              </div>

              {/* SOLO EL ADMIN PUEDE CAMBIAR EL PERFIL */}
              <div className="form-group">
                <label>Perfil</label>
                <select
                  value={usuarioEditando.perfil}
                  disabled={!esAdmin}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, perfil: e.target.value })}
                  className="select-custom-pdf"
                >
                  <option value="tecnico">Técnico</option>
                  <option value="coordinador">Coordinador</option>
                  <option value="gerente">Gerente de proyecto</option>
                  <option value="director">Director de proyecto</option>
                  <option value="auxiliar">Auxiliar financiero</option>
                  <option value="financiero">Financiero</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>

              {/* SOLO EL ADMIN PUEDE MARCAR/DESMARCAR ACTIVO */}
              <div className="form-group-checkbox" style={{ justifyContent: 'center', margin: '12px 0' }}>
                <input
                  type="checkbox"
                  id="chkActivoUser"
                  disabled={!esAdmin}
                  checked={usuarioEditando.activo}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, activo: e.target.checked })}
                />
                <label htmlFor="chkActivoUser">Activo</label>
              </div>

              {/* CAMPOS DE CAMBIO DE CONTRASEÑA (HABILITADOS PARA TODOS) */}
              <div className="form-group">
                <label>Contraseña vieja (opcional)</label>
                <input
                  type="password"
                  placeholder="Ingrese contraseña actual para cambiar"
                  value={passViejaInput}
                  onChange={(e) => setPassViejaInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Contraseña nueva (opcional)</label>
                <input
                  type="password"
                  placeholder="Ingrese la nueva contraseña"
                  value={passNuevaInput}
                  onChange={(e) => setPassNuevaInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Celular</label>
                <input
                  type="text"
                  placeholder="Vacío borra celular registrado"
                  value={usuarioEditando.celular === '—' ? '' : usuarioEditando.celular}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, celular: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  placeholder="Vacío borra correo"
                  value={usuarioEditando.correo === '—' ? '' : usuarioEditando.correo}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, correo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Foto — URL o ruta</label>
                <input
                  type="text"
                  placeholder="https://... o usuarios/archivo.jpg • vacío borra"
                  value={usuarioEditando.foto || ''}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, foto: e.target.value })}
                />
              </div>

              {/* CAMPOS TÉCNICOS: SOLO MODIFICABLES POR EL ADMIN */}
              <div className="form-group">
                <label>Tope cadena de aprobación (COP)</label>
                <input
                  type="text"
                  disabled={!esAdmin}
                  value={usuarioEditando.tope}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, tope: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Cupo mínimo disponible (COP)</label>
                <input
                  type="text"
                  disabled={!esAdmin}
                  value={usuarioEditando.cupo}
                  onChange={(e) => setUsuarioEditando({ ...usuarioEditando, cupo: e.target.value })}
                />
              </div>

              <div className="modal-actions" style={{ justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="button" className="btn-modal-cancel" onClick={() => setUsuarioEditando(null)}>
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

      {/* MODAL 2: NUEVO USUARIO (SOLO ADMIN) */}
      {mostrarCrear && esAdmin && (
        <div className="modal-overlay">
          <div className="modal-panel-right">
            <h2>Nuevo usuario</h2>

            <form onSubmit={handleCrearUsuario} className="modal-form">
              <div className="form-group">
                <label>Cédula *</label>
                <input
                  type="text"
                  value={nuevoUsuario.cedula}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, cedula: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Perfil</label>
                <select
                  value={nuevoUsuario.perfil}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, perfil: e.target.value })}
                  className="select-custom-pdf"
                >
                  <option value="Técnico">Técnico</option>
                  <option value="Coordinador">Coordinador</option>
                  <option value="Gerente de proyecto">Gerente de proyecto</option>
                  <option value="Director de proyecto">Director de proyecto</option>
                  <option value="Auxiliar financiero">Auxiliar financiero</option>
                  <option value="Financiero">Financiero</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <div className="form-group">
                <label>Contraseña *</label>
                <input
                  type="password"
                  value={nuevoUsuario.password}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Celular</label>
                <input
                  type="text"
                  value={nuevoUsuario.celular}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, celular: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  value={nuevoUsuario.correo}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
                />
              </div>

              <div className="modal-actions" style={{ justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="button" className="btn-modal-cancel" onClick={() => setMostrarCrear(false)}>
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

export default Usuarios;
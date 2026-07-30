import React, { useState } from 'react';

function CadenaAprobacion() {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleRecargarCola = () => {
    setCargando(true);
    setMensaje('');
    setTimeout(() => {
      setCargando(false);
      setMensaje('Cola de aprobación actualizada.');
      setTimeout(() => setMensaje(''), 3000);
    }, 500);
  };

  return (
    <div className="cadena-aprobacion-container">
      {/* BOTÓN RECARGAR COLA */}
      <div className="box-recargar-cola" onClick={handleRecargarCola} style={{ cursor: 'pointer' }}>
        <button className="btn-recargar-cola-inner">
          {cargando ? '↻ Cargando...' : '↻ Recargar cola'}
        </button>
      </div>

      {mensaje && <div className="success-banner" style={{ marginTop: '12px' }}>{mensaje}</div>}

      {/* BLOQUE 1: PASO ACTUAL: SU TURNO */}
      <div className="card-paso-turno" style={{ marginTop: '16px' }}>
        <div className="card-paso-header">
          <span className="icon-check-circle">✓</span>
          <strong>Paso actual: su turno</strong>
        </div>
      </div>
      <p className="text-info-cadena">
        No hay gastos donde deba actuar ahora en el paso mínimo pendiente con su perfil. Revise seguimiento y auditoría más abajo.
      </p>

      {/* BLOQUE 2: OTROS GASTOS EN CADENA EN SU ALCANCE (AUDITORÍA) */}
      <div className="card-auditoria-header" style={{ marginTop: '24px' }}>
        <span className="icon-eye">👁</span>
        <strong>Otros gastos en cadena en su alcance (auditoría)</strong>
      </div>
      <p className="text-info-cadena">
        No hay otros gastos en cadena en su imputación en esta vista, o no tiene asignaciones activas a proyecto/centro.
      </p>
    </div>
  );
}

export default CadenaAprobacion;
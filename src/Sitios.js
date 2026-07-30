import React, { useState } from 'react';

function Sitios({ onVolver }) {
  const [sitios, setSitios] = useState([
    { id: 1, codigo: 'SITE-DEMO-1', nombre: 'Sitio demostración (tienda o centro)', proyecto: 'PRY-DEMO', activo: 'Sí' },
    { id: 2, codigo: 'SITE-DEMO-2', nombre: 'Sitio demostración 2 (pruebas adicionales)', proyecto: 'PRY-DEMO', activo: 'Sí' },
    { id: 3, codigo: 'SITE-DEMO-3', nombre: 'Sitio demostración 3 (pruebas adicionales)', proyecto: 'PRY-DEMO', activo: 'Sí' }
  ]);

  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // 1. DESCARGAR PLANTILLA CSV
  const handleDescargarPlantilla = () => {
    const contenidoCSV = 'codigo,nombre,proyectoCodigo\nSITE-EJEMPLO-1,Sitio Ejemplo 1,PRY-DEMO\nSITE-EJEMPLO-2,Sitio Ejemplo 2,PRY-DEMO';
    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'plantilla_sitios.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. SELECCIONAR ARCHIVO
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoSeleccionado(e.target.files[0]);
    }
  };

  // 3. IMPORTAR CSV E INSERTAR/ACTUALIZAR
  const handleImportarCSV = () => {
    if (!archivoSeleccionado) {
      alert('Por favor seleccione un archivo CSV primero.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const texto = e.target.result;
      const lineas = texto.split('\n').map(l => l.trim()).filter(l => l.length > 0);

      if (lineas.length <= 1) {
        alert('El archivo CSV está vacío o solo contiene encabezados.');
        return;
      }

      const nuevosSitios = [...sitios];
      let importados = 0;

      for (let i = 1; i < lineas.length; i++) {
        const columnas = lineas[i].split(',');
        if (columnas.length >= 3) {
          const codigo = columnas[0].trim();
          const nombre = columnas[1].trim();
          const proyecto = columnas[2].trim();

          const indexExistente = nuevosSitios.findIndex(s => s.codigo === codigo);
          if (indexExistente >= 0) {
            nuevosSitios[indexExistente] = { ...nuevosSitios[indexExistente], nombre, proyecto };
          } else {
            nuevosSitios.push({
              id: nuevosSitios.length + 1,
              codigo,
              nombre,
              proyecto,
              activo: 'Sí'
            });
          }
          importados++;
        }
      }

      setSitios(nuevosSitios);
      setMensaje(`Importación exitosa: ${importados} registros procesados.`);
      setArchivoSeleccionado(null);
    };

    reader.readAsText(archivoSeleccionado);
  };

  // CAMBIAR ESTADO ACTIVO
  const toggleActivo = (id) => {
    setSitios(sitios.map(s => {
      if (s.id === id) {
        const nuevoEstado = s.activo === 'Sí' ? 'No' : 'Sí';
        return { ...s, activo: nuevoEstado };
      }
      return s;
    }));
  };

  return (
    <div className="sitios-container">
      <div className="dash-section-header">
        <h1>Sitios de trabajo</h1>
        <p className="dash-subtitle">
          Cada sitio tiene un <strong>código (ID)</strong>, un <strong>nombre</strong> y está ligado a un <strong>proyecto</strong>. Los técnicos los eligen al registrar un gasto (con búsqueda). Use CSV para altas o actualizaciones masivas; las filas con el mismo <code>codigo</code> se actualizan.
        </p>
      </div>

      <div className="card-carga-csv">
        <h3>Cargue o actualice por CSV</h3>
        <p className="csv-instruction-text">
          Columnas: <code>codigo</code>, <code>nombre</code>, <code>proyectoCodigo</code> (código del proyecto existente y activo; también acepta ID numérico del proyecto). Primera fila puede ser encabezado con esos nombres.
        </p>

        <button className="btn-action-edit-light btn-descargar" onClick={handleDescargarPlantilla}>
          Descargar plantilla
        </button>

        <div className="form-group-file">
          <label>Archivo CSV (UTF-8)</label>
          <input 
            type="file" 
            accept=".csv"
            onChange={handleFileChange}
            className="input-file-custom"
          />
        </div>

        <button className="btn-submit-green" onClick={handleImportarCSV}>
          Importar CSV
        </button>
      </div>

      {mensaje && <div className="success-banner">{mensaje}</div>}

      <div className="tabla-responsive" style={{ marginTop: '24px' }}>
        <table className="tabla-admin border-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Proyecto</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sitios.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.codigo}</strong></td>
                <td>{s.nombre}</td>
                <td>{s.proyecto}</td>
                <td>{s.activo}</td>
                <td>
                  <button 
                    className={s.activo === 'Sí' ? 'btn-toggle-desactivar' : 'btn-toggle-activar'}
                    onClick={() => toggleActivo(s.id)}
                  >
                    {s.activo === 'Sí' ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sitios;
import React, { useState } from 'react';

function ConstanciaPDF({ onVolver }) {
  const [toastMsg, setToastMsg] = useState('');

  // Lista inicial de bloques en orden predeterminado
  const [bloques, setBloques] = useState([
    { id: 'cabecera', titulo: 'Título y número de registro', visible: true, saltoPagina: false },
    { id: 'organizacion', titulo: 'Nombre y NIT de la organización', visible: true, saltoPagina: false },
    { id: 'resumen_gasto', titulo: 'Resumen del gasto (imputación, monto, proveedor...)', visible: true, saltoPagina: false },
    { id: 'legalizacion_datos', titulo: 'Datos del documento de legalización', visible: true, saltoPagina: false },
    { id: 'revision_auxiliar', titulo: 'Revisión auxiliar', visible: true, saltoPagina: false },
    { id: 'cierre_financiero', titulo: 'Cierre financiero', visible: true, saltoPagina: false },
    { id: 'cadena_aprobacion', titulo: 'Cadena de aprobación del gasto', visible: true, saltoPagina: false },
    { id: 'bitacora', titulo: 'Bitácora / historial', visible: true, saltoPagina: false },
    {
      id: 'soportes_gasto',
      titulo: 'Soportes del gasto (justificación)',
      visible: true,
      saltoPagina: false,
      modoArchivo: 'Miniaturas',
      maxArchivos: 50
    },
    {
      id: 'adjuntos_legalizacion',
      titulo: 'Archivos de legalización (hoja adicional; solo imágenes/PDF, sin tabla de líneas)',
      visible: true,
      saltoPagina: true,
      modoArchivo: 'Tamaño medio',
      maxArchivos: 50
    }
  ]);

  // MOVER BLOQUE ARRIBA
  const moverArriba = (index) => {
    if (index === 0) return;
    const nuevaLista = [...bloques];
    const temp = nuevaLista[index - 1];
    nuevaLista[index - 1] = nuevaLista[index];
    nuevaLista[index] = temp;
    setBloques(nuevaLista);
  };

  // MOVER BLOQUE ABAJO
  const moverAbajo = (index) => {
    if (index === bloques.length - 1) return;
    const nuevaLista = [...bloques];
    const temp = nuevaLista[index + 1];
    nuevaLista[index + 1] = nuevaLista[index];
    nuevaLista[index] = temp;
    setBloques(nuevaLista);
  };

  // CAMBIAR CHECKBOX VISIBLE O SALTO DE PÁGINA
  const handleCheckboxChange = (index, campo) => {
    const nuevaLista = [...bloques];
    nuevaLista[index][campo] = !nuevaLista[index][campo];
    setBloques(nuevaLista);
  };

  // CAMBIAR SELECTS E INPUTS DE ARCHIVOS
  const handleSelectChange = (index, campo, valor) => {
    const nuevaLista = [...bloques];
    nuevaLista[index][campo] = valor;
    setBloques(nuevaLista);
  };

  // RESTAURAR POR DEFECTO
  const handleRestaurar = () => {
    setBloques([
      { id: 'cabecera', titulo: 'Título y número de registro', visible: true, saltoPagina: false },
      { id: 'organizacion', titulo: 'Nombre y NIT de la organización', visible: true, saltoPagina: false },
      { id: 'resumen_gasto', titulo: 'Resumen del gasto (imputación, monto, proveedor...)', visible: true, saltoPagina: false },
      { id: 'legalizacion_datos', titulo: 'Datos del documento de legalización', visible: true, saltoPagina: false },
      { id: 'revision_auxiliar', titulo: 'Revisión auxiliar', visible: true, saltoPagina: false },
      { id: 'cierre_financiero', titulo: 'Cierre financiero', visible: true, saltoPagina: false },
      { id: 'cadena_aprobacion', titulo: 'Cadena de aprobación del gasto', visible: true, saltoPagina: false },
      { id: 'bitacora', titulo: 'Bitácora / historial', visible: true, saltoPagina: false },
      { id: 'soportes_gasto', titulo: 'Soportes del gasto (justificación)', visible: true, saltoPagina: false, modoArchivo: 'Miniaturas', maxArchivos: 50 },
      { id: 'adjuntos_legalizacion', titulo: 'Archivos de legalización (hoja adicional; solo imágenes/PDF, sin tabla de líneas)', visible: true, saltoPagina: true, modoArchivo: 'Tamaño medio', maxArchivos: 50 }
    ]);
    lanzarToast('Valores predeterminados restaurados.');
  };

  // GUARDAR PLANTILLA
  const handleGuardarPlantilla = () => {
    lanzarToast('Plantilla PDF guardada con éxito.');
  };

  const lanzarToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 4000);
  };

  return (
    <div className="constancia-pdf-container">
      {/* TOAST ALERTA GUARDADO */}
      {toastMsg && (
        <div className="toast-top-banner">
          <div className="toast-content">
            <span className="toast-icon">✓</span>
            <span>{toastMsg}</span>
          </div>
          <button className="toast-close-btn" onClick={() => setToastMsg('')}>✕</button>
        </div>
      )}

      {/* HEADER PRINCIPAL */}
      <div className="dash-section-header">
        <h1>Constancia PDF: gasto legalizado (cierre financiero)</h1>
        <p className="dash-subtitle">
          Defina el orden y la visibilidad de cada bloque de la constancia desde <strong>Gastos → Exportar gasto legalizado</strong>. Los cambios son globales.
        </p>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '4px' }}>
          Nombre y NIT en <strong>Ajustes</strong> (ahora: <strong>Gastos técnicos</strong>).
        </p>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
          Aún no hay plantilla en el servidor; se muestran valores por defecto hasta que guarde.
        </p>
      </div>

      <div className="constancia-grid-layout">
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN DE BLOQUES */}
        <div className="card-bloques-config">
          <div className="bloques-config-header">
            <h3>Bloques de la constancia</h3>
            <button className="btn-restaurar-def" onClick={handleRestaurar}>
              Restaurar por defecto
            </button>
          </div>

          <div className="lista-bloques-wrapper">
            {bloques.map((b, idx) => (
              <div key={b.id} className="card-item-bloque">
                <div className="bloque-top-row">
                  <label className="chk-title-label">
                    <input
                      type="checkbox"
                      checked={b.visible}
                      onChange={() => handleCheckboxChange(idx, 'visible')}
                    />
                    <div>
                      <strong>{b.titulo}</strong>
                      <div className="bloque-id-sub">{b.id}</div>
                    </div>
                  </label>

                  <div className="btn-group-up-down">
                    <button
                      className="btn-move"
                      disabled={idx === 0}
                      onClick={() => moverArriba(idx)}
                    >
                      Subir
                    </button>
                    <button
                      className="btn-move"
                      disabled={idx === bloques.length - 1}
                      onClick={() => moverAbajo(idx)}
                    >
                      Bajar
                    </button>
                  </div>
                </div>

                <div className="bloque-sub-option">
                  <label className="chk-sub-label">
                    <input
                      type="checkbox"
                      checked={b.saltoPagina}
                      onChange={() => handleCheckboxChange(idx, 'saltoPagina')}
                    />
                    <span>Forzar salto de página <em>antes</em> de este bloque al imprimir o guardar como PDF.</span>
                  </label>
                </div>

                {/* OPCIONES ADICIONALES PARA ARCHIVOS */}
                {(b.id === 'soportes_gasto' || b.id === 'adjuntos_legalizacion') && (
                  <div className="grid-2-cols" style={{ marginTop: '12px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '0.8rem', color: '#6b7280' }}>Cómo mostrar los archivos</label>
                      <select
                        value={b.modoArchivo}
                        onChange={(e) => handleSelectChange(idx, 'modoArchivo', e.target.value)}
                        className="select-custom-pdf"
                      >
                        <option value="Miniaturas">Miniaturas</option>
                        <option value="Tamaño medio">Tamaño medio</option>
                        <option value="Lista detallada">Lista detallada</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label style={{ fontSize: '0.8rem', color: '#6b7280' }}>Máximo de archivos</label>
                      <input
                        type="number"
                        value={b.maxArchivos}
                        onChange={(e) => handleSelectChange(idx, 'maxArchivos', e.target.value)}
                        className="input-custom-sla"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className="btn-guardar-ajustes-green" onClick={handleGuardarPlantilla}>
              Guardar plantilla
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: VISTA PREVIA DEL DOCUMENTO PDF */}
        <div className="card-preview-pdf-sticky">
          <h3>Vista previa</h3>
          <p className="dash-subtitle" style={{ fontSize: '0.8rem', marginBottom: '16px' }}>
            Gasto ficticio con la plantilla <strong>actual del formulario</strong> (sin guardar). Adjuntos simulados para ver orden, saltos de página y modo visual.
          </p>

          <div className="box-documento-pdf-preview">
            <h4 className="title-doc-dian">
              DOCUMENTO SOPORTE EN ADQUISICIONES EFECTUADAS A NO OBLIGADOS A FACTURAR
            </h4>

            <div className="table-doc-header-grid">
              <div className="col-doc-left">
                <strong>ADQUIRIENTE Y DATOS DEL DOCUMENTO</strong>
                <p className="p-doc-item">
                  <span>Número consecutivo de documento</span><br />
                  <strong>DS-2026-000001</strong>
                </p>
                <p className="p-doc-item">
                  <span>CUDS y # de resolución física con rango y vigencia</span><br />
                  Resolución DIAN de ejemplo • rango 1–999999 • vigencia 2026
                </p>
                <p className="p-doc-item">
                  <span>Fecha de generación del documento soporte</span><br />
                  15 de ene de 2026
                </p>
                <p className="p-doc-item">
                  <span>Fecha de operación</span><br />
                  14 de ene de 2026
                </p>
                <p className="p-doc-item">
                  <span>Nombre completo o razón social del adquiriente</span><br />
                  —
                </p>
                <p className="p-doc-item">
                  <span>NIT del adquiriente</span><br />
                  —
                </p>
                <p className="p-doc-item">
                  <span>Dirección del adquiriente</span><br />
                  —
                </p>
              </div>

              <div className="col-doc-right">
                <strong>PROVEEDOR</strong>
                <p className="p-doc-item">
                  <span>Nombre o razón social</span><br />
                  <span className="text-green-doc">Empresa facturante de ejemplo</span>
                </p>
                <p className="p-doc-item">
                  <span>NIT o cédula</span><br />
                  <span className="text-green-doc">900.123.456-7</span>
                </p>
                <p className="p-doc-item">
                  <span>Dirección</span><br />
                  <span className="text-green-doc">Carrera 7 # 12-34, Bogotá</span>
                </p>
                <p className="p-doc-item">
                  <span>Coordenadas (WGS84)</span><br />
                  <strong className="text-green-doc">4.609710, -74.081750</strong> <a href="#map" className="link-mapa">Ver en mapa</a>
                </p>
                <p className="p-doc-item">
                  <span>Teléfono o contacto</span><br />
                  <span className="text-green-doc">+57 300 123 4567</span>
                </p>
                <p className="p-doc-item">
                  <span>Correo electrónico</span><br />
                  <span className="text-green-doc">facturacion@ejemplo.com</span>
                </p>
              </div>
            </div>

            {/* TABLA DE DETALLE DE ADQUISICIÓN */}
            <div style={{ marginTop: '20px' }}>
              <h5 className="title-sub-doc">Detalle de adquisición o servicio</h5>
              <table className="tabla-doc-items">
                <thead>
                  <tr>
                    <th>Unidades</th>
                    <th>Descripción de adquisición o servicio</th>
                    <th style={{ textAlign: 'right' }}>Precio unitario</th>
                    <th style={{ textAlign: 'right' }}>Precio total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>Materiales de instalación</td>
                    <td style={{ textAlign: 'right' }}>$ 45.000</td>
                    <td style={{ textAlign: 'right' }}>$ 90.000</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Servicio de transporte</td>
                    <td style={{ textAlign: 'right' }}>$ 35.000</td>
                    <td style={{ textAlign: 'right' }}>$ 35.000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'right' }}><strong>Subtotal</strong></td>
                    <td style={{ textAlign: 'right' }}><strong>$ 125.000</strong></td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'right' }}>Retención en la fuente ICA (0,966%)</td>
                    <td style={{ textAlign: 'right' }}>$ 1.208</td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'right' }}>Retención en la fuente por renta (2,5%)</td>
                    <td style={{ textAlign: 'right' }}>$ 3.125</td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'right' }}>IVA (19%)</td>
                    <td style={{ textAlign: 'right' }}>$ 23.750</td>
                  </tr>
                  <tr className="tr-total-green">
                    <td colSpan="3" style={{ textAlign: 'right' }}><strong>Total</strong></td>
                    <td style={{ textAlign: 'right' }}><strong>$ 144.417</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* CUADROS DE FIRMAS */}
            <div className="grid-firmas-doc" style={{ marginTop: '20px' }}>
              <div className="box-firma">
                <strong>Preparado por</strong>
                <span className="sub-firma-text">(recuerde incluir la firma del emisor del documento soporte al momento de la generación, de acuerdo con las normas vigentes y con la política de firma de la Dian):</span>
              </div>
              <div className="box-firma">
                <strong>Revisado por:</strong>
              </div>
              <div className="box-firma">
                <strong>Aprobado por:</strong>
              </div>
              <div className="box-firma">
                <strong>Contabilizado y transmitido</strong>
                <span className="sub-firma-text">(los sujetos que me me me que me aporten sus operaciones con este documento deberán transmitirlo a la Dian, con la información y el contenido completo en los términos, condiciones, mecanismos técnicos y tecnológicos establecidos por dicha entidad):</span>
              </div>
            </div>

            {/* SOPORTES VISUALES */}
            <div style={{ marginTop: '20px' }}>
              <h5 className="title-sub-doc">Soportes visuales de legalización</h5>
              <p className="dash-subtitle" style={{ fontSize: '0.78rem', marginBottom: '10px' }}>
                Simulación: vista aproximada del modo elegido; los archivos reales vienen del gasto exportado.
              </p>
              <div className="grid-adjuntos-simulados">
                <div className="card-adjunto-box">
                  <div className="dummy-img-box"></div>
                  <span>factura-legalizacion.pdf</span>
                  <small>Documento de legalización</small>
                </div>
                <div className="card-adjunto-box">
                  <div className="dummy-img-box"></div>
                  <span>evidencia-ejecucion-campo.jpg</span>
                  <small>Evidencia en campo</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConstanciaPDF;
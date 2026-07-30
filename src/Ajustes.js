import React, { useState } from 'react';

function Ajustes({ onVolver }) {
  const [logoPreview, setLogoPreview] = useState(null);
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // Estados de formularios
  const [formAjustes, setFormAjustes] = useState({
    nombreApp: 'Gastos técnicos',
    nit: '',
    razonSocialDian: '',
    nitDian: '',
    direccionDian: '',
    colorAcento: '#2dbe60',
    colorBloques: '#0d9488',
    otpSms: false,
    camaraTecnico: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormAjustes({
      ...formAjustes,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArchivoImagen(file);
    }
  };

  // Subir logo
  const handleSubirLogo = () => {
    if (!archivoImagen) {
      alert('Seleccione un archivo de imagen primero.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target.result);
      lanzarToast('Cambios guardados.');
    };
    reader.readAsDataURL(archivoImagen);
  };

  // Guardar ajustes
  const handleGuardarAjustes = (e) => {
    e.preventDefault();
    lanzarToast('Cambios guardados.');
  };

  const lanzarToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 4000);
  };

  return (
    <div className="ajustes-container">
      {/* ALERTA TOAST FLOTANTE SUPERIOR */}
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
        <h1>Ajustes — marca corporativa</h1>
        <p className="dash-subtitle">
          Nombre de la aplicación, logo, identificación tributaria y colores de la PWA técnica. Se reflejan en login, cabeceras y documentos PDF.
        </p>
      </div>

      <div className="ajustes-grid-layout">
        {/* COLUMNA IZQUIERDA: LOGO CORPORATIVO */}
        <div className="card-ajustes-left">
          <h3>Logo corporativo</h3>
          <p className="ajustes-info-text">
            PNG, JPEG, WebP, GIF o SVG - máximo 2 MB. Visible en login y plantillas PDF.
          </p>

          <div className="box-preview-logo">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo corporativo" className="img-logo-preview" />
            ) : (
              <span className="text-sin-logo">Sin logo cargado</span>
            )}
          </div>

          <div className="form-group-file" style={{ marginTop: '16px' }}>
            <label>Archivo de imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input-file-custom"
            />
          </div>

          <button className="btn-subir-logo" onClick={handleSubirLogo}>
            Subir logo
          </button>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO GENERAL */}
        <div className="card-ajustes-right">
          <form onSubmit={handleGuardarAjustes}>
            <h3>Identidad y colores PWA técnico</h3>

            <div className="grid-2-cols" style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label>Nombre de la aplicación / organización</label>
                <input
                  type="text"
                  name="nombreApp"
                  value={formAjustes.nombreApp}
                  onChange={handleInputChange}
                  className="input-custom-sla"
                />
              </div>

              <div className="form-group">
                <label>NIT (opcional)</label>
                <input
                  type="text"
                  name="nit"
                  value={formAjustes.nit}
                  onChange={handleInputChange}
                  className="input-custom-sla"
                />
              </div>
            </div>

            {/* SECCIÓN DOCUMENTO SOPORTE DIAN */}
            <div className="seccion-sub-ajustes">
              <h4 className="title-sub-ajustes">Documento soporte DIAN — adquiriente</h4>
              <p className="ajustes-info-text">
                Datos del adquiriente en el PDF DIAN. Consecutivo, CUDS y fecha los registra el auxiliar financiero por gasto legalizado.
              </p>

              <div className="grid-2-cols" style={{ marginTop: '12px' }}>
                <div className="form-group">
                  <label>Nombre o razón social</label>
                  <input
                    type="text"
                    name="razonSocialDian"
                    value={formAjustes.razonSocialDian}
                    onChange={handleInputChange}
                    className="input-custom-sla"
                  />
                </div>

                <div className="form-group">
                  <label>NIT del adquiriente</label>
                  <input
                    type="text"
                    name="nitDian"
                    value={formAjustes.nitDian}
                    onChange={handleInputChange}
                    className="input-custom-sla"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Dirección del adquiriente (PDF)</label>
                <textarea
                  name="direccionDian"
                  rows="3"
                  placeholder="Ej. Calle, ciudad, departamento"
                  value={formAjustes.direccionDian}
                  onChange={handleInputChange}
                  className="textarea-custom"
                ></textarea>
              </div>
            </div>

            {/* SECCIÓN COLORES DEL TEMA */}
            <div className="seccion-sub-ajustes">
              <h4 className="title-sub-ajustes">Colores del tema</h4>
              <p className="ajustes-info-text">
                Formato <strong>#RRGGBB</strong> o <strong>#RGB</strong>. Vacío restaura el color predeterminado.
              </p>

              <div className="grid-2-cols" style={{ marginTop: '12px' }}>
                <div className="form-group">
                  <label>Color acento (PWA técnico y login)</label>
                  <div className="color-input-wrap">
                    <input
                      type="text"
                      name="colorAcento"
                      value={formAjustes.colorAcento}
                      onChange={handleInputChange}
                      className="input-custom-sla"
                    />
                    <span className="color-preview-badge" style={{ backgroundColor: formAjustes.colorAcento }}></span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Color bloques tipo legalización</label>
                  <div className="color-input-wrap">
                    <input
                      type="text"
                      name="colorBloques"
                      value={formAjustes.colorBloques}
                      onChange={handleInputChange}
                      className="input-custom-sla"
                    />
                    <span className="color-preview-badge" style={{ backgroundColor: formAjustes.colorBloques }}></span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN OPCIONES DE ACCESO Y ADJUNTOS */}
            <div className="seccion-sub-ajustes">
              <h4 className="title-sub-ajustes">Opciones de acceso y adjuntos</h4>

              <div className="box-option-card">
                <input
                  type="checkbox"
                  id="chkOtpSms"
                  name="otpSms"
                  checked={formAjustes.otpSms}
                  onChange={handleInputChange}
                />
                <label htmlFor="chkOtpSms">
                  <strong>Código de ingreso por SMS</strong> — tras cédula y contraseña, envía un código de 6 dígitos al celular del usuario. Requiere Twilio en el servidor o <code>LOGIN_OTP_BYPASS_SMS=true</code> solo en desarrollo.
                </label>
              </div>

              <div className="box-option-card" style={{ marginTop: '10px' }}>
                <input
                  type="checkbox"
                  id="chkCamaraTecnico"
                  name="camaraTecnico"
                  checked={formAjustes.camaraTecnico}
                  onChange={handleInputChange}
                />
                <label htmlFor="chkCamaraTecnico">
                  <strong>Cámara en adjuntos del técnico</strong> — permite tomar fotos al cargar soportes y legalización (además de archivo o galería). Recomendado <strong>HTTPS</strong> en móvil.
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button type="submit" className="btn-guardar-ajustes-green">
                Guardar ajustes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ajustes;
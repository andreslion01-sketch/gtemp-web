import React, { useState } from 'react';

function RegistroGasto({ onVolver }) {
  const [formData, setFormData] = useState({
    concepto: '',
    monto: '',
    centroCosto: '',
    fecha: '',
    observaciones: ''
  });

  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Límite de tamaño: 5 MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  // Mime types permitidos para evidencias (Imágenes y PDFs)
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validaciones de Ciberseguridad para Subida de Archivos
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');

    if (!selectedFile) return;

    // 1. Validación de Extensión / MIME Type
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Tipo de archivo no permitido. Solo se aceptan PDF, JPG y PNG.');
      e.target.value = '';
      setArchivo(null);
      return;
    }

    // 2. Control de Tamaño Máximo (Previene Denegación de Servicio - DoS)
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('El archivo excede el tamaño máximo permitido de 5 MB.');
      e.target.value = '';
      setArchivo(null);
      return;
    }

    setArchivo(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    // Validaciones de Campos Obligatorios
    if (!formData.concepto || !formData.monto || !formData.centroCosto || !formData.fecha) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Validar monto numérico positivo
    if (parseFloat(formData.monto) <= 0 || isNaN(formData.monto)) {
      setError('Ingrese un monto válido mayor a 0.');
      return;
    }

    if (!archivo) {
      setError('Es obligatorio adjuntar la factura o soporte digital.');
      return;
    }

    // Proceso exitoso simulado
    setExito('Gasto registrado con éxito y enviado a la cadena de aprobación.');
    setFormData({ concepto: '', monto: '', centroCosto: '', fecha: '', observaciones: '' });
    setArchivo(null);
  };

  return (
    <div className="form-gasto-container">
      <div className="form-header">
        <button onClick={onVolver} className="btn-back">← Volver al panel</button>
        <h2>Registrar Nuevo Gasto de Campo</h2>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {exito && <div className="success-banner">{exito}</div>}

      <form onSubmit={handleSubmit} className="gasto-form">
        <div className="form-group">
          <label htmlFor="concepto">Concepto del Gasto *</label>
          <input
            type="text"
            id="concepto"
            name="concepto"
            placeholder="Ej: Alimentación en sitio / Transporte técnico"
            value={formData.concepto}
            onChange={handleInputChange}
            maxLength={100}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="monto">Monto (COP) *</label>
            <input
              type="number"
              id="monto"
              name="monto"
              placeholder="0.00"
              value={formData.monto}
              onChange={handleInputChange}
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="centroCosto">Centro de Costo / Proyecto *</label>
            <select
              id="centroCosto"
              name="centroCosto"
              value={formData.centroCosto}
              onChange={handleInputChange}
            >
              <option value="">Seleccione un centro de costo...</option>
              <option value="CC-101">Proyecto San Francisco (CC-101)</option>
              <option value="CC-102">Proyecto Doña Juana (CC-102)</option>
              <option value="CC-103">Mantenimiento General (CC-103)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha del Comprobante *</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="soporte">Soporte Digital (PDF, PNG, JPG - Máx 5MB) *</label>
          <input
            type="file"
            id="soporte"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
          {archivo && <small className="file-info">Archivo seleccionado: {archivo.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="observaciones">Observaciones / Justificación</label>
          <textarea
            id="observaciones"
            name="observaciones"
            rows="3"
            placeholder="Detalles adicionales sobre el gasto..."
            value={formData.observaciones}
            onChange={handleInputChange}
            maxLength={300}
          ></textarea>
        </div>

        <button type="submit" className="btn-submit">
          Guardar y Enviar a Aprobación
        </button>
      </form>
    </div>
  );
}

export default RegistroGasto;
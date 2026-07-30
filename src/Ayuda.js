import React, { useState } from 'react';

function Ayuda({ onNavegar }) {
  const [desplegados, setDesplegados] = useState({});

  const toggleDesplegable = (id) => {
    setDesplegados((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="ayuda-container" style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* TARJETA SUPERIOR ROL */}
      <div className="card-ayuda-header">
        <span className="badge-ayuda-role">TU ROL</span>
        <h2>Administrador</h2>
        <p className="ayuda-subtitle-bold">
          Configuras maestros y ves al equipo completo en web; el alta en campo la hace el técnico.
        </p>

        <p className="dash-subtitle" style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
          Empieza por cómo está ordenada la página; luego pasos, mapas visuales y atajos si te atascas.
        </p>

        <div className="btn-group-atajos">
          <button className="btn-atajo" onClick={() => scrollToSection('sec-maestros')}>
            Maestros
          </button>
          <button className="btn-atajo" onClick={() => scrollToSection('sec-vista-global')}>
            Vista global
          </button>
          <button className="btn-atajo" onClick={() => scrollToSection('sec-rechazos')}>
            Rechazos: reglas en infografía
          </button>
        </div>
      </div>

      {/* CÓMO ESTÁ ARMADA ESTA AYUDA */}
      <div className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <h3>Cómo está armada esta ayuda</h3>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', marginBottom: '16px' }}>
          Tres capas visibles más un manual al final: así reduces saltos al azar y sabes dónde mirar primero.
        </p>

        <div className="ayuda-item-row">
          <strong>Pasos con el mismo lenguaje que la app</strong>
          <p>Los verbos y etiquetas coinciden con botones y menús. Así trabajas por reconocimiento: menos memorizar y menos errores al ejecutar.</p>
        </div>

        <div className="ayuda-item-row">
          <strong>Diagramas y mini-pantallas después</strong>
          <p>Repiten la misma historia en formato visual. Cuando texto y esquema dicen lo mismo de forma coherente, suele entenderse mejor el flujo.</p>
        </div>

        <div className="ayuda-item-row">
          <strong>Manual largo al final, colapsado</strong>
          <p>La guía extensa solo aparece si la abres: así la primera lectura no satura la memoria de trabajo.</p>
        </div>
      </div>

      {/* CAPA 1 - ACCIÓN */}
      <div className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <span className="capa-tag">CAPA 1 · ACCIÓN</span>
        <h3 style={{ marginTop: '4px' }}>Qué hacer en la app</h3>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', marginBottom: '16px' }}>
          Orden habitual. Nombres igual que en pantalla.
        </p>

        <div className="lista-pasos-num">
          <div className="paso-num-item">
            <span className="badge-num">1</span>
            <div>En modo web usa la pestaña <strong>Administración: Resumen, Proyectos, Usuarios, Ajustes</strong>, según lo que debas mantener.</div>
          </div>
          <div className="paso-num-item">
            <span className="badge-num">2</span>
            <div>El registro en campo es del <strong>técnico</strong>; tú defines proyectos, centros, usuarios y parámetros.</div>
          </div>
          <div id="sec-vista-global" className="paso-num-item">
            <span className="badge-num">3</span>
            <div>Para ver todo el equipo y riesgos, parte del <strong>Resumen</strong> y enlaces de informes globales.</div>
          </div>
          <div className="paso-num-item">
            <span className="badge-num">4</span>
            <div>Si tu usuario tiene paso en cadena, actúas desde el detalle del gasto o vistas de aprobación como cualquier aprobador.</div>
          </div>
        </div>
      </div>

      {/* CAPA 2 - MAPA Y REFERENCIA VISUAL EXACTA */}
      <div id="sec-maestros" className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <span className="capa-tag">CAPA 2 · MAPA</span>
        <h3 style={{ marginTop: '4px' }}>Referencia visual del sistema</h3>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', marginBottom: '20px' }}>
          Misma lógica que los pasos de arriba: flujo del gasto, módulos, rechazos y tu barra o modo web. Úsala si razonas mejor con diagramas.
        </p>

        {/* CONTENEDOR BLANCO DEL DIAGRAMA COMPLETO */}
        <div className="diagrama-canvas-exact">
          
          {/* BLOQUE 1: CICLO DEL GASTO Y MODO WEB */}
          <div className="diag-section">
            <h4 className="diag-h4">Ciclo del gasto en GTEMP</h4>
            
            <div className="diag-ciclo-row">
              <span className="diag-pill p-gray">Borrador</span>
              <span className="diag-arrow-line">—</span>
              <span className="diag-pill p-light-green">Cadena</span>
              <span className="diag-arrow-line">—</span>
              <span className="diag-pill p-mid-green">Autorizado</span>
              <span className="diag-arrow-line">—</span>
              <span className="diag-pill p-teal">Legalización</span>
            </div>
            
            <p className="diag-subtext">
              Cadena = aprobaciones · Legalización = cierre contable
            </p>

            <div className="diag-dual-cols">
              <div className="diag-col">
                <h5>Modo web • pestaña Administración</h5>
                <div className="diag-mock-tab-bar">
                  <span className="tab-pill-gtemp">GTEMP</span>
                  <span className="tab-pill-blank"></span>
                  <span className="tab-pill-blank"></span>
                  <span className="tab-pill-blank"></span>
                  <span className="tab-pill-blank"></span>
                </div>
              </div>

              <div className="diag-col">
                <h5>Tu foco en una mirada</h5>
                <div className="diag-oval-row">
                  <span className="oval-btn oval-solid-green">Maestros</span>
                  <span className="oval-btn oval-outline">Todo el equipo</span>
                  <span className="oval-btn oval-outline">Informes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="diag-divider-dashed"></div>

          {/* BLOQUE 2: LA APP EN 6 ACCESOS */}
          <div className="diag-section text-center">
            <h4 className="diag-h4">La app en 6 accesos</h4>

            <div className="grid-6-accesos">
              <div className="card-acceso">
                <strong>Inicio</strong>
                <small>hub</small>
              </div>
              <div className="card-acceso">
                <strong>Gastos</strong>
                <small>lista + FAB</small>
              </div>
              <div className="card-acceso">
                <strong>Cadena</strong>
                <small>pendientes</small>
              </div>
              <div className="card-acceso">
                <strong>Legaliz.</strong>
                <small>tras autorizado</small>
              </div>
              <div className="card-acceso">
                <strong>Reportes</strong>
                <small>constancias</small>
              </div>
              <div className="card-acceso">
                <strong>Ajustes</strong>
                <small>cuenta</small>
              </div>
            </div>

            <p className="diag-subtext" style={{ marginTop: '12px' }}>
              Menú ☰ = ayuda - cerrar sesión
            </p>
          </div>

          <div className="diag-divider-dashed"></div>

          {/* BLOQUE 3: RECHAZOS (ÁRBOL Y FLUJO HORIZONTAL) */}
          <div id="sec-rechazos" className="diag-dual-cols align-top">
            
            {/* ÁRBOL DE RECHAZO EN CADENA */}
            <div className="diag-col">
              <h4 className="diag-h4 left-align">Rechazo en la cadena del gasto</h4>

              <div className="tree-container">
                <div className="tree-node node-white top-node">
                  <strong>Tu turno en cadena</strong>
                </div>

                <div className="tree-lines-fork">
                  <div className="line-fork-left"></div>
                  <div className="line-fork-right"></div>
                </div>

                <div className="tree-row">
                  <div className="tree-node node-green">
                    <strong>Aprobar paso</strong>
                  </div>
                  <div className="tree-node node-orange-light">
                    <strong>Rechazar + motivo</strong>
                  </div>
                </div>

                <div className="tree-row-labels">
                  <span className="txt-label-green">Sigue la cadena →</span>
                  <span className="txt-label-orange">Obligatorio escribir por qué</span>
                </div>

                <div className="tree-row">
                  <div className="tree-node node-yellow-box">
                    <strong>Rechaza coordinador</strong>
                  </div>
                  <div className="tree-node node-yellow-box">
                    <strong>Rechaza gerente, director o financiero</strong>
                  </div>
                </div>

                <div className="tree-row-footer">
                  <div>
                    <strong>Baja al técnico</strong>
                    <small>Reabre • reenvía</small>
                  </div>
                  <div>
                    <strong>Baja un perfil</strong>
                    <small>Reaprueba • sube otra vez</small>
                  </div>
                </div>
              </div>
            </div>

            {/* FLUJO RECHAZO DE ENVÍO DE LEGALIZACIÓN */}
            <div className="diag-col">
              <h4 className="diag-h4 left-align">Rechazo del envío de legalización</h4>

              <div className="flow-legaliz-row">
                <div className="flow-box box-simple">
                  <strong>Autorizado</strong>
                  <small>fin cadena gasto</small>
                </div>
                <div className="flow-box box-simple">
                  <strong>Envío legaliz.</strong>
                  <small>paquete</small>
                </div>
                <div className="flow-box box-yellow">
                  <strong>Rechazo</strong>
                  <small>motivo</small>
                </div>
                <div className="flow-box box-simple">
                  <strong>Técnico</strong>
                  <small>corrige • reenvía</small>
                </div>
              </div>

              <p className="diag-subtext left-align" style={{ marginTop: '16px' }}>
                La observación queda en el detalle del gasto
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ATAJOS */}
      <div className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <h3>¿Te atascaste? Salta al paso</h3>
        <p className="dash-subtitle" style={{ fontSize: '0.82rem', marginBottom: '16px' }}>
          Enlaces directos a un paso concreto; evitan releer todo si ya sabes qué te pasa.
        </p>

        <div className="lista-atajos-box">
          <div className="item-salto" onClick={() => onNavegar && onNavegar('usuarios')}>
            <span>¿Quién registra gastos en campo?</span>
            <span>→</span>
          </div>
          <div className="item-salto" onClick={() => onNavegar && onNavegar('proyectos')}>
            <span>Maestros, proyectos o usuarios</span>
            <span>→</span>
          </div>
          <div className="item-salto" onClick={() => onNavegar && onNavegar('aprobaciones')}>
            <span>Tengo paso en cadena</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* CAPA 3 - PANTALLAS */}
      <div className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <span className="capa-tag">CAPA 3 · PANTALLAS</span>
        <h3 style={{ marginTop: '4px' }}>Navegación e instructivo por pantallas</h3>

        <div className="carrusel-pantallas-bar" style={{ marginTop: '16px' }}>
          <div className="carrusel-track">
            <div className="card-p-carrusel" onClick={() => scrollToSection('p-inicio')}>
              <span className="icon-p">🏠</span>
              <strong>Inicio (hub administrativo)</strong>
            </div>
            <div className="card-p-carrusel" onClick={() => scrollToSection('p-resumen')}>
              <span className="icon-p">📊</span>
              <strong>Resumen administrativo</strong>
            </div>
            <div className="card-p-carrusel" onClick={() => scrollToSection('p-gastos')}>
              <span className="icon-p">📋</span>
              <strong>Gastos (supervisión global)</strong>
            </div>
            <div className="card-p-carrusel" onClick={() => scrollToSection('p-dinero')}>
              <span className="icon-p">📈</span>
              <strong>Tablero del dinero</strong>
            </div>
            <div className="card-p-carrusel" onClick={() => scrollToSection('p-maestros')}>
              <span className="icon-p">👥</span>
              <strong>Maestros (usuarios/proyectos)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* GUÍAS DETALLADAS DESPLEGABLES */}
      <div id="p-inicio" className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <h3>Funciones y alcance</h3>
        <div className="pills-tags-row" style={{ marginTop: '10px' }}>
          <span className="pill-tag-green">Configuras maestros, reglas y organización.</span>
          <span className="pill-tag-green">Ves todo el equipo en reportes; el alta en campo es del técnico.</span>
          <span className="pill-tag-green">Actúas en cadena solo si tu usuario tiene ese paso.</span>
        </div>

        <div className="acordeon-guia" style={{ marginTop: '16px' }}>
          <div
            className="acordeon-header"
            onClick={() => toggleDesplegable('guia1')}
          >
            <span>💡 <strong>Guía detallada</strong></span>
            <span className="sub-acordeon-lbl">Manual opcional · lectura larga</span>
          </div>

          {desplegados['guia1'] && (
            <div className="acordeon-body">
              <p>
                Como administrador del sistema, posees control total para estructurar la jerarquía organizacional. Puedes asignar usuarios a centros de costos específicos, definir cuáles técnicos pertenecen a cada proyecto y parametrizar los límites de gastos aprobados antes de activar las alertas automáticas.
              </p>
            </div>
          )}
        </div>
      </div>

      <div id="p-resumen" className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <h3>Pantalla: Resumen administrativo</h3>
        <div className="preview-mock-window" style={{ marginTop: '12px' }}>
          <div className="mock-title-bar">GTEMP • /admin/resumen</div>
          <div className="mock-body">
            <span className="pill-tag-green">KPIs y accesos directos.</span>
            <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#6b7280' }}>Pestaña Administración.</p>
          </div>
        </div>

        <div className="acordeon-guia" style={{ marginTop: '16px' }}>
          <div
            className="acordeon-header"
            onClick={() => toggleDesplegable('guia2')}
          >
            <span>💡 <strong>Guía detallada</strong></span>
            <span className="sub-acordeon-lbl">Manual opcional · lectura larga</span>
          </div>

          {desplegados['guia2'] && (
            <div className="acordeon-body">
              <p>
                Esta pantalla consolida los indicadores clave de rendimiento (KPIs) en tiempo real, permitiéndote identificar desviaciones en el presupuesto global, solicitudes atascadas en la cadena de aprobación y gastos con alertas de riesgo activadas.
              </p>
            </div>
          )}
        </div>
      </div>

      <div id="p-gastos" className="card-ayuda-box" style={{ marginTop: '20px' }}>
        <h3>Pantalla: Gastos (supervisión global)</h3>
        <div className="preview-mock-window" style={{ marginTop: '12px' }}>
          <div className="mock-title-bar">GTEMP • /gastos</div>
          <div className="mock-body">
            <span className="pill-tag-green">Todo el equipo • sin editar borradores ajenos.</span>
            <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#6b7280' }}>Vista global.</p>
          </div>
        </div>

        <div className="acordeon-guia" style={{ marginTop: '16px' }}>
          <div
            className="acordeon-header"
            onClick={() => toggleDesplegable('guia3')}
          >
            <span>💡 <strong>Guía detallada</strong></span>
            <span className="sub-acordeon-lbl">Manual opcional · lectura larga</span>
          </div>

          {desplegados['guia3'] && (
            <div className="acordeon-body">
              <p>
                Muestra el historial completo de transacciones enviadas por los técnicos de campo. Permite filtrar por rango de fechas, tipo de gasto, proyecto o estado actual (Borrador, En cadena, Legalizado o Rechazado).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ayuda;
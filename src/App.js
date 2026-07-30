import React, { useState } from 'react';
import './App.css';
import RegistroGasto from './RegistroGasto';
import Aprobaciones from './Aprobaciones';
import CadenaAprobacion from './CadenaAprobacion';
import Reportes from './Reportes';
import Dinero from './Dinero';
import Usuarios from './Usuarios';
import DashboardAdmin from './DashboardAdmin';
import TiposGasto from './TiposGasto';
import TiposConsignacion from './TiposConsignacion';
import CentrosCosto from './CentrosCosto';
import Proyectos from './Proyectos';
import Sitios from './Sitios';
import Ajustes from './Ajustes';
import Tickets from './Tickets';
import ConstanciaPDF from './ConstanciaPDF';
import Ayuda from './Ayuda';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('Administrador');
  const [credentials, setCredentials] = useState({ cedula: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  
  const [vistaActual, setVistaActual] = useState('dashboard-admin');
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!credentials.cedula || !credentials.password) {
      setErrorMsg('Todos los campos son obligatorios.');
      return;
    }
    
    if (!/^\d{7,10}$/.test(credentials.cedula)) {
      setErrorMsg('Ingrese un número de cédula válido.');
      return;
    }

    setErrorMsg('');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ cedula: '', password: '' });
    setVistaActual('dashboard-admin');
  };

  const getHeaderTitle = () => {
    switch (vistaActual) {
      case 'cadena-aprobacion': return 'Cadena de aprobación';
      case 'aprobaciones': return 'Aprobaciones';
      case 'tipos-gasto': return 'Tipos de gasto';
      case 'tipos-consignacion': return 'Tipos de consignación';
      case 'usuarios': return 'Usuarios';
      case 'centros-costo': return 'Centros de costo';
      case 'proyectos': return 'Proyectos';
      case 'sitios': return 'Sitios de trabajo';
      case 'reportes': return 'Legalización / riesgo';
      case 'ajustes': return 'Ajustes';
      case 'tickets': return 'Administración';
      case 'constancia-pdf': return 'Constancia PDF (legalizado)';
      case 'ayuda': return 'Ayuda e instrucciones de uso';
      case 'dinero': return 'Tablero del dinero';
      case 'registro-gasto': return 'Gastos';
      default: return 'Gastos técnicos';
    }
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <div className="login-wrapper">
          <div className="login-header">
            <h2>Gastos técnicos</h2>
            <h1>Acceso seguro</h1>
            <p>En Gastos técnicos, centralice y proteja la información de gastos de campo.</p>
          </div>

          <div className="login-card">
            <h3>Iniciar sesión</h3>
            {errorMsg && <div className="error-banner">{errorMsg}</div>}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="cedula">Cédula</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Ingrese su cédula"
                  value={credentials.cedula}
                  onChange={handleChange}
                  autoComplete="off"
                  maxLength={10}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  value={credentials.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn-submit">Entrar</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="dashboard-wrapper">
          {/* NAV BAR SUPERIOR PRINCIPAL */}
          <nav className="navbar">
            <div className="nav-left">
              <div className="nav-brand">
                <strong><em>GTEMP</em></strong> <span>{getHeaderTitle()}</span>
              </div>
            </div>

            <div className="nav-menu">
              <a 
                href="#dashboard" 
                className={vistaActual === 'dashboard-admin' ? 'nav-active' : ''} 
                onClick={() => setVistaActual('dashboard-admin')}
              >
                Dashboard
              </a>
              <a href="#gastos" onClick={() => setVistaActual('registro-gasto')}>Gastos</a>
              <a 
                href="#cadena-aprobacion" 
                className={vistaActual === 'cadena-aprobacion' ? 'nav-active' : ''} 
                onClick={() => setVistaActual('cadena-aprobacion')}
              >
                Aprobaciones
              </a>
              <a href="#dinero" onClick={() => setVistaActual('dinero')}>Dinero</a>
              <a 
                href="#tickets" 
                className={vistaActual === 'tickets' ? 'nav-active' : ''} 
                onClick={() => setVistaActual('tickets')}
              >
                Tickets
              </a>
              <a 
                href="#ayuda"
                className={vistaActual === 'ayuda' ? 'nav-active' : ''} 
                onClick={() => setVistaActual('ayuda')}
              >
                Ayuda
              </a>
            </div>

            <div className="nav-right">
              <button 
                className="btn-icon-bell" 
                onClick={() => setMostrarNotificaciones(!mostrarNotificaciones)}
                title="Notificaciones"
              >
                🔔
              </button>
              <span className="badge-role">{userRole}</span>
              <button onClick={() => setVistaActual('inicio')} className="btn-nav-action">Inicio</button>
              <button onClick={handleLogout} className="btn-nav-action">Salir</button>
            </div>
          </nav>

          <div className="sub-header-user">
            - Administrador
          </div>

          {/* BARRA DE PESTAÑAS RÁPIDAS ADMINISTRATIVAS */}
          <div className="quick-tabs-bar">
            <div className="quick-tabs">
              <button 
                className={`qtab ${vistaActual === 'dashboard-admin' ? 'qtab-active' : ''}`} 
                onClick={() => setVistaActual('dashboard-admin')}
              >
                Tablero
              </button>
              <button 
                className={`qtab ${vistaActual === 'tipos-gasto' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('tipos-gasto')}
              >
                Tipos de gasto
              </button>
              <button 
                className={`qtab ${vistaActual === 'tipos-consignacion' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('tipos-consignacion')}
              >
                Tipos consignación
              </button>
              <button 
                className={`qtab ${vistaActual === 'usuarios' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('usuarios')}
              >
                Usuarios
              </button>
              <button 
                className={`qtab ${vistaActual === 'centros-costo' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('centros-costo')}
              >
                Centros de costo
              </button>
              <button 
                className={`qtab ${vistaActual === 'proyectos' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('proyectos')}
              >
                Proyectos
              </button>
              <button 
                className={`qtab ${vistaActual === 'sitios' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('sitios')}
              >
                Sitios
              </button>
              <button 
                className={`qtab ${vistaActual === 'aprobaciones' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('aprobaciones')}
              >
                Aprobaciones
              </button>
              <button 
                className={`qtab ${vistaActual === 'reportes' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('reportes')}
              >
                Legalización / riesgo
              </button>
              <button 
                className={`qtab ${vistaActual === 'ajustes' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('ajustes')}
              >
                Ajustes
              </button>
              <button 
                className={`qtab ${vistaActual === 'tickets' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('tickets')}
              >
                Tickets
              </button>
              <button 
                className={`qtab ${vistaActual === 'constancia-pdf' ? 'qtab-active' : ''}`}
                onClick={() => setVistaActual('constancia-pdf')}
              >
                Constancia PDF
              </button>
            </div>
          </div>

          <main className="main-content">
            {vistaActual === 'dashboard-admin' ? (
              <DashboardAdmin onNavegar={(vista) => setVistaActual(vista)} />
            ) : vistaActual === 'cadena-aprobacion' ? (
              <CadenaAprobacion />
            ) : vistaActual === 'tipos-gasto' ? (
              <TiposGasto onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'tipos-consignacion' ? (
              <TiposConsignacion onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'centros-costo' ? (
              <CentrosCosto onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'proyectos' ? (
              <Proyectos onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'sitios' ? (
              <Sitios onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'registro-gasto' ? (
              <RegistroGasto onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'aprobaciones' ? (
              <Aprobaciones onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'reportes' ? (
              <Reportes onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'ajustes' ? (
              <Ajustes onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'tickets' ? (
              <Tickets onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'constancia-pdf' ? (
              <ConstanciaPDF onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'ayuda' ? (
              <Ayuda onNavegar={(vista) => setVistaActual(vista)} />
            ) : vistaActual === 'dinero' ? (
              <Dinero onVolver={() => setVistaActual('dashboard-admin')} />
            ) : vistaActual === 'usuarios' ? (
              <Usuarios onVolver={() => setVistaActual('dashboard-admin')} />
            ) : (
              <DashboardAdmin onNavegar={(vista) => setVistaActual(vista)} />
            )}
          </main>

          {mostrarNotificaciones && (
            <div className="notif-drawer-overlay" onClick={() => setMostrarNotificaciones(false)}>
              <div className="notif-drawer-panel" onClick={(e) => e.stopPropagation()}>
                <div className="notif-drawer-header">
                  <h2>Notificaciones</h2>
                </div>
                <div className="notif-drawer-body">
                  <p className="notif-empty-text">No tiene tareas nuevas pendientes de lectura</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
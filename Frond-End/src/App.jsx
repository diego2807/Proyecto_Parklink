import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accesos from './pages/Admin/Accesos'
import Alertas from './pages/Admin/Alertas'
import Celdas from './pages/Admin/Celdas'
import Config from './pages/Admin/Config'
import Exportador from './pages/Admin/Exportador'
import KPIs from './pages/Admin/KPIs'
import Log from './pages/Admin/Log'
import Tendencias from './pages/Admin/Tendencias'
import Vehiculos from './pages/Admin/Vehiculos'
import Login from './pages/global_sistema/Login'
import Registro from './pages/Admin/Registro'
import Ayuda from './pages/user/Ayuda'
import Historial from './pages/user/Historial'
import Notificaciones from './pages/user/Notificaciones'
import PanelControl from './pages/user/PanelControl'
import Semaforo from './pages/user/Semaforo'
import VehiculosU from './pages/user/VehiculosU'
import AperturaTurno from './pages/vigilante/AperturaTurno'
import CierreTurno from './pages/vigilante/CierreTurno'
import ConsolaTransferencia from './pages/vigilante/ConsolaTransferencia'
import FormularioEntrada from './pages/vigilante/FormularioEntrada'
import FormularioSalida from './pages/vigilante/FormularioSalida'
import FormularioVisitantes from './pages/vigilante/FormularioVisitantes'
import HistorialTurno from './pages/vigilante/HistorialTurno'
import Inicio from './pages/vigilante/Inicio'
import ListaVehiculosActivo from './pages/vigilante/ListaVehiculosActivo'
import MapaGrafico from './pages/vigilante/MapaGrafico'
import ModalConfirmacion from './pages/vigilante/ModalConfirmacion'
import RegistroNovedades from './pages/vigilante/RegistroNovedades'
import RutaProtegida from './components/RutaProtegida'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>

        {/* ===== Rutas del rol VIGILANTE ===== */}
        <Route path='/Inicio' element={<RutaProtegida rolesPermitidos={['vigilante']}><Inicio /></RutaProtegida>}/>
        <Route path='/ListaVehiculosActivo' element={<RutaProtegida rolesPermitidos={['vigilante']}><ListaVehiculosActivo /></RutaProtegida>}/>
        <Route path='/ModalConfirmacion' element={<RutaProtegida rolesPermitidos={['vigilante']}><ModalConfirmacion /></RutaProtegida>}/>
        <Route path="/AperturaTurno" element={<RutaProtegida rolesPermitidos={['vigilante']}><AperturaTurno /></RutaProtegida>} />
        <Route path="/CierreTurno" element={<RutaProtegida rolesPermitidos={['vigilante']}><CierreTurno /></RutaProtegida>} />
        <Route path="/FormularioEntrada" element={<RutaProtegida rolesPermitidos={['vigilante']}><FormularioEntrada /></RutaProtegida>} />
        <Route path="/FormularioSalida" element={<RutaProtegida rolesPermitidos={['vigilante']}><FormularioSalida /></RutaProtegida>} />
        <Route path="/FormularioVisitantes" element={<RutaProtegida rolesPermitidos={['vigilante']}><FormularioVisitantes /></RutaProtegida>} />
        <Route path="/MapaGrafico" element={<RutaProtegida rolesPermitidos={['vigilante']}><MapaGrafico /></RutaProtegida>} />
        <Route path="/HistorialTurno" element={<RutaProtegida rolesPermitidos={['vigilante']}><HistorialTurno /></RutaProtegida>} />
        <Route path="/ConsolaTransferencia" element={<RutaProtegida rolesPermitidos={['vigilante']}><ConsolaTransferencia /></RutaProtegida>} />
        <Route path="/RegistroNovedades" element={<RutaProtegida rolesPermitidos={['vigilante']}><RegistroNovedades /></RutaProtegida>} />

        {/* ===== Rutas del rol ADMINISTRADOR ===== */}
        <Route path='/Registro' element={<RutaProtegida rolesPermitidos={['administrador']}><Registro /></RutaProtegida>} />
        <Route path='/Accesos' element={<RutaProtegida rolesPermitidos={['administrador']}><Accesos /></RutaProtegida>} />
        <Route path='/Alertas' element={<RutaProtegida rolesPermitidos={['administrador']}><Alertas /></RutaProtegida>} />
        <Route path='/Celdas' element={<RutaProtegida rolesPermitidos={['administrador']}><Celdas/></RutaProtegida>}/>
        <Route path='/Config' element={<RutaProtegida rolesPermitidos={['administrador']}><Config /></RutaProtegida>} />
        <Route path='/Exportador' element={<RutaProtegida rolesPermitidos={['administrador']}><Exportador /></RutaProtegida>} />
        <Route path='/KPIs' element={<RutaProtegida rolesPermitidos={['administrador']}><KPIs /></RutaProtegida>} />
        <Route path='/Log' element={<RutaProtegida rolesPermitidos={['administrador']}><Log /></RutaProtegida>} />
        <Route path='/Tendencias' element={<RutaProtegida rolesPermitidos={['administrador']}><Tendencias /></RutaProtegida>} />
        <Route path='/Vehiculos' element={<RutaProtegida rolesPermitidos={['administrador']}><Vehiculos /></RutaProtegida>} />

        {/* ===== Rutas del rol USUARIO (estándar) ===== */}
        <Route path='/Ayuda' element={<RutaProtegida rolesPermitidos={['usuario']}><Ayuda /></RutaProtegida>} />
        <Route path='/Historial' element={<RutaProtegida rolesPermitidos={['usuario']}><Historial /></RutaProtegida>} />
        <Route path='/Notificaciones' element={<RutaProtegida rolesPermitidos={['usuario']}><Notificaciones /></RutaProtegida>} />
        <Route path='/PanelControl' element={<RutaProtegida rolesPermitidos={['usuario']}><PanelControl /></RutaProtegida>} />
        <Route path='/Semaforo' element={<RutaProtegida rolesPermitidos={['usuario']}><Semaforo /></RutaProtegida>} />
        <Route path='/VehiculosU' element={<RutaProtegida rolesPermitidos={['usuario']}><VehiculosU /></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App

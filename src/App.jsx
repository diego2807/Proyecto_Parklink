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
import FiltroMapa from './pages/vigilante/FiltroMapa'
import Inicio from './pages/vigilante/Inicio'
import ListaVehiculosActivo from './pages/vigilante/ListaVehiculosActivo'
import ModalConfirmacion from './pages/vigilante/ModalConfirmacion'
import RecuperacionToken from './pages/vigilante/RecuperacionToken'
import RegistroNovedades from './pages/vigilante/RegistroNovedades'
import Login from './pages/global_sistema/Login'
import Registro from './pages/global_sistema/Registro'
import Ayuda from './pages/user/Ayuda'
import Historial from './pages/user/Historial'
import Notificaciones from './pages/user/Notificaciones'
import PanelControl from './pages/user/PanelControl'
import Semaforo from './pages/user/Semaforo'
import VehiculosU from './pages/user/VehiculosU'
import AperturaTurno from './pages/aperturaTurno'
import CierreTurno from './pages/cierreTurno'
import FormularioEntrada from './pages/formularioEntrada'
import FormularioSalida from './pages/formularioSalida'
import FormularioVisitantes from './pages/FormularioVisitantes'
import MapaGrafico from './pages/mapaGrafico'
import Novedades from './pages/registroNovedades'
import HistorialTurno from './pages/historialTurno'
import ConsolaTransferencia from './pages/consolaTransferencia'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Registro' element={<Registro />}/>
        <Route path='/FiltroMapa' element={<FiltroMapa />}/>
        <Route path='/Inicio' element={<Inicio />}/>
        <Route path='/ListaVehiculosActivo' element={<ListaVehiculosActivo />}/>
        <Route path='/ModalConfirmacion' element={<ModalConfirmacion />}/>
        <Route path='/RecuperacionToken' element={<RecuperacionToken />} />
        <Route path='/Novedades' element={<Novedades />}/>
        <Route path='/Accesos' element={<Accesos />} />
        <Route path='/Alertas' element={<Alertas />} />
        <Route path='/Celdas' element={<Celdas/>}/>
        <Route path='/Config' element={<Config />} />
        <Route path='/Exportador' element={<Exportador />} />
        <Route path='/KPIs' element={<KPIs />} />
        <Route path='/Log' element={<Log />} />
        <Route path='/Tendencias' element={<Tendencias />} />
        <Route path='/Vehiculos' element={<Vehiculos />} />
        <Route path='/Ayuda' element={<Ayuda />} />
        <Route path='/Historial' element={<Historial />} />
        <Route path='/Notificaciones' element={<Notificaciones />} />
        <Route path='/PanelControl' element={<PanelControl />} />
        <Route path='/Semaforo' element={<Semaforo />} />
        <Route path='/VehiculosU' element={<VehiculosU />} />
          <Route path="/apertura-turno" element={<AperturaTurno />} />
          <Route path="/cierre-turno" element={<CierreTurno />} />
          <Route path="/formulario-entrada" element={<FormularioEntrada />} />
          <Route path="/formulario-salida" element={<FormularioSalida />} />
          <Route path="/formulario-visitantes" element={<FormularioVisitantes />} />
          <Route path="/mapa-grafico" element={<MapaGrafico />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/historialturno" element={<HistorialTurno />} />
          <Route path="/consola-transferencia" element={<ConsolaTransferencia />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App

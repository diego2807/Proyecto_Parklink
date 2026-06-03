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
import ListaVehiculosActivos from './pages/vigilante/ListaVehiculosActivo'
import ModalConfirmacion from './pages/vigilante/ModalConfirmacion'
import RecuperacionToken from './pages/vigilante/RecuperacionToken'
import RegistroNovedades from './pages/vigilante/RegistroNovedades'
import Login from './pages/global_sistema/Login'
import Registro from './pages/global_sistema/Registro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Registro' element={<Registro />}/>
        <Route path='/FiltroMapa' element={<FiltroMapa />}/>
        <Route path='/Inicio' element={<Inicio />}/>
        <Route path='ListaVehiculosActivo' element={<ListaVehiculosActivos />}/>
        <Route path='ModalConfirmacion' element={<ModalConfirmacion />}/>
        <Route path='RecuperacionToken' element={<RegistroNovedades />}/>
        <Route path='/Accesos' element={<Accesos />} />
        <Route path='/Alertas' element={<Alertas />} />
        <Route path='/Celdas' element={<Celdas/>}/>
        <Route path='/Config' element={<Config />} />
        <Route path='/Exportador' element={<Exportador />} />
        <Route path='/Log' element={<Log />} />
        <Route path='/Tendencias' element={<Tendencias />} />
        <Route path='/Vehiculos' element={<Vehiculos />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App

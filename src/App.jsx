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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/KPIs' element={<KPIs />} />
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

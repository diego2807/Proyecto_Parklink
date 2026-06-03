import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Aprobacion from './pages/Accesos'
import Celdas from './pages/Alertas'
import Config from './pages/Celdas'
import Eventos from './pages/Config'
import Exportador from './pages/Exportador'
import KPIs from './pages/KPIs'
import Roles from './pages/Log'
import Tendencias from './pages/Tendencias'
import Vehiculos from './pages/Vehiculos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<KPIs />} />
        <Route path='/Aprobacion' element={<Aprobacion />} />
        <Route path='/Celdas' element={<Celdas />} />
        <Route path='/Config' element={<Config />} />
        <Route path='/Eventos' element={<Eventos />} />
        <Route path='/Exportador' element={<Exportador />} />
        <Route path='/Roles' element={<Exportador />} />
        <Route path='/Tendencias' element={<Tendencias />} />
        <Route path='/Vehiculos' element={<Tendencias />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App

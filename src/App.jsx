import {BrowserRoute, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

function App() {

  return (
    <BrowserRoute>
  <Routes>
    <Route path='/vista' element={<Vista/>}/>
  </Routes>
  </BrowserRoute>
  )
  
}

export default App

import React from 'react'
import './App.css'
import Input from './Components/Input/Input'
import Table from './Components/Table/Table'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Stats from './Components/Stats/Stats'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table/>}/>
        <Route path="/stats" element={<Stats/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

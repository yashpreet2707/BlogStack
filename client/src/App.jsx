import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


//pages
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Header from './components/Header'

function App() {

  return (
    <BrowserRouter>
      <div className='dark:text-white dark:bg-[#1E2936]'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Projects" element={<Projects />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

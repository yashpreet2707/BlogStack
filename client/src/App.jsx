import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//components
import Header from './components/Header'
import FooterComponent from './components/Footer'

//pages
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"

function App() {

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Projects" element={<Projects />} />
        </Routes>
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App

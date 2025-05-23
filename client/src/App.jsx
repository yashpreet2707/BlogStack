import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//components
import Header from './components/Header'
import FooterComponent from './components/Footer'
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import ScrollToTop from './components/ScrollToTop'

//pages
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/DashBoard"
import Projects from "./pages/Projects"
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import Search from './pages/Search'

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='h-16'>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route element={<PrivateRoute />} >
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />} >
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path="/Projects" element={<Projects />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App

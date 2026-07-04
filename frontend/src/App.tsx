import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./Components/Navbar"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegsiterPage"


function App() {

  return (

    <BrowserRouter>

      <NavBar />

      <Routes>

        <Route path="/" element={ <HomePage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
      </Routes>

    </BrowserRouter>
  )
}

export default App
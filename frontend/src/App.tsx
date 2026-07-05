import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./Components/Navbar"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegsiterPage"
import AuthProvider from "./context/AuthProvider"


function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <NavBar />

        <Routes>

          <Route path="/" element={ <HomePage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
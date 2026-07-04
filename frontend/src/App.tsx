import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./Components/Navbar"
import HomePage from "./pages/HomePage"


function App() {

  return (

    <BrowserRouter>

      <NavBar />

      <Routes>

        <Route path="/" element={ <HomePage /> } />
      </Routes>

    </BrowserRouter>
  )
}

export default App
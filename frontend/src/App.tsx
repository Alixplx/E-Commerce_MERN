import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./Components/Navbar"


function App() {

  return (

    <BrowserRouter>

      <NavBar />

      <Routes>

        <Route path="/" element={ <h2>Hello</h2> } />
      </Routes>

    </BrowserRouter>
  )
}

export default App
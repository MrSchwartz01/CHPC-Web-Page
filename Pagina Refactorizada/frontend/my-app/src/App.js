import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ServicioTecnico from "./pages/ServicioTecnico";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Agrega aquí las demás rutas */}
      </Routes>
    </Router>
  );
}

export default App;

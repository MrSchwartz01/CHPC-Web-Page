import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="main-menu">
      <Link to="/ofertas">Ofertas & Más</Link>
      <Link to="/computo">Computo</Link>
      <Link to="/redes">Redes</Link>
      <Link to="/electronica">Electrónica</Link>
      <Link to="/movilidad">Movilidad</Link>
      <Link to="/oficina">Oficina</Link>
      <Link to="/accesorios">Accesorios</Link>
      <Link to="/seguridad">Seguridad</Link>
      <Link to="/gaming">Gaming</Link>
      <Link to="/pos">POS</Link>
      <Link to="/marcas">Marcas</Link>
      <Link to="/servicio-tecnico">Servicio Técnico</Link>
      <Link to="/redes-sociales">Redes Sociales</Link>
    </nav>
  );
}
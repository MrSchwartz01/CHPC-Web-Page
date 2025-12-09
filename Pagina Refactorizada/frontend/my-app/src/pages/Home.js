import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <header className="header">
        <img src="/logo.png" alt="Logo" height={60} />
        <input type="text" placeholder="Tenemos lo que usted está buscando" />
        <button>Buscar</button>
        <button>Ingresar</button>
        <button>Hacerse cliente</button>
      </header>
      <Navbar />
      <div className="banner">
        <p>Bienvenido a CHPC Store. Descubre productos destacados, ofertas y servicios técnicos.</p>
      </div>
      {/* Aquí puedes agregar los destacados y productos con descuento como en las capturas */}
    </div>
  );
}
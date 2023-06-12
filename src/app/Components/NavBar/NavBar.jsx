import Link from "next/link";
import "./navBar.css"

export default function NavBar() {
  
  
  
return (
    <nav className="containerNav">
      <header>
        <h1>Gestión de Facturas</h1>
      </header>
      <ul>
        <li>
          <Link href="/">Listado de Productos</Link>
        </li>
        <li>
          <Link href="/Facturas">Facturas</Link>
        </li>
        <li>
          <Link href="/NuevaFactura">Generar nueva Factura</Link>
        </li>
      </ul>
    </nav>
  );
}

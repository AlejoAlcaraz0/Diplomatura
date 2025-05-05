import '../../styles/components/layout/Nav.css';

import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <div>
        <ul>
          <li><NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Home</NavLink></li>
          <li><NavLink to="/nosotros" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Nosotros</NavLink></li>
          <li><NavLink to="/novedades" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Novedades</NavLink></li>
          <li><NavLink to="/contacto" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Contacto</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;
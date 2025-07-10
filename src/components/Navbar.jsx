import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="navbar-header">
      <div className="logo-container">
        <img src={logo} alt="Logo" style={{ width: "200px", height: "auto" }} />
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`navbar-links ${menuAbierto ? "abierto" : ""}`}>
        <NavLink to="/" className="nav-link">
          Inicio
        </NavLink>
        <NavLink to="/novedades" className="nav-link">
          Novedades
        </NavLink>
        <NavLink to="/productos" className="nav-link">
          Productos
        </NavLink>
        <NavLink to="/contacto" className="nav-link">
          Contacto
        </NavLink>
      </nav>
      
       <form action="/search" method="GET" className="search-form">
        <input type="text" name="q" placeholder="Buscar" />
        <button type="submit">Buscar</button>
      </form>

    </header>
  );
}

export default Navbar;

import React from "react";
import publicidadImg from "../assets/publicidad.jpg"; // ← import correcta

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="ad-banner">
        <a href="https://www.agronorte.com.ar"
        target="_blank" // Opcional: Abre el link en una nueva pestaña
          rel="noopener noreferrer" // Opcional pero recomendado para seguridad con target="_blank"
        >
          <img src={publicidadImg} alt="Banner Publicitario - ¡Haz clic aquí!" />
</a>

      </div>
    </aside>
  );
}

export default Sidebar;


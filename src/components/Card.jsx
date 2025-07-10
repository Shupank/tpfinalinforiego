import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

function Card({ imagen, titulo, descripcion, precio }) {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const abrirModal = useCallback(() => {
    console.log(`Abriendo modal para: ${titulo}`); // Depuración
    setMostrarDetalles(true);
  }, [titulo]);

  const cerrarModal = useCallback(() => {
    console.log(`Cerrando modal para: ${titulo}`); // Depuración
    setMostrarDetalles(false);
  }, [titulo]);

  // Manejo de la clase modal-open en el body
  useEffect(() => {
    if (mostrarDetalles) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [mostrarDetalles]);

  // Cerrar modal con la tecla Esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        cerrarModal();
      }
    };
    if (mostrarDetalles) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mostrarDetalles, cerrarModal]);

  return (
    <>
      <div
        className="card"
        onClick={abrirModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            abrirModal();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${titulo}`}
      >
        <img src={imagen} alt={`Imagen de ${titulo}`} onError={() => console.error(`Error cargando imagen: ${imagen}`)} />
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </div>

      {mostrarDetalles && (
        <div
          className="modal-overlay"
          onClick={cerrarModal}
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 id="modal-title">{titulo}</h2>
            <img src={imagen} alt={`Imagen de ${titulo}`} onError={() => console.error(`Error cargando imagen en modal: ${imagen}`)} />
            <p>{descripcion}</p>
            <p className="precio">Precio: {precio}</p>
            <button className="button" onClick={cerrarModal} aria-label="Cerrar modal">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Card.propTypes = {
  imagen: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.string,
};

Card.defaultProps = {
  precio: 'Consultar',
};

export default Card;
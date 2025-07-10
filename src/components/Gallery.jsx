import React from 'react';
import Card from '../components/Card';
import '../styles/Gallery.css';

import producto1 from '../assets/producto1.jpg';
import producto2 from '../assets/producto2.jpg';
import producto3 from '../assets/producto3.jpg';

const productos = [
  {
    imagen: producto1,
    titulo: 'Enrrollador',
    descripcion: 'Ideal para campos deportivos.',
    precio: '$120.000',
  },
  {
    imagen: producto2,
    titulo: 'Filtros',
    descripcion: 'Para evitar el taponamiento de los emisores.',
    precio: '$25.000',
  },
  {
    imagen: producto3,
    titulo: 'Avance frontal',
    descripcion: 'Para el riego de grandes superficies.',
    precio: '$310.000',
  },
];

function Gallery() {
  console.log('Rendering Gallery with products:', productos); // Depuración
  return (
    <section className="gallery">
      <h2>Productos</h2>
      <div className="product-grid">
        {productos.map((producto, index) => {
          console.log(`Rendering Card for: ${producto.titulo}`); // Depuración adicional
          return (
            <Card
              key={index}
              imagen={producto.imagen}
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              precio={producto.precio}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
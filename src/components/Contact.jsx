import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <form className="formulario-contacto" onSubmit={handleSubmit}>
      <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Mensaje" />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Contact;

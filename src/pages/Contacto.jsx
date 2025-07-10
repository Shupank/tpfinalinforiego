import React, { useState, useRef } from "react";
import { sendForm } from "@emailjs/browser";
import "../styles/Contacto.css";

function Contacto() {
  const form = useRef();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    frecuencia: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendForm(
      "service_7xtj2ic",
      "template_uw2hnj2",
      form.current,
      "7H54-U2J-VOaxsWGH"
    )
      .then((result) => {
        console.log("Email enviado:", result.text);
        alert("¡Gracias por tu mensaje! 😊");
        setFormData({ nombre: "", email: "", frecuencia: "", mensaje: "" });
      })
      .catch((error) => {
        console.log("Error al enviar el email:", error.text);
        alert("Hubo un error al enviar tu mensaje. Por favor, intentá de nuevo.");
      });
  };

  // Nueva función para limpiar el formulario
  const handleClear = () => {
    setFormData({ nombre: "", email: "", frecuencia: "", mensaje: "" });
  };

  return (
    <div className="form-wrapper">
      <form className="contact-card" ref={form} onSubmit={handleSubmit}>
        <h2>Contactanos</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select
          name="frecuencia"
          value={formData.frecuencia}
          onChange={handleChange}
          required
        >
          <option value="">¿Con qué frecuencia usás riego?</option>
          <option value="nada">Nada</option>
          <option value="poco">Poco</option>
          <option value="mucho">Mucho</option>
        </select>
        <textarea
          name="mensaje"
          placeholder="Escribí tu consulta o comentario"
          value={formData.mensaje}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
        <div className="botones">
          <button type="submit">Enviar</button>
          <button type="button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contacto;

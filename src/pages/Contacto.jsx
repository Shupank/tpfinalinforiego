import React, { useState, useRef } from "react";
import { sendForm } from "@emailjs/browser";
import "../styles/Contacto.css"; // Asumiendo que tienes estilos relevantes aquí

function Contacto() {
  // useRef para acceder directamente al elemento DOM del formulario, requerido por EmailJS.
  const form = useRef();

  // Estado para manejar los datos del formulario.
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    frecuencia: "",
    mensaje: "",
  });

  // Estado para manejar el estado de envío (ej. cargando, éxito, error).
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Estado para mensajes de retroalimentación al usuario (ej. "¡Enviado con éxito!").
  const [feedbackMessage, setFeedbackMessage] = useState("");
  // Estado para el tipo de mensaje de retroalimentación (ej. "success", "error").
  const [messageType, setMessageType] = useState("");

  /**
   * Maneja los cambios en los campos del formulario, actualizando el estado `formData`.
   * @param {Object} e - El objeto de evento de cambio del input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Restablece el formulario a su estado inicial vacío y borra cualquier mensaje de retroalimentación.
   */
  const resetForm = () => {
    setFormData({ nombre: "", email: "", frecuencia: "", mensaje: "" });
    setFeedbackMessage("");
    setMessageType("");
  };

  /**
   * Maneja el envío del formulario.
   * Realiza validación del lado del cliente y envía el correo electrónico a través de EmailJS.
   * @param {Object} e - El objeto de evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado de envío del formulario (recarga de página).

    // Validación básica del lado del cliente antes de enviar.
    if (!formData.nombre || !formData.email || !formData.frecuencia || !formData.mensaje) {
      setFeedbackMessage("Por favor, completá todos los campos obligatorios.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true); // Establece el estado de envío a true.
    setFeedbackMessage(""); // Limpia mensajes anteriores.
    setMessageType("");

    try {
      // Envía el formulario usando EmailJS.
      await sendForm(
        "service_7xtj2ic", // Tu Service ID de EmailJS
        "template_uw2hnj2", // Tu Template ID de EmailJS
        form.current,      // Referencia al elemento DOM del formulario
        "7H54-U2J-VOaxsWGH"// Tu Public Key de EmailJS
      );

      setFeedbackMessage("¡Gracias por tu mensaje! Nos pondremos en contacto pronto. 😊");
      setMessageType("success");
      resetForm(); // Limpia el formulario después de un envío exitoso.

    } catch (error) {
      console.error("Error al enviar el email:", error); // Registra el error completo para depuración.
      setFeedbackMessage("Hubo un error al enviar tu mensaje. Por favor, intentá de nuevo más tarde.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false); // Finaliza el estado de envío.
    }
  };

  return (
    <div className="form-wrapper">
      <form className="contact-card" ref={form} onSubmit={handleSubmit}>
        <h2>Contactanos</h2>

        {/* Mensajes de retroalimentación para el usuario */}
        {feedbackMessage && (
          <div className={`form-message ${messageType === "success" ? "success" : "error"}`}>
            {feedbackMessage}
          </div>
        )}

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          aria-label="Nombre completo" // Mejora la accesibilidad
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Correo electrónico"
        />
        <select
          name="frecuencia"
          value={formData.frecuencia}
          onChange={handleChange}
          required
          aria-label="Frecuencia de uso de riego"
        >
          <option value="" disabled>¿Con qué frecuencia usás riego?</option> {/* Deshabilitado para que no sea una opción seleccionable */}
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
          aria-label="Tu consulta o comentario"
        ></textarea>

        <div className="botones">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
          <button type="button" onClick={resetForm} disabled={isSubmitting}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contacto;
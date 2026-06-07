import { useState, useEffect } from "react";

import {adoptionAPI} from '../../../services/api.js'

{/* Nombre de la variable a guardar en el local storage */}
const STORAGE_KEY = "adoption_form_draft";

const initialFormData = {
  nombre: "",
  correo: "",
  telefono: "",
  ciudad: "",
  tipoCasa: "",
  hayPatio: "",
  hayMascotas: "",
  descripcionMascotas: "",
  hayNinos: "",
  edadesNinos: "",
  experienciaPrevia: "",
  razonAdoptar: "",
  horasSola: "",
  aceptaResponsabilidad: "",
};

const HORAS_OPTIONS = Array.from({ length: 25 }, (_, i) => i); // 0 al 24

export default function AdoptionFormModal({ isOpen, onClose, mascota, apiEndpoint = "/api/adoptions" }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const WHATSAPP_NUMBER = "573116859378"; 

  {/* Cargar borrador desde localStorage al abrir */}
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch {
          {/* Si hay algún problema con el borrador, ignorarlo*/}
        }
      }
    }
  }, [isOpen]);

  {/* Guardar borrador en localStorage al cambiar datos */}
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    else if (formData.nombre.length > 200) newErrors.nombre = "Máximo 200 caracteres.";

    if (!formData.correo.trim()) newErrors.correo = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = "Correo inválido.";
    else if (formData.correo.length > 200) newErrors.correo = "Máximo 200 caracteres.";

    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio.";
    else if (formData.telefono.length > 50) newErrors.telefono = "Máximo 50 caracteres.";

    if (!formData.ciudad.trim()) newErrors.ciudad = "La ciudad es obligatoria.";
    else if (formData.ciudad.length > 100) newErrors.ciudad = "Máximo 100 caracteres.";

    if (!formData.tipoCasa) newErrors.tipoCasa = "Selecciona un tipo de casa.";
    if (!formData.hayPatio) newErrors.hayPatio = "Este campo es obligatorio.";
    if (!formData.hayMascotas) newErrors.hayMascotas = "Este campo es obligatorio.";
    if (!formData.hayNinos) newErrors.hayNinos = "Este campo es obligatorio.";
    if (formData.horasSola === "") newErrors.horasSola = "Este campo es obligatorio.";
    if (!formData.aceptaResponsabilidad) newErrors.aceptaResponsabilidad = "Debes responder este campo.";
    if (formData.aceptaResponsabilidad === "no") newErrors.aceptaResponsabilidad = "Debes aceptar las responsabilidades para adoptar.";

    return newErrors;
  };

  const buildPayload = () => ({
    animal_id: mascota?.id,
    full_name: formData.nombre,
    email: formData.correo,
    phone: formData.telefono,
    city: formData.ciudad,
    housing_type: formData.tipoCasa === "Casa" ? "house" : formData.tipoCasa === "Apartamento" ? "apartment" : formData.tipoCasa === "Finca" ? "farm" : "other",
    has_yard: formData.hayPatio === "Sí" ? true : false,
    has_other_pets: formData.hayMascotas === "Sí" ? true : false || null,
    other_pets_description: formData.descripcionMascotas,
    has_children: formData.hayNinos === "Sí" ? true : false,
    children_ages: formData.edadesNinos || null,
    previous_pet_experience: formData.experienciaPrevia || null,
    reason_for_adoption: formData.razonAdoptar || null,
    hours_alone_per_day: Number(formData.horasSola) || null,
    agrees_to_responsibilities: formData.aceptaResponsabilidad === "si" ? true : false,
  });

  const postToAPI = async(adoptionRequestForm) => {
      try {
          const response = await adoptionAPI['submitAdoptionRequest'](adoptionRequestForm);
      } catch (error) {
          console.error("Error fetching animals:", error);
          throw error;
      }
  };

  const buildWhatsAppMessage = () => {
    const p = formData;
    const lineas = [
      `🐾 *Solicitud de Adopción*`,
      mascota ? `🐕 Mascota: ${mascota.nombre}` : "",
      ``,
      `👤 *Datos del adoptante*`,
      `• Nombre: ${p.nombre}`,
      `• Correo: ${p.correo}`,
      `• Teléfono: ${p.telefono}`,
      `• Ciudad: ${p.ciudad}`,
      ``,
      `🏠 *Hogar*`,
      `• Tipo de casa: ${p.tipoCasa}`,
      `• Patio: ${p.hayPatio}`,
      `• Otras mascotas: ${p.hayMascotas}`,
      p.descripcionMascotas ? `• Descripción mascotas: ${p.descripcionMascotas}` : "",
      `• Niños en casa: ${p.hayNinos}`,
      p.edadesNinos ? `• Edades niños: ${p.edadesNinos}` : "",
      `• Horas sola al día: ${p.horasSola}`,
      ``,
      `📝 *Sobre el adoptante*`,
      p.experienciaPrevia ? `• Experiencia previa: ${p.experienciaPrevia}` : "",
      p.razonAdoptar ? `• Razón para adoptar: ${p.razonAdoptar}` : "",
      `• Acepta responsabilidades: ${p.aceptaResponsabilidad}`,
    ]
      .filter((l) => l !== "")
      .join("\n");

    return encodeURIComponent(lineas);
  };

  const handleSaveOnly = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await postToAPI({ ...buildPayload(), canal: "correo/telefono" });
      localStorage.removeItem(STORAGE_KEY);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await postToAPI({ ...buildPayload(), canal: "whatsapp" });
      localStorage.removeItem(STORAGE_KEY);
      const msg = buildWhatsAppMessage();
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // No limpiar el localStorage — se guarda el borrador
    setErrors({});
    setSubmitStatus(null);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  if (!isOpen) return null;

  {/* Pantalla de éxito */}
  if (submitStatus === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">¡Solicitud enviada!</h2>
          <p className="text-gray-600 mb-6">
            Gracias por querer adoptar a {mascota?.name}. Nos pondremos en contacto contigo pronto.
          </p>
          <button
            onClick={handleClose}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  {/*Formulario principal */}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Solicitud de adopción
              {mascota && <span className="text-emerald-500"> · {mascota.nombre}</span>}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Tu progreso se guarda automáticamente
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body scrollable */}
        <div className="overflow-y-auto px-8 py-6 space-y-6 flex-1">

          {/* ── Sección: Datos personales ── */}
          <Section title="Datos personales" emoji="👤">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nombre completo" required error={errors.nombre}>
                <input
                  name="nombre" value={formData.nombre} onChange={handleChange}
                  maxLength={200} placeholder="Tu nombre"
                  className={inputClass(errors.nombre)}
                />
              </Field>
              <Field label="Correo electrónico" required error={errors.correo}>
                <input
                  name="correo" value={formData.correo} onChange={handleChange}
                  maxLength={200} placeholder="correo@ejemplo.com" type="email"
                  className={inputClass(errors.correo)}
                />
              </Field>
              <Field label="Teléfono" required error={errors.telefono}>
                <input
                  name="telefono" value={formData.telefono} onChange={handleChange}
                  maxLength={50} placeholder="+57 300 000 0000"
                  className={inputClass(errors.telefono)}
                />
              </Field>
              <Field label="Ciudad" required error={errors.ciudad}>
                <input
                  name="ciudad" value={formData.ciudad} onChange={handleChange}
                  maxLength={100} placeholder="Barranquilla"
                  className={inputClass(errors.ciudad)}
                />
              </Field>
            </div>
          </Section>

          {/* ── Sección: Tu hogar ── */}
          <Section title="Tu hogar" emoji="🏠">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Tipo de casa" required error={errors.tipoCasa}>
                <select
                  name="tipoCasa" value={formData.tipoCasa} onChange={handleChange}
                  className={inputClass(errors.tipoCasa)}
                >
                  <option value="">Selecciona...</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Finca">Finca</option>
                  <option value="Otro">Otro</option>
                </select>
              </Field>

              <Field label="¿Hay patio?" required error={errors.hayPatio}>
                <RadioGroup
                  name="hayPatio" value={formData.hayPatio}
                  onChange={handleChange}
                  options={[{ value: "Sí", label: "Sí" }, { value: "No", label: "No" }]}
                />
              </Field>

              <Field label="Horas al día que la mascota estaría sola" required error={errors.horasSola}>
                <select
                  name="horasSola" value={formData.horasSola} onChange={handleChange}
                  className={inputClass(errors.horasSola)}
                >
                  <option value="">Selecciona...</option>
                  {HORAS_OPTIONS.map((h) => (
                    <option key={h} value={h}>{h} {h === 1 ? "hora" : "horas"}</option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          {/* ── Sección: Otras mascotas ── */}
          <Section title="Otras mascotas" emoji="🐶">
            <div className="space-y-4">
              <Field label="¿Tienes otras mascotas?" required error={errors.hayMascotas}>
                <RadioGroup
                  name="hayMascotas" value={formData.hayMascotas}
                  onChange={handleChange}
                  options={[{ value: "Sí", label: "Sí" }, { value: "No", label: "No" }]}
                />
              </Field>
              {formData.hayMascotas === "Sí" && (
                <Field label="Describe tus mascotas" error={errors.descripcionMascotas}>
                  <textarea
                    name="descripcionMascotas" value={formData.descripcionMascotas}
                    onChange={handleChange} rows={3}
                    placeholder="Raza, edad, temperamento..."
                    className={inputClass(errors.descripcionMascotas)}
                  />
                </Field>
              )}
            </div>
          </Section>

          {/* ── Sección: Niños en casa ── */}
          <Section title="Niños en casa" emoji="👶">
            <div className="space-y-4">
              <Field label="¿Hay niños en casa?" required error={errors.hayNinos}>
                <RadioGroup
                  name="hayNinos" value={formData.hayNinos}
                  onChange={handleChange}
                  options={[{ value: "Sí", label: "Sí" }, { value: "No", label: "No" }]}
                />
              </Field>
              {formData.hayNinos === "Sí" && (
                <Field label="Edades de los niños" error={errors.edadesNinos}>
                  <input
                    name="edadesNinos" value={formData.edadesNinos} onChange={handleChange}
                    maxLength={200} placeholder="p.ej. 3, 7 y 10 años"
                    className={inputClass(errors.edadesNinos)}
                  />
                </Field>
              )}
            </div>
          </Section>

          {/* ── Sección: Sobre ti ── */}
          <Section title="Sobre ti" emoji="📝">
            <div className="space-y-4">
              <Field label="Experiencia previa con mascotas" error={errors.experienciaPrevia}>
                <textarea
                  name="experienciaPrevia" value={formData.experienciaPrevia}
                  onChange={handleChange} rows={2}
                  placeholder="Cuéntanos si has tenido mascotas antes..."
                  className={inputClass()}
                />
              </Field>
              <Field label="¿Por qué quieres adoptar?" error={errors.razonAdoptar}>
                <textarea
                  name="razonAdoptar" value={formData.razonAdoptar}
                  onChange={handleChange} rows={2}
                  placeholder="¿Qué te motivó a querer adoptar?"
                  className={inputClass()}
                />
              </Field>
            </div>
          </Section>

          {/* ── Sección: Responsabilidad ── */}
          <Section title="Responsabilidad" emoji="✅">
            <Field
              label="¿Estás de acuerdo con asumir la responsabilidad de cuidar, alimentar, y brindar atención médica a la mascota durante toda su vida?"
              required
              error={errors.aceptaResponsabilidad}
            >
              <RadioGroup
                name="aceptaResponsabilidad" value={formData.aceptaResponsabilidad}
                onChange={handleChange}
                options={[{ value: "si", label: "Sí, acepto" }, { value: "no", label: "No" }]}
              />
            </Field>
          </Section>

          {submitStatus === "error" && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl">
              Ocurrió un error al enviar. Por favor intenta de nuevo.
            </p>
          )}
        </div>

        {/* Footer con botones */}
        <div className="px-8 py-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={handleSaveOnly}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            <span>💾</span>
            <span>Guardar solicitud</span>
          </button>
          <button
            onClick={handleWhatsApp}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            <span>💬</span>
            <span>Enviar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sub-componentes ────────────────────────────────────────────────

function Section({ title, emoji, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
        <span>{emoji}</span>
        {title}
      </h3>
      <div className="bg-gray-50 rounded-2xl p-4">{children}</div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
            value === opt.value
              ? "border-pink-500 bg-pink-50 text-pink-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            className="sr-only"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function inputClass(error) {
  const base =
    "w-full px-3 py-2 rounded-xl border bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 transition-all";
  return error
    ? `${base} border-red-300 focus:ring-red-300`
    : `${base} border-gray-200 focus:ring-pink-300 focus:border-pink-400`;
}

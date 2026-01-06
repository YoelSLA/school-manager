import { EmpleadoEducativoCreateDTO } from "@/utils/types";
import { useState } from "react";
import "./empleadoDetalleModal.css";

interface Props {
  empleado: EmpleadoEducativoCreateDTO;
  onClose: () => void;
  onSave: (empleadoActualizado: EmpleadoEducativoCreateDTO) => void;
}

export default function EmpleadoDetalleModal({
  empleado,
  onClose,
  onSave,
}: Props) {
  // 🔹 estado editable (clon)
  const [form, setForm] = useState<EmpleadoEducativoCreateDTO>({ ...empleado });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const guardar = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <header className="modal-header">
          <div>
            <h2>
              {form.apellido}, {form.nombre}
            </h2>
            <span className="modal-subtitle">{form.cuil}</span>
          </div>

          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </header>

        {/* BODY */}
        <div className="modal-body">
          {/* DATOS PERSONALES */}
          <section className="modal-section">
            <h3>Datos personales</h3>

            <div className="data-grid">
              <Field
                label="Apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
              />

              <Field
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />

              <Field
                label="CUIL"
                name="cuil"
                value={form.cuil}
                onChange={handleChange}
              />

              <Field
                label="Fecha de nacimiento"
                name="fechaDeNacimiento"
                type="date"
                value={form.fechaDeNacimiento}
                onChange={handleChange}
              />

              <Field
                label="Domicilio"
                name="domicilio"
                value={form.domicilio}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* CONTACTO */}
          <section className="modal-section">
            <h3>Contacto</h3>

            <div className="data-grid">
              <Field
                label="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* ROLES (SOLO VISUAL) */}
          <section className="modal-section">
            <h3>Roles</h3>

            <div className="empleado-roles">
              <span className={`rol-pill ${empleado.rol.toLowerCase()}`}>
                {empleado.rol.replace(/_/g, " ")}
              </span>

              {/* mañana puede ser:
              empleado.roles.map(...)
              */}
            </div>
          </section>

          {/* SITUACIÓN LABORAL */}
          <section className="modal-section">
            <h3>Situación laboral</h3>

            <div className="data-grid">
              <Field
                label="Fecha de ingreso"
                name="fechaDeIngreso"
                type="date"
                value={form.fechaDeIngreso}
                onChange={handleChange}
              />
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-primary" onClick={guardar} disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </footer>
      </div>
    </div>
  );
}

/* 🔹 Campo reutilizable */
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input name={name} value={value} type={type} onChange={onChange} />
    </div>
  );
}

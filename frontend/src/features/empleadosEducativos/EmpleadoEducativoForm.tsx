import { useEscuela } from "@/context/EscuelaContext";
import { crearEmpleadoEducativo } from "@/services/empleadosService";
import {
  EmpleadoEducativoForm,
  empleadoEducativoSchema,
} from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "./equipoEducativoForm.css";

export default function EmpleadoForm() {
  const { escuelaActiva } = useEscuela();
  const hoy = new Date().toLocaleDateString("en-CA");

  const [usarHoy, setUsarHoy] = useState(true);
  const [cuilExiste, setCuilExiste] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmpleadoEducativoForm>({
    resolver: zodResolver(empleadoEducativoSchema),
    defaultValues: {
      cuil: "",
      nombre: "",
      apellido: "",
      email: "",
      domicilio: "",
      telefono: "",
      fechaDeNacimiento: "",
      fechaDeIngreso: hoy,
    },
  });

  /* =====================
     FECHA INGRESO
  ====================== */
  const toggleFechaIngreso = () => {
    setUsarHoy(!usarHoy);
    setValue("fechaDeIngreso", usarHoy ? "" : hoy);
  };

  /* =====================
     SUBMIT
  ====================== */
  const onSubmit = async (data: EmpleadoEducativoForm) => {
    if (!escuelaActiva) {
      toast.error("No hay escuela seleccionada");
      return;
    }

    if (cuilExiste) {
      toast.error("Ese CUIL ya está registrado");
      return;
    }

    try {
      await crearEmpleadoEducativo(escuelaActiva.id, data);

      toast.success("Personal educativo creado correctamente");

      reset({
        cuil: "",
        nombre: "",
        apellido: "",
        email: "",
        domicilio: "",
        telefono: "",
        fechaDeNacimiento: "",
        fechaDeIngreso: hoy,
      });

      setUsarHoy(true);
      setCuilExiste(false);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError("cuil", {
          type: "manual",
          message: "Ese CUIL ya está registrado",
        });
        toast.error("Ese CUIL ya está registrado");
      } else {
        toast.error("Error al crear el personal educativo");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="empleado-form" onSubmit={handleSubmit(onSubmit)}>
        {/* =====================
            DATOS PERSONALES
        ====================== */}
        <section className="form-card">
          <h3>Datos personales</h3>

          <div className="form-grid">
            {/* CUIL */}
            <div className="field">
              <label>CUIL</label>
              <input {...register("cuil")} />
              {errors.cuil && (
                <span className="error">{errors.cuil.message}</span>
              )}
            </div>

            {/* Fecha de nacimiento */}
            <div className="field">
              <label>Fecha de nacimiento</label>
              <input type="date" {...register("fechaDeNacimiento")} />
              {errors.fechaDeNacimiento && (
                <span className="error">
                  {errors.fechaDeNacimiento.message}
                </span>
              )}
            </div>

            {/* Apellido */}
            <div className="field">
              <label>Apellido</label>
              <input {...register("apellido")} />
              {errors.apellido && (
                <span className="error">{errors.apellido.message}</span>
              )}
            </div>

            {/* Nombre */}
            <div className="field">
              <label>Nombre</label>
              <input {...register("nombre")} />
              {errors.nombre && (
                <span className="error">{errors.nombre.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* =====================
            CONTACTO
        ====================== */}
        <section className="form-card">
          <h3>Contacto</h3>

          <div className="form-grid">
            <div className="field">
              <label>Email</label>
              <input {...register("email")} />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>

            <div className="field">
              <label>Teléfono</label>
              <input {...register("telefono")} />
            </div>

            <div className="field">
              <label>Domicilio</label>
              <input {...register("domicilio")} />
            </div>
          </div>
        </section>

        {/* =====================
            FECHA DE INGRESO
        ====================== */}
        <section className="form-card">
          <h3>Ingreso</h3>

          <div className="form-grid">
            <div className="field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={usarHoy}
                  onChange={toggleFechaIngreso}
                />
                Usar fecha actual
              </label>
            </div>

            <div className="field">
              <label>Fecha de ingreso</label>
              <input
                type="date"
                {...register("fechaDeIngreso")}
                disabled={usarHoy}
              />
              {errors.fechaDeIngreso && (
                <span className="error">{errors.fechaDeIngreso.message}</span>
              )}
            </div>
          </div>
        </section>

        {/* =====================
            ACCIONES
        ====================== */}
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner" /> : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

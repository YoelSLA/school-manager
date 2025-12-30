import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useEscuela } from "../context/EscuelaContext";
import {
  crearEmpleadoEducativo,
  existeCuil,
} from "../services/empleadoEducativo";
import { RolEducativo, rolEducativoLabels } from "../types/types";
import {
  EmpleadoEducativoForm,
  empleadoEducativoSchema,
} from "../validations/empleadoEducativoSchema";

import "./equipoEducativoForm.css";

const cupofs = [
  { id: "C001", label: "2467830" },
  { id: "C002", label: "CUPOF C002 - Secretario" },
  { id: "C003", label: "CUPOF C003 - Directivo" },
];

const cupofsPorRol: Record<RolEducativo, { id: string; label: string }[]> = {
  [RolEducativo.DIRECCION]: [{ id: "S001", label: "2467830" }],
  [RolEducativo.VICEDIRECCION]: [{ id: "S001", label: "2467831" }],
  [RolEducativo.SECRETARIA]: [{ id: "S001", label: "2467832" }],
  [RolEducativo.DOCENTE]: [],

  [RolEducativo.CAMBIO_DE_FUNCION]: [
    { id: "CF001", label: "CUPOF CF001 - Cambio función A" },
    { id: "CF002", label: "CUPOF CF002 - Cambio función B" },
  ],

  [RolEducativo.PRECEPTORIA]: [
    { id: "P001", label: "2467833" },
    { id: "P002", label: "2467834" },
    { id: "P003", label: "2467835" },
    { id: "P004", label: "2467836" },
    { id: "P005", label: "2467837" },
    { id: "P006", label: "2587669" },
  ],
};

export default function EmpleadoForm() {
  const { escuela } = useEscuela();
  const hoy = new Date().toISOString().split("T")[0];

  const [usarHoy, setUsarHoy] = useState(true);
  const [cuilExiste, setCuilExiste] = useState(false);

  const cuilInputRef = useRef<HTMLInputElement>(null);

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
      rol: RolEducativo.DOCENTE,
      fechaDeIngreso: hoy,
      cuil: "",
    },
  });

  const cuilValue = watch("cuil");
  const rolSeleccionado = watch("rol");
  const cupofsDisponibles = cupofsPorRol[rolSeleccionado] ?? [];

  useEffect(() => {
    setValue("cupof", "");
  }, [rolSeleccionado, setValue]);

  /* =====================
     VALIDAR CUIL (API)
  ====================== */
  const validarCuil = async (cuil: string) => {
    if (!cuil) return;

    const existe = await existeCuil(cuil);
    setCuilExiste(existe);

    if (existe) {
      setError("cuil", {
        type: "manual",
        message: "Ese CUIL ya está registrado",
      });
      toast.error("Ese CUIL ya está registrado");
    }
  };

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
    if (!escuela) {
      toast.error("No hay escuela seleccionada");
      return;
    }

    if (cuilExiste) {
      toast.error("Ese CUIL ya está registrado");
      return;
    }

    try {
      await crearEmpleadoEducativo({
        ...data,
        escuelaId: escuela.id,
      });

      toast.success("Personal educativo creado correctamente");

      reset({
        cuil: "",
        nombre: "",
        apellido: "",
        rol: RolEducativo.DOCENTE,
        cupof: "",
        domicilio: "",
        telefono: "",
        fechaDeNacimiento: "",
        fechaDeIngreso: hoy,
      });

      setUsarHoy(true);
      setCuilExiste(false);
      cuilInputRef.current?.focus();
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
              <input
                {...register("cuil")}
                ref={cuilInputRef}
                onBlur={() => validarCuil(cuilValue)}
              />
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
            DATOS LABORALES
        ====================== */}
        <section className="form-card">
          <h3>Datos laborales</h3>

          <div className="form-grid">
            {/* ROL */}
            <div className="field">
              <label>Rol educativo</label>
              <select {...register("rol")}>
                {Object.values(RolEducativo).map((rol) => (
                  <option key={rol} value={rol}>
                    {rolEducativoLabels[rol]}
                  </option>
                ))}
              </select>
            </div>

            {/* CUPOF */}
            <div className="field">
              <label>CUPOF</label>
              <select
                {...register("cupof")}
                disabled={cupofsDisponibles.length === 0}
              >
                <option value="">
                  {cupofsDisponibles.length === 0
                    ? "No aplica para este cargo"
                    : "Seleccionar CUPOF"}
                </option>

                {cupofsDisponibles.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* FECHA DE INGRESO — debajo del CUPOF */}
            <div className="field">
              <label>Fecha de ingreso</label>

              <div className="fecha-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={usarHoy}
                    onChange={toggleFechaIngreso}
                  />
                  Usar fecha actual
                </label>
              </div>

              {errors.fechaDeIngreso && (
                <span className="error">{errors.fechaDeIngreso.message}</span>
              )}
            </div>

            <div className="field">
              <input
                type="date"
                className="fecha-input"
                {...register("fechaDeIngreso")}
                disabled={usarHoy}
              />
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

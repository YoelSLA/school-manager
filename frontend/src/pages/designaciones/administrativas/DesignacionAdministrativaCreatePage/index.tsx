import { useEscuela } from "@/context/EscuelaContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  DesignacionAdministrativaForm,
  designacionAdministrativaSchema,
} from "@/utils/schemas";

import { crearDesignacionAdministrativa } from "@/services/designacionesService";
import { RolEducativo } from "@/utils/types";
import "./designacionAdministrativaCreatePage.css";

export default function DesignacionAdministrativaCreatePage() {
  const navigate = useNavigate();
  const { escuelaActiva } = useEscuela();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(designacionAdministrativaSchema),
    defaultValues: {
      rolEducativo: RolEducativo.AUXILIAR,
      franjasHorarias: [
        { dia: "LUNES", horaDesde: "08:00", horaHasta: "12:00" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "franjasHorarias",
  });

  const onSubmit = async (data: DesignacionAdministrativaForm) => {
    try {
      await crearDesignacionAdministrativa(escuelaActiva!.id, data);
      navigate("/designaciones/administrativas/listar");
    } catch (error) {
      console.error(error);
      // luego podemos mapear errores de backend a RHF
      // navigate("/designaciones/administrativas/listar");
    }
  };

  return (
    <div className="designacion-admin-create">
      <h1>Crear Designación Administrativa</h1>

      <p className="escuela-info">
        Escuela: <strong>{escuelaActiva?.nombre}</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        {/* CUPoF */}
        <label>
          CUPoF
          <input
            type="number"
            {...register("cupof", { valueAsNumber: true })}
          />
          {errors.cupof && <span>{errors.cupof.message}</span>}
        </label>

        {/* Rol educativo */}
        <label>
          Rol educativo
          <select {...register("rolEducativo")}>
            {Object.values(RolEducativo).map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))}
          </select>
        </label>

        {/* Franjas horarias */}
        <div className="franjas">
          <h3>Franjas horarias</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="franja-row">
              <select {...register(`franjasHorarias.${index}.dia`)}>
                {["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"].map(
                  (dia) => (
                    <option key={dia} value={dia}>
                      {dia}
                    </option>
                  )
                )}
              </select>

              <input
                type="time"
                {...register(`franjasHorarias.${index}.horaDesde`)}
              />

              <input
                type="time"
                {...register(`franjasHorarias.${index}.horaHasta`)}
              />

              <button
                type="button"
                className="danger"
                onClick={() => remove(index)}
              >
                ✕
              </button>

              {errors.franjasHorarias?.[index] && (
                <span className="error">
                  {errors.franjasHorarias[index]?.horaHasta?.message}
                </span>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                dia: "LUNES",
                horaDesde: "08:00",
                horaHasta: "12:00",
              })
            }
          >
            + Agregar franja
          </button>

          {errors.franjasHorarias?.message && (
            <p className="error">{errors.franjasHorarias.message}</p>
          )}
        </div>

        <div className="actions">
          <button
            type="button"
            className="secondary"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear designación"}
          </button>
        </div>
      </form>
    </div>
  );
}

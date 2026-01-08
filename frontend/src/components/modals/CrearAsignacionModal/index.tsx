import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { crearAsignacion } from "@/services/designacionesService";
import { AsignacionCreateDTO, asignacionSchema } from "@/utils/schemas";
import { EmpleadoAutocomplete } from "./EmpleadoAutocomplete";

type Props = {
  open: boolean;
  designacionId: number;
  onClose: () => void;
  onCreated: () => void; // 👈
};

/**
 * Modal para crear una nueva asignación (cargo) dentro de una designación.
 */
export function CrearAsignacionModal({
  open,
  designacionId,
  onClose,
  onCreated,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AsignacionCreateDTO>({
    resolver: zodResolver(asignacionSchema),
  });

  if (!open) return null;

  const onSubmit = async (data: AsignacionCreateDTO) => {
    console.log("designacionId:", designacionId);
    console.log("payload:", data);
    await crearAsignacion(designacionId, data);
    onCreated();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal small">
        {/* ===============================
            HEADER
        ================================ */}
        <header className="modal-header">
          <h3>Nuevo cargo</h3>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
          {/* ===============================
              EMPLEADO (AUTOCOMPLETE)
          ================================ */}
          <input
            type="hidden"
            {...register("empleadoId", { valueAsNumber: true })}
          />

          <EmpleadoAutocomplete
            name="empleadoId"
            setValue={setValue}
            error={errors.empleadoId}
          />

          {/* ===============================
              TIPO ASIGNACIÓN
          ================================ */}
          <label>Tipo de asignación</label>
          <select {...register("tipoAsignacion")}>
            <option value="">Seleccionar</option>
            <option value="NORMAL">Normal</option>
            <option value="CAMBIO_DE_FUNCION">Cambio de función</option>
            <option value="ARTICULO_13">Artículo 13</option>
            <option value="RECALIFICACION_LABORAL_DEFINITIVA">
              Recalificación laboral definitiva
            </option>
          </select>
          {errors.tipoAsignacion && (
            <span className="field-error">{errors.tipoAsignacion.message}</span>
          )}

          {/* ===============================
              FECHAS
          ================================ */}
          <label>Fecha toma de posesión</label>
          <input type="date" {...register("fechaTomaPosesion")} />
          {errors.fechaTomaPosesion && (
            <span className="field-error">
              {errors.fechaTomaPosesion.message}
            </span>
          )}

          <label>Fecha cese</label>
          <input type="date" {...register("fechaCese")} />

          {/* ===============================
              SITUACIÓN
          ================================ */}
          <label>Situación de revista</label>
          <input {...register("situacionDeRevista")} />
          {errors.situacionDeRevista && (
            <span className="field-error">
              {errors.situacionDeRevista.message}
            </span>
          )}

          {/* ===============================
              FOOTER
          ================================ */}
          <footer className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Crear
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

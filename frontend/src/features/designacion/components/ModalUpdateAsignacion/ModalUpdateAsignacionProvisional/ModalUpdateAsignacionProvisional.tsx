import type { z } from "zod";
import { EmpleadoSelector } from "@/features/empleadoEducativo/components";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import Modal from "@/shared/components/Modal";
import FieldInputFecha from "../../../../../shared/components/form/FormInputDate";
import FieldInputNumber from "../../../../../shared/components/form/FormInputNumber";
import type { updateProvisionalSchema } from "../../../../asignacion/form/schemas/updateProvisional.schema";
import { useUpdateProvisionalForm } from "../../../../asignacion/form/useUpdateProvisionalForm";
import { useUpdateProvisional } from "../../../../asignacion/hooks/mutations/useUpdateProvisional";
import styles from "../ModalUpdateAsignacion.module.scss";

type Props = {
  designacionId: number;
  asignacionId: number;
  empleadoInicial: EmpleadoEducativoBasicoDTO | null;
  fechaDesde: string;
  fechaHasta: string | null;
  secuencia: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ModalUpdateAsignacionProvisional({
  designacionId,
  asignacionId,
  empleadoInicial,
  fechaDesde,
  fechaHasta,
  secuencia,
  onClose,
  onSuccess,
}: Props) {
  const actualizarProvisional = useUpdateProvisional({
    designacionId,
    asignacionId,
    onClose,
    onSuccess,
  });

  if (!fechaHasta) {
    throw new Error("fechaHasta es requerida");
  }

  const provisionalForm = useUpdateProvisionalForm({
    defaultValues: {
      empleadoId: empleadoInicial?.id,
      fechaTomaPosesion: fechaDesde,
      fechaCese: fechaHasta,
      secuencia: secuencia ?? 1,
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = provisionalForm.form;

  const onSubmit = async (data: z.output<typeof updateProvisionalSchema>) => {
    if (!data.empleadoId) return;

    await actualizarProvisional.mutateAsync({
      empleadoId: data.empleadoId,
      fechaTomaPosesion: data.fechaTomaPosesion,
      fechaCese: data.fechaCese,
      secuencia: data.secuencia,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        title="Editar asignación provisional"
        size="medium"
        onCancel={onClose}
        confirmLabel={
          actualizarProvisional.isPending ? "Guardando…" : "Guardar cambios"
        }
        isSubmitting={actualizarProvisional.isPending}
      >
        <div className={styles.body}>
          {/* EMPLEADO */}
          <div className={`${styles.sectionCard} ${styles.sectionEmpleado}`}>
            <EmpleadoSelector
              defaultEmpleado={empleadoInicial}
              onChange={(empleado) => setValue("empleadoId", empleado?.id)}
            />
          </div>

          {/* DATOS */}
          <div className={`${styles.sectionCard} ${styles.sectionDatos}`}>
            <div className={styles.row}>
              <div className={styles.field}>
                <FieldInputNumber
                  register={register}
                  name="secuencia"
                  label="Secuencia"
                  min={1}
                  error={errors.secuencia?.message}
                />
              </div>

              <div className={styles.field}>
                <FieldInputFecha
                  register={register}
                  name="fechaTomaPosesion"
                  label="Toma de posesión"
                  error={errors.fechaTomaPosesion?.message}
                />
              </div>

              <div className={styles.field}>
                <FieldInputFecha
                  register={register}
                  name="fechaCese"
                  label="Cese"
                  error={errors.fechaCese?.message}
                />
              </div>
            </div>
          </div>

          {errors.root && <p className={styles.error}>{errors.root.message}</p>}
        </div>
      </Modal>
    </form>
  );
}

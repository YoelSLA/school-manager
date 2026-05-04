import type { z } from "zod";
import FechaField from "@/components/forms/inputs/FechaInputField";
import NumberField from "@/components/forms/inputs/NumberFieldInput";
import Modal from "@/components/Modal";
import { EmpleadoSelector } from "@/features/empleadosEducativos/components/EmpleadoSelector";
import styles from "../ModalCreateAsignacion.module.scss";
import { useCreateProvisionalForm } from "@/features/asignaciones/form/useCreateProvisionalForm";
import type { createProvisionalSchema } from "@/features/asignaciones/form/createProvisional.schema";
import { useCreateProvisional } from "@/features/asignaciones/hooks/useCreateProvisional";

type Props = {
  designacionId: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ModalCreateAsignacionProvisional({
  designacionId,
  onClose,
  onSuccess,
}: Props) {
  const cubrirProvisional = useCreateProvisional({
    designacionId,
    onClose,
    onSuccess,
  });

  const provisionalForm = useCreateProvisionalForm();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = provisionalForm.form;

  const handleSubmitProvisional = async (
    data: z.output<typeof createProvisionalSchema>
  ) => {
    if (!data.empleadoId) return;

    await cubrirProvisional.mutateAsync({
      empleadoId: data.empleadoId,
      fechaTomaPosesion: data.fechaTomaPosesion,
      fechaCese: data.fechaCese,
      secuencia: data.secuencia,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitProvisional)}>
      <Modal
        title="Cubrir cargo para provisional"
        size="medium"
        onCancel={onClose}
        confirmLabel={
          cubrirProvisional.isPending ? "Creando…" : "Crear asignación"
        }
        isSubmitting={cubrirProvisional.isPending}
      >
        <div className={styles.body}>

          {/* EMPLEADO */}
          <div className={`${styles.sectionCard} ${styles.sectionEmpleado}`}>

            <EmpleadoSelector
              defaultEmpleado={null}
              onChange={(empleado) =>
                setValue("empleadoId", empleado?.id)
              }
            />
          </div>

          {/* DATOS */}
          <div className={`${styles.sectionCard} ${styles.sectionDatos}`}>

            <div className={styles.row}>
              <div className={styles.field}>
                <NumberField
                  register={register}
                  name="secuencia"
                  label="Secuencia"
                  min={1}
                  error={errors.secuencia?.message}
                />
              </div>

              <div className={styles.field}>
                <FechaField
                  register={register}
                  name="fechaTomaPosesion"
                  label="TOMA POSESIÓN"
                  error={errors.fechaTomaPosesion?.message}
                />
              </div>

              <div className={styles.field}>
                <FechaField
                  register={register}
                  name="fechaCese"
                  label="CESE"
                  error={errors.fechaCese?.message}
                />
              </div>
            </div>
          </div>

          {errors.root && (
            <p className={styles.error}>{errors.root.message}</p>
          )}
        </div>
      </Modal>
    </form>
  );
}
import { EmpleadoSelector } from "@/features/empleadoEducativo/components";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import { FormInputDate, FormInputNumber } from "@/shared/components/form";
import { Modal } from "@/shared/components/Modal";
import { useUpdateTitularForm } from "../../../form/hooks";
import { useUpdateTitular } from "../../../hooks/mutations";
import styles from "../ModalUpdateAsignacion.module.scss";

type Props = {
  designacionId: number;
  asignacionId: number;
  secuencia: number;
  empleadoInicial: EmpleadoEducativoBasicoDTO | null;
  tomaPosesion: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ModalUpdateAsignacionTitular({
  designacionId,
  asignacionId,
  secuencia,
  empleadoInicial,
  tomaPosesion,
  onClose,
  onSuccess,
}: Props) {
  const actualizarTitular = useUpdateTitular({
    designacionId,
    asignacionId,
    onClose,
    onSuccess,
  });

  const {
    register,
    errors,
    setValue,
    handleFormSubmit,
  } = useUpdateTitularForm({
    defaultValues: {
      empleadoId: empleadoInicial?.id,
      fechaTomaPosesion: tomaPosesion,
      secuencia: secuencia ?? 1,
    },
    onSubmit: async (data) => {
      if (!data.empleadoId) return;

      await actualizarTitular.mutateAsync({
        empleadoId: data.empleadoId,
        fechaTomaPosesion: data.fechaTomaPosesion,
        secuencia: data.secuencia,
        caracteristica:
          data.caracteristica === "NORMAL"
            ? undefined
            : data.caracteristica,
      });
    },
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Modal
        title="Editar asignación titular"
        size="medium"
        onCancel={onClose}
        confirmLabel={
          actualizarTitular.isPending
            ? "Guardando…"
            : "Guardar cambios"
        }
        isSubmitting={actualizarTitular.isPending}
      >
        <div className={styles.body}>
          <div className={`${styles.sectionCard} ${styles.sectionEmpleado}`}>
            <EmpleadoSelector
              defaultEmpleado={empleadoInicial}
              onChange={(empleado) =>
                setValue("empleadoId", empleado?.id)
              }
            />
          </div>

          <div className={`${styles.sectionCard} ${styles.sectionDatos}`}>
            <div className={styles.row}>
              <div className={styles.field}>
                <FormInputNumber
                  register={register}
                  name="secuencia"
                  label="Secuencia"
                  min={1}
                  error={errors.secuencia?.message}
                />
              </div>

              <div className={styles.field}>
                <FormInputDate
                  register={register}
                  name="fechaTomaPosesion"
                  label="Toma de posesión"
                  error={errors.fechaTomaPosesion?.message}
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
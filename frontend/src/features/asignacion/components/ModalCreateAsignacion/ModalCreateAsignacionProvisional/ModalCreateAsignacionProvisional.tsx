import { EmpleadoSelector } from "@/features/empleadoEducativo/components";
import { FormInputDate, FormInputNumber } from "@/shared/components";
import { Modal } from "@/shared/components/Modal";
import { useCreateProvisionalForm } from "../../../form/hooks";
import { useCreateProvisional } from "../../../hooks/mutations";
import styles from "../ModalCreateAsignacion.module.scss";

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

  const {
    register,
    errors,
    setValue,
    handleFormSubmit,
  } = useCreateProvisionalForm({
    onSubmit: async (data) => {
      if (!data.empleadoId) return;

      await cubrirProvisional.mutateAsync({
        empleadoId: data.empleadoId,
        fechaTomaPosesion: data.fechaTomaPosesion,
        fechaCese: data.fechaCese,
        secuencia: data.secuencia,
      });
    },
  });

  return (
    <form onSubmit={handleFormSubmit}>
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
          <div className={`${styles.sectionCard} ${styles.sectionEmpleado}`}>
            <EmpleadoSelector
              defaultEmpleado={null}
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
                  label="TOMA POSESIÓN"
                  error={errors.fechaTomaPosesion?.message}
                />
              </div>

              <div className={styles.field}>
                <FormInputDate
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
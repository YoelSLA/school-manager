import EmpleadoSelector from "@/features/empleadoEducativo/components/EmpleadoSelector";
import { FormInputDate, FormInputNumber } from "@/shared/components";
import { Modal } from "@/shared/components/Modal";
import { useCubrirDesignacionesConSuplenteForm } from "../../form/hooks";
import styles from "../LicenciaCoberturaModal.module.scss";

type Props = {
  licenciaId: number;
  designacionIds: number[];
  onClose: () => void;
  onSuccess: () => void;
};

export default function LicenciaCubrirDesignacionesModal({
  licenciaId,
  designacionIds,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    formState: { errors },
    onSubmit,
    setSuplente,
    isPending,
  } = useCubrirDesignacionesConSuplenteForm({
    licenciaId,
    designacionIds,
    onSuccess,
  });

  return (
    <form onSubmit={onSubmit}>
      <Modal
        title="Cubrir designaciones"
        size="medium"
        onCancel={onClose}
        confirmLabel={isPending ? "Cubriendo…" : "Confirmar cobertura"}
        isSubmitting={isPending}
      >
        <div className={styles.body}>
          <p className={styles.description}>
            Se cubrirán <strong>{designacionIds.length}</strong> designaciones
            afectadas por esta licencia.
          </p>

          <div className={styles.fieldGroup}>
            <div className={styles.selector}>
              <EmpleadoSelector
                onChange={(empleado) => setSuplente(empleado)}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.secuencia}>
                <FormInputNumber
                  register={register}
                  name="secuencia"
                  label="Secuencia"
                  min={1}
                  error={errors.secuencia?.message}
                />
              </div>

              <div className={styles.fecha}>
                <FormInputDate
                  register={register}
                  name="fechaTomaPosesion"
                  label="Fecha de toma de posesión"
                  error={errors.fechaTomaPosesion?.message}
                />
              </div>
            </div>

            {errors.root && (
              <p className={styles.error}>{errors.root.message}</p>
            )}
          </div>
        </div>
      </Modal>
    </form>
  );
}

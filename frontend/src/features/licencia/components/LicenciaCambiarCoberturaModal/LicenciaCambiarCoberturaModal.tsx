import { EmpleadoSelector } from "@/features/empleadoEducativo/components";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import { FormInputDate, FormInputNumber } from "@/shared/components";
import { Modal } from "@/shared/components/Modal";
import { useCambiarCoberturaForm } from "../../form/hooks/useCambiarCoberturaForm";
import styles from "../LicenciaCoberturaModal.module.scss";

type Props = {
  licenciaId: number;
  designacionId: number;
  secuencia: number;
  empleadoInicial: EmpleadoEducativoBasicoDTO | null;
  fechaInicial: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function LicenciaCambiarCoberturaModal({
  licenciaId,
  designacionId,
  secuencia,
  empleadoInicial,
  fechaInicial,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    formState: { errors },
    onSubmit,
    setEmpleado,
    isPending,
  } = useCambiarCoberturaForm({
    licenciaId,
    designacionId,
    secuencia,
    empleadoInicial,
    fechaInicial,
    onSuccess,
  });

  return (
    <form onSubmit={onSubmit}>
      <Modal
        title="Cambiar cobertura"
        size="xlarge"
        onCancel={onClose}
        confirmLabel={isPending ? "Cambiando cobertura…" : "Confirmar cambio"}
        isSubmitting={isPending}
      >
        <div className={styles.body}>
          <p className={styles.description}>
            Seleccione el nuevo empleado y la secuencia que tendrá en la
            cobertura.
          </p>

          <div className={styles.fieldGroup}>
            <div className={styles.selector}>
              <EmpleadoSelector
                defaultEmpleado={empleadoInicial}
                onChange={setEmpleado}
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

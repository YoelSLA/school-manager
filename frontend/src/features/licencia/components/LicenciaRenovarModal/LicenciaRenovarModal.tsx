import { useForm } from "react-hook-form";
import FormInputField from "@/shared/components/form/FormInput/FormInput";
import FormSelectField from "@/shared/components/form/FormSelect/FormSelect";
import Modal from "@/shared/components/Modal/Modal/Modal";
import { TIPOS_LICENCIA } from "../../constants/tipoLicencia";
import { useRenovarLicencia } from "../../hooks/mutations/useRenovarLicencia";
import type { RenovarLicenciaDTO } from "../../types";
import { agruparPorArticulo } from "../../utils";
import styles from "./LicenciaRenovarModal.module.scss";

type Props = {
  licenciaId: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function LicenciaRenovarModal({
  licenciaId,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RenovarLicenciaDTO>({
    defaultValues: {
      nuevoHasta: "",
      tipoLicencia: "",
      descripcion: "",
    },
  });

  const { mutateAsync: renovarLicencia, isPending } = useRenovarLicencia();

  const onConfirm = handleSubmit(async (data) => {
    await renovarLicencia({
      licenciaId,
      body: data,
    });

    onSuccess();
  });

  return (
    <form onSubmit={onConfirm}>
      <Modal
        size="medium"
        title="Renovar licencia"
        onCancel={onClose}
        confirmLabel="Confirmar"
        isSubmitting={isPending}
      >
        <section className={styles.body}>
          <FormInputField<RenovarLicenciaDTO>
            label="Nueva fecha de finalización"
            name="nuevoHasta"
            type="date"
            register={register}
            error={errors.nuevoHasta?.message}
          />

          <FormSelectField<RenovarLicenciaDTO>
            label="Tipo de licencia"
            name="tipoLicencia"
            register={register}
            error={errors.tipoLicencia?.message}
          >
            {Object.values(agruparPorArticulo(TIPOS_LICENCIA))
              .flat()
              .map((t) => (
                <option key={t.enumValue} value={t.enumValue}>
                  {t.codigo} — {t.descripcion}
                </option>
              ))}
          </FormSelectField>

          <FormInputField<RenovarLicenciaDTO>
            label="Descripción (opcional)"
            name="descripcion"
            register={register}
            error={errors.descripcion?.message}
          />
        </section>
      </Modal>
    </form>
  );
}
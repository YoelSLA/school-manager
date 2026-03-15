import ConfirmModal from "@/components/ConfirmModal";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function DisableEscuelaModal({
  open,
  onConfirm,
  onCancel,
  loading,
}: Props) {
  return (
    <ConfirmModal
      open={open}
      title="¿Deshabilitar escuela?"
      description="La escuela dejará de estar disponible en el sistema, pero podrá volver a habilitarse más adelante."
      confirmText="Deshabilitar"
      cancelText="Cancelar"
      onConfirm={onConfirm}
      onCancel={onCancel}
      loading={loading}
    />
  );
}
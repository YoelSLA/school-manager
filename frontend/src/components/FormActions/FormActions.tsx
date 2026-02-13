import Button from "@/components/Button";
import styles from "./FormActions.module.scss";

type Props = {
  isSubmitting?: boolean;
  label?: string;
  align?: "left" | "center" | "right";
};

export default function FormActions({
  isSubmitting = false,
  label = "Guardar",
  align = "right",
}: Props) {
  return (
    <div className={`${styles.actions} ${styles[align]}`}>
      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {label}
      </Button>
    </div>
  );
}

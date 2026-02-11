import Button from "@/components/Button";
import styles from "./LicenciaTimelineFooter.module.scss";

type Props = {
  puedeRenovar: boolean;
  onRenovar: () => void;
};

export default function LicenciaTimelineFooter({
  puedeRenovar,
  onRenovar,
}: Props) {
  return (
    <div className={styles.footer}>
      <Button
        variant="primary"
        size="sm"
        onClick={onRenovar}
        disabled={!puedeRenovar}
      >
        + Renovar licencia
      </Button>
    </div>
  );
}

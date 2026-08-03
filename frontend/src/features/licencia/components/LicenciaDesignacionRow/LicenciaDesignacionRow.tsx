import clsx from "clsx";
import { Hash } from "lucide-react";
import type { ReactNode } from "react";
import BadgeSituacionRevista from "@/shared/components/badges/BadgeSituacionRevista";
import PeriodoDisplay from "@/shared/components/PeriodoDisplay";
import Row from "@/shared/components/Table/TableRow";
import type {
  PeriodoDTO,
  SituacionDeRevista,
} from "@/shared/types";
import styles from "./LicenciaDesignacionRow.module.scss";

type Props = {
  checked: boolean;
  onToggle: () => void;

  cupof: number;

  headerContent: ReactNode;
  footerContent?: ReactNode;

  situacion: SituacionDeRevista;
  periodo: PeriodoDTO;
};

export default function LicenciaDesignacionRow({
  checked,
  onToggle,
  cupof,
  headerContent,
  footerContent,
  situacion,
  periodo,
}: Props) {
  return (
    <Row
      className={clsx(styles.row, checked && styles.selected)}
      onOpen={onToggle}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.cupof}>
            <Hash size={14} />
            {cupof}
          </div>

          <div className={styles.headerContent}>
            {headerContent}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.badge}>
            <BadgeSituacionRevista value={situacion} />
          </div>

          {footerContent && (
            <div className={styles.footerContent}>
              {footerContent}
            </div>
          )}

          <div className={styles.periodo}>
            <PeriodoDisplay
              periodo={periodo}
              showDuration={false}
            />
          </div>
        </div>
      </div>
    </Row>
  );
}
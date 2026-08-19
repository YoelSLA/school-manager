import clsx from "clsx";
import { Hash } from "lucide-react";
import type { ReactNode } from "react";
import { PeriodoDisplay } from "@/shared/components";
import { BadgeSituacionRevista } from "@/shared/components/Badge";
import { TableRow } from "@/shared/components/Table";
import type { PeriodoDTO, SituacionDeRevista } from "@/shared/types";
import styles from "./LicenciaDesignacionRow.module.scss";

type Props = {
	checked: boolean;
	onToggle: () => void;

	cupof: number;

	mainContent: ReactNode;
	rolContent?: ReactNode;

	situacion: SituacionDeRevista;
	periodo: PeriodoDTO;
};

export default function LicenciaDesignacionRow({
	checked,
	onToggle,
	cupof,
	mainContent,
	rolContent,
	situacion,
	periodo,
}: Props) {
	return (
		<TableRow
			className={clsx(styles.row, checked && styles.selected)}
			onOpen={onToggle}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={onToggle}
				onClick={(e) => e.stopPropagation()}
			/>

			<div className={styles.cupof}>
				<Hash size={14} />
				<span>{cupof}</span>
			</div>

			<div className={styles.mainContent}>{mainContent}</div>

			<div className={styles.rol}>{rolContent}</div>

			<div className={styles.situacion}>
				<BadgeSituacionRevista value={situacion} />
			</div>

			<div className={styles.periodo}>
				<PeriodoDisplay periodo={periodo} showDuration={false} />
			</div>
		</TableRow>
	);
}

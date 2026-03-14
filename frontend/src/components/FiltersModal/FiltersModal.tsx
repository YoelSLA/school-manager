import { Filter, RotateCcw, X } from "lucide-react";
import type { ReactNode } from "react";
import Button from "@/components/Button";

import styles from "./FiltersModal.module.scss";

type Props = {
	open: boolean;
	onClose: () => void;
	onClear?: () => void;
	onApply?: () => void;
	children: ReactNode;
};

export default function FiltersModal({
	open,
	onClose,
	onClear,
	onApply,
	children,
}: Props) {
	if (!open) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{/* HEADER */}
				<div className={styles.header}>
					<div className={styles.title}>
						<Filter size={18} />
						<h3>Filtros</h3>
					</div>

					<button className={styles.close} onClick={onClose}>
						<X size={18} />
					</button>
				</div>

				{/* BODY */}
				<div className={styles.body}>{children}</div>

				{/* FOOTER */}
				<div className={styles.footer}>
					<Button variant="danger" onClick={onClear}>
						<RotateCcw size={16} />
						Limpiar
					</Button>

					<Button onClick={onApply}>Aplicar filtros</Button>
				</div>
			</div>
		</div>
	);
}

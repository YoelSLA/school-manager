import Button from "@/components/Button";
import type { RolEducativo } from "@/features/designaciones/types/designacion.types";
import styles from "./AsistenciasSidebar.module.scss";

export type RolItem = {
	id: RolEducativo;
	label: string;
	count: number;
	checked: boolean;
};

type Props = {
	roles: RolItem[];
	onToggle: (rolId: RolEducativo) => void;
	onClear: () => void;
};

export default function AsistenciasSidebar({
	roles,
	onToggle,
	onClear,
}: Props) {
	return (
		<aside className={styles.sidebar}>
			<header className={styles.sidebar__header}>
				<h2 className={styles.sidebar__title}>FILTROS</h2>
			</header>

			<section className={styles.sidebar__section}>
				<span className={styles.sidebar__sectionTitle}>Rol educativo</span>

				<ul className={styles.sidebar__list}>
					{roles.map((rol) => (
						<li key={rol.id} className={styles.sidebar__item}>
							<label className={styles.sidebar__label}>
								<input
									type="checkbox"
									checked={rol.checked}
									onChange={() => onToggle(rol.id)}
								/>

								<span className={styles.sidebar__text}>{rol.label}</span>

								<span className={styles.sidebar__count}>({rol.count})</span>
							</label>
						</li>
					))}
				</ul>
			</section>

			<footer className={styles.sidebar__footer}>
				<Button variant="filter" size="sm" onClick={onClear}>
					Limpiar filtros
				</Button>
			</footer>
		</aside>
	);
}

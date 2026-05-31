import type { DesignacionLicenciaItemDTO } from "@/shared/utils/types";
import DesignacionAdministrativaRow from "./DesignacionAdministrativaRow/DesignacionAdministrativaRow";
import DesignacionCursoRow from "./DesignacionCursoRow/DesignacionCursoRow";
import styles from "./DesignacionesSelector.module.scss";

type Props = {
	designaciones: DesignacionLicenciaItemDTO[];
	loading: boolean;
	value: number[];
	onChange: (ids: number[]) => void;
	error?: string;
};

export default function DesignacionesSelector({
	designaciones,
	loading,
	value,
	onChange,
	error,
}: Props) {
	const toggle = (id: number) => {
		if (value.includes(id)) {
			onChange(value.filter((v) => v !== id));
		} else {
			onChange([...value, id]);
		}
	};

	if (loading) {
		return (
			<div className={styles.selector}>
				<h3 className={styles.title}>CARGOS</h3>
				<p className={styles.state}>Cargando designaciones...</p>
			</div>
		);
	}

	if (!designaciones.length) {
		return (
			<div className={styles.selector}>
				<h3 className={styles.title}>CARGOS</h3>
				<p className={styles.state}>No hay cargos activos.</p>
			</div>
		);
	}

	return (
		<div className={styles.selector}>
			<h3 className={styles.title}>CARGOS</h3>

			<div className={styles.list}>
				{designaciones.map((d) => {
					const checked = value.includes(d.id);

					if (d.tipoDesignacion === "CURSO") {
						return (
							<DesignacionCursoRow
								key={d.id}
								designacion={d}
								checked={checked}
								onToggle={toggle}
							/>
						);
					}

					return (
						<DesignacionAdministrativaRow
							key={d.id}
							designacion={d}
							checked={checked}
							onToggle={toggle}
						/>
					);
				})}
			</div>

			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
}

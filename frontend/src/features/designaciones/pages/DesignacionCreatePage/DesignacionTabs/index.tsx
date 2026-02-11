import type { TipoDesignacion } from "@/features/designaciones/types/designacion.types";
import styles from "./DesignacionTabs.module.scss";

type Props = {
	value: TipoDesignacion;
	onChange: (value: TipoDesignacion) => void;
};

export default function DesignacionTabs({ value, onChange }: Props) {
	return (
		<div className={styles["designacion-create__tabs"]}>
			<button
				type="button"
				className={`${styles["designacion-create__tab"]} ${
					value === "CURSO" ? styles["designacion-create__tab--active"] : ""
				}`}
				onClick={() => onChange("CURSO")}
			>
				Curso
			</button>

			<button
				type="button"
				className={`${styles["designacion-create__tab"]} ${
					value === "ADMIN" ? styles["designacion-create__tab--active"] : ""
				}`}
				onClick={() => onChange("ADMIN")}
			>
				Administrativa
			</button>
		</div>
	);
}

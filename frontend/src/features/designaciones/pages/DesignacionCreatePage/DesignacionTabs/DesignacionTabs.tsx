import type { TipoDesignacion } from "@/features/designaciones/types/designacion.types";
import Button from "@/components/Button/Button";
import styles from "./DesignacionTabs.module.scss";

type Props = {
	value: TipoDesignacion;
	onChange: (value: TipoDesignacion) => void;
};

export default function DesignacionTabs({ value, onChange }: Props) {
	return (
		<div className={styles["designacion-create__tabs"]}>
			<Button
				variant="filter"
				active={value === "ADMIN"}
				onClick={() => onChange("ADMIN")}
				className={styles["designacion-create__tab"]}
			>
				Administrativa
			</Button>
			<Button
				variant="filter"
				active={value === "CURSO"}
				onClick={() => onChange("CURSO")}
				className={styles["designacion-create__tab"]}
			>
				Curso
			</Button>
		</div>
	);
}

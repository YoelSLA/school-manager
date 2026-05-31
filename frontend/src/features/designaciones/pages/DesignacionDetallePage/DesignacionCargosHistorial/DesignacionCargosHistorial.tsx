import type {
	EmpleadoEducativoAsignacionItemDTO,
	FiltroCargos,
} from "@/shared/utils/types";
import styles from "./DesignacionCargosHistorial.module.scss";
import DesignacionCargosHistorialContent from "./DesignacionCargosHistorialContent/DesignacionCargosHistorialContent";
import DesignacionCargosHistorialHeader from "./DesignacionCargosHistorialHeader/DesignacionCargosHistorialHeader";

const MENSAJES: Record<FiltroCargos, string> = {
	LICENCIA: "No hay cargos por licencia",

	FINALIZADA: "No hay cargos finalizados",

	BAJA: "No hay cargos dados de baja",
};

type Props = {
	cargos: EmpleadoEducativoAsignacionItemDTO[];

	isLoading?: boolean;

	filtro: FiltroCargos;

	onChangeFiltro: (f: FiltroCargos) => void;

	onNuevoCargo: (tipo: "TITULAR" | "PROVISIONAL") => void;
};

export default function DesignacionCargosHistorial({
	cargos,
	isLoading = false,
	filtro,
	onChangeFiltro,
	onNuevoCargo,
}: Props) {
	return (
		<section className={styles.root}>
			<DesignacionCargosHistorialHeader
				filtro={filtro}
				onChangeFiltro={onChangeFiltro}
				onNuevoCargo={onNuevoCargo}
			/>

			<DesignacionCargosHistorialContent
				cargos={cargos}
				isLoading={isLoading}
				emptyMessage={MENSAJES[filtro]}
			/>
		</section>
	);
}

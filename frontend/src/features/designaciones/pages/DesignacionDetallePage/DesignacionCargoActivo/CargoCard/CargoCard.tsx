import { User } from "lucide-react";
import CargoCardMenu from "../CargoCardMenu";
import PeriodoCargo from "../PeriodoCargo";
import styles from "./CargoCard.module.scss";
import type { AsignacionDetalleDTO } from "@/utils/types";
import BadgeEstadoAsignacion from "@/components/BagdeEstadoAsignacion";
import BadgeSituacionRevista from "@/components/BadgeSituacionRevista/BadgeSituacionRevista";

type Props = {
	cargo: AsignacionDetalleDTO;
	onEditar?: (cargo: AsignacionDetalleDTO) => void;
};

export default function CargoCard({ cargo, onEditar }: Props) {
	const { empleado, periodo, situacionDeRevista, estadoAsignacion } = cargo;

	const esTitular = situacionDeRevista === "Titular";

	return (
		<div className={styles.card}>
			{esTitular && <CargoCardMenu onEditar={() => onEditar?.(cargo)} />}

			{/* EMPLEADO */}
			<div className={styles.row}>
				<User size={16} />
				<div>
					<div className={styles.name}>
						{empleado.apellido}, {empleado.nombre}
					</div>
					<div className={styles.subtle}>{empleado.cuil}</div>
				</div>
			</div>

			{/* PERIODO */}
			<PeriodoCargo periodo={periodo} />

			{/* BADGES */}
			<div className={styles.badges}>
				<BadgeSituacionRevista value={situacionDeRevista} />
				<BadgeEstadoAsignacion value={estadoAsignacion} />
				{estadoAsignacion}
			</div>
		</div >
	);
}

import type { AsignacionDetalleDTO } from "@/shared/utils/types";
import { useAsignacionCard } from "../../hooks/useAsignacionCard";
import styles from "./AsignacionCard.module.scss";
import AsignacionCardBadges from "./AsignacionCardBadges";
import AsignacionCardPeriod from "./AsignacionCardDetails";
import AsignacionCardEmployee from "./AsignacionCardEmployee";
import AsignacionCardMenu from "./AsignacionCardMenu";

type Props = {
	cargo: AsignacionDetalleDTO;
	designacionId: number;
	onEditar?: (cargo: AsignacionDetalleDTO) => void;
};

export default function AsignacionCard(props: Props) {
	const vm = useAsignacionCard(props);

	return (
		<div className={styles.card}>
			{vm.showMenu && (
				<AsignacionCardMenu
					open={vm.open}
					onToggle={vm.toggleMenu}
					onEditar={vm.handleEditar}
					onDarDeBaja={vm.handleDarDeBaja}
					onEliminar={vm.handleEliminar}
				/>
			)}
			<AsignacionCardEmployee empleado={vm.empleado} />
			<AsignacionCardPeriod periodo={vm.periodo} secuencia={vm.secuencia} />
			<AsignacionCardBadges
				situacionDeRevista={vm.situacionDeRevista}
				estadoAsignacion={vm.estadoAsignacion}
			/>
		</div>
	);
}

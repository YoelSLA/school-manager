import Button from "@/components/Button";
import FilterPillGroup from "@/components/FilterPillGroup/FilterPillGroup";
import type {
	AsignacionDetalleDTO,
	FiltroCargos,
} from "@/features/asignaciones/types/asignacion.types";
import { FILTROS_CARGOS } from "@/features/asignaciones/utils/asignaciones.utils";
import CargoRow from "./CargoRow";
import styles from "./DesignacionCargosHistorial.module.scss";

const MENSAJES: Record<FiltroCargos, string> = {
	LICENCIA: "No hay cargos por licencia",
	FINALIZADA: "No hay cargos finalizados",
	BAJA: "No hay cargos dados de baja",
};

type Props = {
	cargos: AsignacionDetalleDTO[];
	isLoading?: boolean;
	filtro: FiltroCargos;
	onChangeFiltro: (f: FiltroCargos) => void;
	onNuevoCargo: () => void;
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
			{/* HEADER */}
			<div className={styles.header}>
				<FilterPillGroup<FiltroCargos>
					items={FILTROS_CARGOS}
					value={filtro}
					onChange={onChangeFiltro}
				/>

				<Button
					variant="primary"
					size="sm"
					onClick={onNuevoCargo}
					className={styles.create}
				>
					Nuevo cargo
				</Button>
			</div>

			{/* CONTENT */}
			<div className={styles.content}>
				{isLoading && <p className={styles.loading}>Cargando cargos…</p>}

				{!isLoading && cargos.length === 0 && (
					<p className={styles.empty}>{MENSAJES[filtro]}</p>
				)}

				{!isLoading && cargos.length > 0 && (
					<div>
						{cargos.map((cargo) => (
							<CargoRow key={cargo.id} cargo={cargo} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}

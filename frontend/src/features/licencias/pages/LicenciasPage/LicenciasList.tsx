import ListState from "@/components/ListState";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout";
import LicenciaCard from "../../components/LicenciaCard";
import type { LicenciaResumenDTO } from "../../types/licencia.types";

type Props = {
	licencias: LicenciaResumenDTO[];
	isLoading: boolean;
	isError: boolean;
	onRetry: () => void;
	onVerDetalle: (id: number) => void;
};

export default function LicenciasList({
	licencias,
	isLoading,
	isError,
	onRetry,
	onVerDetalle,
}: Props) {
	if (isLoading) {
		return <ListState>Cargando licencias…</ListState>;
	}

	if (isError) {
		return (
			<div>
				<p>No se pudieron cargar las licencias</p>
				<button type="button" onClick={onRetry}>
					Reintentar
				</button>
			</div>
		);
	}

	if (licencias.length === 0) {
		return <ListState>No hay licencias para mostrar</ListState>;
	}

	return (
		<ScrollableGridListLayout>
			{licencias.map((licencia) => (
				<LicenciaCard
					key={licencia.id}
					licencia={licencia}
					onVerDetalle={onVerDetalle}
				/>
			))}
		</ScrollableGridListLayout>
	);
}

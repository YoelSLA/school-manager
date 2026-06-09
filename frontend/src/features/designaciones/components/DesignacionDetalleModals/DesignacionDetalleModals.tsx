import ModalCreateAsignacionProvisional from "@/features/asignaciones/components/ModalCreateAsignacion/ModalCreateAsignacionProvisional/ModalCreateAsignacionProvisional";
import ModalCreateAsignacionTitular from "@/features/asignaciones/components/ModalCreateAsignacion/ModalCreateAsignacionTitular/ModalCreateAsignacionTitular";
import ModalUpdateAsignacionProvisional from "@/features/asignaciones/components/ModalUpdateAsignacion/ModalUpdateAsignacionProvisional";
import ModalUpdateAsignacionTitular from "@/features/asignaciones/components/ModalUpdateAsignacion/ModalUpdateAsignacionTitular";
import type {
	AsignacionDetalleDTO,
	DesignacionDetalleDTO,
} from "@/shared/types";

type Props = {
	id: number;
	designacion: DesignacionDetalleDTO;
	cargoAEditar: AsignacionDetalleDTO | null;
	tipoAsignacionCrear: "TITULAR" | "PROVISIONAL" | null;
	onCloseCrear: () => void;
	onCloseEditar: () => void;
	onSuccess: () => void;
};

export default function DesignacionDetalleModals({
	id,
	designacion,
	cargoAEditar,
	tipoAsignacionCrear,
	onCloseCrear,
	onCloseEditar,
	onSuccess,
}: Props) {
	return (
		<>
			{tipoAsignacionCrear === "TITULAR" && (
				<ModalCreateAsignacionTitular
					designacionId={designacion.id}
					secuencia={1}
					empleadoInicial={null}
					tomaPosesion={new Date().toISOString().slice(0, 10)}
					onClose={onCloseCrear}
					onSuccess={() => {
						onCloseCrear();
						onSuccess();
					}}
				/>
			)}

			{tipoAsignacionCrear === "PROVISIONAL" && (
				<ModalCreateAsignacionProvisional
					designacionId={designacion.id}
					onClose={onCloseCrear}
					onSuccess={() => {
						onCloseCrear();
						onSuccess();
					}}
				/>
			)}

			{cargoAEditar && cargoAEditar.situacionDeRevista === "TITULAR" && (
				<ModalUpdateAsignacionTitular
					asignacionId={cargoAEditar.id}
					designacionId={id}
					secuencia={cargoAEditar.secuencia ?? 1}
					empleadoInicial={cargoAEditar.empleadoEducativoBasico}
					tomaPosesion={cargoAEditar.periodo.fechaDesde}
					onClose={onCloseEditar}
					onSuccess={() => {
						onCloseEditar();
						onSuccess();
					}}
				/>
			)}

			{cargoAEditar &&
				cargoAEditar.situacionDeRevista === "PROVISIONAL" &&
				cargoAEditar.periodo.tipo === "CERRADO" && (
					<ModalUpdateAsignacionProvisional
						asignacionId={cargoAEditar.id}
						designacionId={id}
						secuencia={cargoAEditar.secuencia ?? 1}
						empleadoInicial={cargoAEditar.empleadoEducativoBasico}
						fechaDesde={cargoAEditar.periodo.fechaDesde}
						fechaHasta={cargoAEditar.periodo.fechaHasta}
						onClose={onCloseEditar}
						onSuccess={() => {
							onCloseEditar();
							onSuccess();
						}}
					/>
				)}
		</>
	);
}

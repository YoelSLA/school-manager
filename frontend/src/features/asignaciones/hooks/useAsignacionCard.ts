import { useState } from "react";
import { useDeleteAsignacion } from "@/features/asignaciones/hooks/useDeleteAsignacion";
import type { AsignacionDetalleDTO } from "@/shared/utils/types";

type Props = {
	cargo: AsignacionDetalleDTO;
	designacionId: number;
	onEditar?: (cargo: AsignacionDetalleDTO) => void;
};

export function useAsignacionCard({ cargo, designacionId, onEditar }: Props) {
	const [open, setOpen] = useState(false);

	const eliminarAsignacion = useDeleteAsignacion({
		designacionId,
		onSuccess: () => {},
	});

	const { empleado, periodo, situacionDeRevista, estadoAsignacion, secuencia } =
		cargo;

	const esSuplente = situacionDeRevista === "SUPLENTE";

	const showMenu = !esSuplente;

	const toggleMenu = () => {
		setOpen((prev) => !prev);
	};

	const closeMenu = () => {
		setOpen(false);
	};

	const handleEditar = () => {
		closeMenu();

		onEditar?.(cargo);
	};

	const handleDarDeBaja = () => {
		closeMenu();

		// TODO
	};

	const handleEliminar = () => {
		closeMenu();

		eliminarAsignacion.mutate(cargo.id);
	};

	return {
		open,
		showMenu,
		empleado,
		periodo,
		secuencia,
		situacionDeRevista,
		estadoAsignacion,
		toggleMenu,
		handleEditar,
		handleDarDeBaja,
		handleEliminar,
	};
}

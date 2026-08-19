import { useNavigate } from "react-router-dom";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type { LicenciaDetalleDTO, LicenciaRowDTO } from "../../types";

export function useLicenciaNavigation() {
	const navigate = useNavigate();

	return {
		/* =================================
		   LISTADO
		================================= */

		listado: () => {
			navigate("/licencias");
		},

		/* =================================
		   DETALLE DESDE LISTADO
		================================= */

		verDetalle: (licencia: LicenciaRowDTO) => {
			const breadcrumbs = [
				{
					label: "Licencias",
					to: "/licencias",
				},
				{
					label: `${licencia.empleado.apellido}, ${licencia.empleado.nombre}`,
				},
			];

			navigate(`/licencias/${licencia.id}`, {
				state: {
					breadcrumbs,
				},
			});
		},

		/* =================================
		   DETALLE DESDE ID
		================================= */

		verDetallePorId: (licenciaId: number) => {
			navigate(`/licencias/${licenciaId}`);
		},

		/* =================================
		   CREAR
		================================= */

		crear: () => {
			navigate("/licencias/crear");
		},

		/* =================================
		   EDITAR
		================================= */

		editar: (licenciaId: number) => {
			navigate(`/licencias/${licenciaId}/editar`);
		},

		/* =================================
		   FICHA DEL EMPLEADO
		================================= */

		verFicha: (empleado: EmpleadoEducativoBasicoDTO, licenciaId: number) => {
			const breadcrumbs = [
				{
					label: "Licencias",
					to: "/licencias",
				},
				{
					label: `${empleado.apellido}, ${empleado.nombre}`,
					to: `/licencias/${licenciaId}`,
				},
				{
					label: `${empleado.apellido}, ${empleado.nombre}`,
				},
			];

			navigate(`/empleadosEducativos/${empleado.id}`, {
				state: {
					breadcrumbs,
					empleado,
				},
			});
		},

		/* =================================
		   DESIGNACIONES
		================================= */

		verDesignaciones: (
			licenciaId: number,
			empleado: EmpleadoEducativoBasicoDTO,
			licencia: LicenciaDetalleDTO,
		) => {
			const empleadoNombre = `${empleado.apellido}, ${empleado.nombre}`;

			const breadcrumbs = [
				{
					label: "Licencias",
					to: "/licencias",
				},
				{
					label: empleadoNombre,
					to: `/licencias/${licenciaId}`,
				},
				{
					label: "Designaciones",
				},
			];

			navigate(`/licencias/${licenciaId}/designaciones`, {
				state: {
					breadcrumbs,
					empleado,
					licencia,
				},
			});
		},
	};
}

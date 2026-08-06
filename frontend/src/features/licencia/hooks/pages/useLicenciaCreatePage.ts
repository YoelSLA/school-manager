import { useState } from "react";
import { useAsignacionesActivas } from "@/features/empleadoEducativo/hooks";
import { getErrorMessage } from "@/shared/http/errorHandler";
import { useLicenciaForm } from "../../form/useLicenciaForm";
import type { LicenciaCreateDTO, LicenciaCreateFormValues } from "../../types";
import { useCrearLicencia } from "../mutations";

type ErrorState = {
	title: string;
	message: string;
} | null;

export function useLicenciaCreatePage() {
	const { crearLicencia, isLoading, error } = useCrearLicencia();
	const { form } = useLicenciaForm();

	const [empleadoId, setEmpleadoId] = useState<number | null>(null);
	const [empleadoError, setEmpleadoError] = useState<string | null>(null);
	const [modalError, setModalError] = useState<ErrorState>(null);

	const asignacionesIds = form.watch("asignacionesIds") ?? [];

	const asignaciones = useAsignacionesActivas(empleadoId);

	const onEmpleadoChange = (empleado: { id: number } | null) => {
		setEmpleadoId(empleado?.id ?? null);
		setEmpleadoError(null);
		form.setValue("asignacionesIds", []);
	};

	const onAsignacionesChange = (ids: number[]) => {
		form.setValue("asignacionesIds", ids);
	};

	const submit = async (data: LicenciaCreateFormValues) => {
		if (!empleadoId) {
			setEmpleadoError("Debe seleccionar un empleado");
			return;
		}

		const { fechaDesde, fechaHasta } = data.periodo;

		const payload: LicenciaCreateDTO = {
			...data,
			periodo: fechaHasta
				? {
						tipo: "CERRADO",
						fechaDesde,
						fechaHasta,
					}
				: {
						tipo: "ABIERTO",
						fechaDesde,
					},
			asignacionesIds: data.asignacionesIds.map(Number),
		};

		try {
			await crearLicencia({
				empleadoId,
				payload,
			});
		} catch (err) {
			setModalError({
				title: "Error al crear licencia",
				message: getErrorMessage(err, "No se pudo crear la licencia"),
			});
		}
	};

	return {
		form,

		empleado: {
			error: empleadoError,
			onChange: onEmpleadoChange,
		},

		asignaciones: {
			data: asignaciones.data,
			isLoading: asignaciones.isLoading,
			selectedIds: asignacionesIds.map(Number),
			onChange: onAsignacionesChange,
		},

		create: {
			submit,
			isPending: isLoading,
			error: error ? "No se pudo crear la licencia" : null,
		},

		error: {
			modal: modalError,
			close: () => setModalError(null),
		},
	};
}

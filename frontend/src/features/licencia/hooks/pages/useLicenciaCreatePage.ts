import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAsignacionesActivas } from "@/features/empleadoEducativo/hooks";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import { getErrorMessage } from "@/shared/http/errorHandler";
import { useLicenciaCreateForm } from "../../form/hooks";
import type { LicenciaCreateDTO, LicenciaCreateFormValues } from "../../types";
import { useCrearLicencia } from "../mutations";

type ErrorState = {
	title: string;
	message: string;
} | null;

type LocationState = {
	empleado?: EmpleadoEducativoBasicoDTO;
};

export function useLicenciaCreatePage() {
	const { empleadoId: empleadoIdParam } = useParams<{
		empleadoId: string;
	}>();

	const location = useLocation();
	const state = location.state as LocationState | null;

	const { crearLicencia, isLoading, error } = useCrearLicencia();
	const { form } = useLicenciaCreateForm();

	const [empleadoId, setEmpleadoId] = useState<number | null>(() => {
		if (!empleadoIdParam) {
			return null;
		}

		const id = Number(empleadoIdParam);

		return Number.isNaN(id) ? null : id;
	});

	const [empleadoError, setEmpleadoError] = useState<string | null>(null);
	const [modalError, setModalError] = useState<ErrorState>(null);

	const asignacionesIds = form.watch("asignacionesIds") ?? [];

	const asignaciones = useAsignacionesActivas(empleadoId);

	const empleadoInicial = state?.empleado ?? null;

	useEffect(() => {
		if (!empleadoIdParam) {
			setEmpleadoId(null);
			return;
		}

		const id = Number(empleadoIdParam);

		if (Number.isNaN(id)) {
			setEmpleadoId(null);
			setEmpleadoError("El empleado indicado no es válido");
			return;
		}

		setEmpleadoId(id);
		setEmpleadoError(null);
		form.setValue("asignacionesIds", []);
	}, [empleadoIdParam, form]);

	const onEmpleadoChange = (empleado: EmpleadoEducativoBasicoDTO | null) => {
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
			id: empleadoId,
			value: empleadoInicial,
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

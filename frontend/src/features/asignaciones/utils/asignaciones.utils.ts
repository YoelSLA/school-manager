import {
	CaracteristicaAsignacion,
	type FiltroCargos,
} from "../types/asignacion.types";

export const TIPO_ASIGNACION_OPTIONS = [
	{ value: "TITULAR", label: "Titular" },
	{ value: "PROVISIONAL", label: "Provisional" },
] as const;

export const CARACTERISTICA_ASIGNACION_LABELS: Record<
	CaracteristicaAsignacion,
	string
> = {
	[CaracteristicaAsignacion.NORMAL]: "Normal",
	[CaracteristicaAsignacion.CAMBIO_DE_FUNCION]: "Cambio de función",
	[CaracteristicaAsignacion.RECALIFICACION_LABORAL_DEFINITIVA]:
		"Recalificación laboral definitiva",
};

export const CARACTERISTICA_ASIGNACION_OPTIONS = [
	{
		value: CaracteristicaAsignacion.NORMAL,
		label: "Normal",
	},
	{
		value: CaracteristicaAsignacion.CAMBIO_DE_FUNCION,
		label: "Cambio de función",
	},
	{
		value: CaracteristicaAsignacion.RECALIFICACION_LABORAL_DEFINITIVA,
		label: "Recalificación laboral definitiva",
	},
];

export const FILTROS_CARGOS: {
	value: FiltroCargos;
	label: string;
}[] = [
		{ value: "LICENCIA", label: "Licencias" },
		{ value: "FINALIZADA", label: "Finalizados" },
		{ value: "BAJA", label: "Bajas" },
	];

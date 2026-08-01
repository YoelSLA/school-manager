import { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";

import { toDateString } from "../../utils";
import { useAsistenciasEmpleadoMes } from "../reactQuery/useAsistenciasEmpleadoMes";
import { useEliminarInasistencias } from "../reactQuery/useEliminarInasistencias";
import { useRegistrarInasistencias } from "../reactQuery/useRegistrarInasistencias";

export default function useAsistenciaDetallePage() {
	const { empleadoId } = useParams<{ empleadoId: string }>();

	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const location = useLocation();

	const empleado = location.state?.empleado;

	const empleadoIdNumber = Number(empleadoId);

	/* =========================================================
	 * MONTH
	 * =======================================================*/
	const now = new Date();

	const [month, setMonth] = useState<Date>(
		new Date(now.getFullYear(), now.getMonth()),
	);

	/* =========================================================
	 * REGISTER MODAL
	 * =======================================================*/
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	/* =========================================================
	 * DELETE MODAL
	 * =======================================================*/
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const [selectedDeleteDate, setSelectedDeleteDate] = useState<string | null>(
		null,
	);

	/* =========================================================
	 * QUERY
	 * =======================================================*/
	const {
		data: asistencias = [],
		isLoading,
		error,
	} = useAsistenciasEmpleadoMes(
		escuelaActiva?.id ?? 0,
		empleadoIdNumber,
		month.getFullYear(),
		month.getMonth() + 1,
		{
			enabled: !!empleadoIdNumber,
		},
	);

	/* =========================================================
	 * REGISTER MUTATION
	 * =======================================================*/
	const { mutate: registrarAsistencia, isPending } = useRegistrarInasistencias(
		escuelaActiva?.id ?? 0,
		empleadoIdNumber,
		month.getFullYear(),
		month.getMonth() + 1,
	);

	/* =========================================================
	 * DELETE MUTATION
	 * =======================================================*/
	const { mutate: eliminarInasistencia, isPending: isDeleting } =
		useEliminarInasistencias({
			escuelaId: escuelaActiva?.id ?? 0,
			empleadoId: empleadoIdNumber,
			anio: month.getFullYear(),
			mes: month.getMonth() + 1,
		});

	/* =========================================================
	 * MAP
	 * =======================================================*/
	const asistenciasMap = useMemo(() => {
		return asistencias.reduce(
			(acc, asistencia) => {
				acc[asistencia.fecha] = asistencia;

				return acc;
			},
			{} as Record<string, (typeof asistencias)[number]>,
		);
	}, [asistencias]);

	/* =========================================================
	 * DAY CLICK
	 * =======================================================*/
	const handleDayClick = (date: Date) => {
		setSelectedDate(date);

		const fecha = toDateString(date);

		const asistencia = asistenciasMap[fecha];

		// Registrar inasistencia
		if (!asistencia || asistencia.estadoAsistencia === "PRESENTE") {
			setIsModalOpen(true);

			return;
		}

		// Eliminar inasistencia manual
		if (
			asistencia.estadoAsistencia === "AUSENTE" &&
			asistencia.origenAsistencia === "MANUAL"
		) {
			setSelectedDeleteDate(fecha);

			setIsDeleteModalOpen(true);
		}
	};

	/* =========================================================
	 * CLOSE MODALS
	 * =======================================================*/
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);

		setSelectedDeleteDate(null);
	};

	/* =========================================================
	 * REGISTER
	 * =======================================================*/
	const confirmarRegistro = ({
		tipoLicencia,
		observacion,
	}: {
		tipoLicencia: string;
		observacion?: string;
	}) => {
		if (!selectedDate) {
			return;
		}

		const fecha = toDateString(selectedDate);

		registrarAsistencia(
			{
				empleadoId: empleadoIdNumber,
				fechas: [fecha],
				tipoLicencia,
				observacion,
			},
			{
				onSuccess: () => {
					closeModal();
				},
			},
		);
	};

	/* =========================================================
	 * DELETE
	 * =======================================================*/
	const confirmarEliminacion = () => {
		if (!selectedDeleteDate) {
			return;
		}

		eliminarInasistencia([selectedDeleteDate], {
			onSuccess: () => {
				closeDeleteModal();
			},
		});
	};

	return {
		empleado,

		month,
		setMonth,

		asistencias,
		asistenciasMap,

		selectedDate,

		isModalOpen,
		isDeleteModalOpen,

		isPending,
		isDeleting,

		isLoading,
		error,

		handleDayClick,

		closeModal,
		closeDeleteModal,

		confirmarRegistro,
		confirmarEliminacion,
	};
}

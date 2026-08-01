import { useState } from "react";
import { useParams } from "react-router-dom";
import { esUltimaLicencia } from "../../utils/licencia.utils";
import useDeleteLicencia from "../mutations/useDeleteLicencia";
import { useLicenciasNavigation } from "../navigation/useLicenciasNavigation";
import { useLicenciaDetalle } from "../queries/useLicenciaDetalle";
import { useLicenciaTimeline } from "../queries/useLicenciaTimeline";

export default function useLicenciaDetallePage() {
	const { licenciaId } = useParams<{ licenciaId: string }>();

	const licenciaIdNumber = Number(licenciaId);

	const navigation = useLicenciasNavigation();

	const [renovarVisible, setRenovarVisible] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const query = useLicenciaDetalle(licenciaIdNumber);

	const timelineQuery = useLicenciaTimeline(licenciaIdNumber);

	const puedeRenovar = esUltimaLicencia(
		timelineQuery.data ?? [],
		licenciaIdNumber,
	);

	const deleteMutation = useDeleteLicencia();

	function openDelete() {
		setDeleteModalOpen(true);
	}

	function closeDelete() {
		setDeleteModalOpen(false);
	}

	function openRenovar() {
		setRenovarVisible(true);
	}

	function closeRenovar() {
		setRenovarVisible(false);
	}

	function deleteLicencia() {
		if (!query.licencia) return;

		deleteMutation.mutate(query.licencia.id, {
			onSuccess: () => {
				closeDelete();
				navigation.listado();
			},
		});
	}

	return {
		licenciaId: licenciaIdNumber,

		navigation,

		query,

		timeline: timelineQuery,

		puedeRenovar,

		renovar: {
			open: openRenovar,
			close: closeRenovar,
			visible: renovarVisible,
		},

		delete: {
			open: openDelete,
			close: closeDelete,
			visible: deleteModalOpen,
			submit: deleteLicencia,
			isPending: deleteMutation.isPending,
		},
	};
}

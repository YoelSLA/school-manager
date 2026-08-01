import { useState } from "react";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { usePagination } from "@/shared/utils/hooks/usePagination";
import type { LicenciaResumenDTO } from "../../types";
import useDeleteLicencia from "../mutations/useDeleteLicencia";
import { useLicenciasNavigation } from "../navigation/useLicenciasNavigation";
import { useLicencias } from "../queries/useLicencias";

export default function useLicenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const navigation = useLicenciasNavigation();

	const { page, setPage, pageSize } = usePagination([escuelaActiva?.id]);

	/* =========================
     QUERY
  ========================= */

	const query = useLicencias(escuelaActiva?.id, page, pageSize);

	const licencias = query.data?.content ?? [];
	const totalPages = query.data?.totalPages ?? 0;

	/* =========================
     DELETE
  ========================= */

	const [licencia, setLicencia] = useState<LicenciaResumenDTO | null>(null);

	const remove = useDeleteLicencia();

	const submitDelete = () => {
		if (!licencia) return;

		remove.mutate(licencia.id, {
			onSuccess: () => setLicencia(null),
		});
	};

	return {
		query: {
			...query,
			licencias,
		},

		pagination: {
			page,
			setPage,
			totalPages,
		},

		navigation,

		delete: {
			licencia,
			open: setLicencia,
			close: () => setLicencia(null),
			submit: submitDelete,
			isPending: remove.isPending,
		},
	};
}

import type { UseQueryResult } from "@tanstack/react-query";
import type {
	DesignacionAdministrativaResumenDTO,
	DesignacionCursoResumenDTO,
	PageResponse,
} from "@/shared/utils/types";
import DesignacionesList from "./DesignacionesList";

type Props = {
	isAdmin: boolean;
	adminQuery: UseQueryResult<PageResponse<DesignacionAdministrativaResumenDTO>>;
	cursoQuery: UseQueryResult<PageResponse<DesignacionCursoResumenDTO>>;
	onVerDetalle:
		| ((d: DesignacionAdministrativaResumenDTO) => void)
		| ((d: DesignacionCursoResumenDTO) => void);
};

export default function DesignacionesContent({
	isAdmin,
	adminQuery,
	cursoQuery,
	onVerDetalle,
}: Props) {
	if (isAdmin) {
		const handleVerDetalle = onVerDetalle as (
			d: DesignacionAdministrativaResumenDTO,
		) => void;

		return (
			<DesignacionesList
				filtro="ADMIN"
				designaciones={adminQuery.data?.content ?? []}
				isLoading={adminQuery.isLoading}
				isError={adminQuery.isError}
				onVerDetalle={handleVerDetalle}
			/>
		);
	}

	const handleVerDetalle = onVerDetalle as (
		d: DesignacionCursoResumenDTO,
	) => void;

	return (
		<DesignacionesList
			filtro="CURSO"
			designaciones={cursoQuery.data?.content ?? []}
			isLoading={cursoQuery.isLoading}
			isError={cursoQuery.isError}
			onVerDetalle={handleVerDetalle}
		/>
	);
}

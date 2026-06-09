import type { UseQueryResult } from "@tanstack/react-query";
import type {
	DesignacionAdministrativaCardDTO,
	DesignacionCursoCardDTO,
	PageResponse,
} from "@/shared/types";
import DesignacionesList from "./DesignacionesList";

type Props = {
	isAdmin: boolean;
	adminQuery: UseQueryResult<PageResponse<DesignacionAdministrativaCardDTO>>;
	cursoQuery: UseQueryResult<PageResponse<DesignacionCursoCardDTO>>;
	onVerDetalle:
		| ((d: DesignacionAdministrativaCardDTO) => void)
		| ((d: DesignacionCursoCardDTO) => void);
};

export default function DesignacionesContent({
	isAdmin,
	adminQuery,
	cursoQuery,
	onVerDetalle,
}: Props) {
	if (isAdmin) {
		const handleVerDetalle = onVerDetalle as (
			d: DesignacionAdministrativaCardDTO,
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

	const handleVerDetalle = onVerDetalle as (d: DesignacionCursoCardDTO) => void;

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

import { useEffect, useState } from "react";
import { useDynamicPageSize } from "./useDynamicPageSize";

export function usePagination(deps: unknown[] = []) {
	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	/* =========================
        RESET PAGE
  ========================= */

	useEffect(() => {
		setPage(0);
		// biome-ignore lint/correctness/useExhaustiveDependencies: <"paso la lista por prop">
	}, deps);

	return {
		page,
		setPage,
		pageSize,
	};
}

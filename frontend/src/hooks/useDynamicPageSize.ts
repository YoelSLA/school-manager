import { useEffect, useState } from "react";

export function useDynamicPageSize(small: number = 8, large: number = 10) {
	const [pageSize, setPageSize] = useState(small);

	useEffect(() => {
		const updatePageSize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			if (width >= 1680 && height >= 900) {
				setPageSize(large);
			} else {
				setPageSize(small);
			}
		};

		updatePageSize();
		window.addEventListener("resize", updatePageSize);

		return () => window.removeEventListener("resize", updatePageSize);
	}, [small, large]);

	return pageSize;
}

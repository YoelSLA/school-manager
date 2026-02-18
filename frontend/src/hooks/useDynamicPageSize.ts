import { useEffect, useState } from "react";

export function useDynamicPageSize() {
	const [pageSize, setPageSize] = useState(8);

	useEffect(() => {
		const updatePageSize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			// 1920 x ~980
			if (width >= 1680 && height >= 900) {
				setPageSize(10);
			} else {
				setPageSize(8);
			}
		};

		updatePageSize();
		window.addEventListener("resize", updatePageSize);

		return () => window.removeEventListener("resize", updatePageSize);
	}, []);

	return pageSize;
}

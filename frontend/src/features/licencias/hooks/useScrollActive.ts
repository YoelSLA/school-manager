import { useEffect, useRef } from "react";

export function useScrollToActive() {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, []);

	return ref;
}

import { useEffect } from "react";
import { useUpdaterStore } from "./store";

export function useUpdaterSync() {
	const setState = useUpdaterStore((s) => s.setStateFromMain);

	useEffect(() => {
		if (!window.updater) return;

		const unsubscribe = window.updater.onState((data) => {
			setState(data);
		});

		return unsubscribe;
	}, [setState]);
}

import { useEffect, useState } from "react";

declare global {
	interface Window {
		require: any;
	}
}

export function useUpdater() {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [progress, setProgress] = useState(0);
	const [downloaded, setDownloaded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const { ipcRenderer } = window.require("electron");

		ipcRenderer.on("update_available", () => {
			setUpdateAvailable(true);
		});

		ipcRenderer.on("download_progress", (_: any, percent: number) => {
			setProgress(percent);
		});

		ipcRenderer.on("update_downloaded", () => {
			setDownloaded(true);
		});

		ipcRenderer.on("update_error", () => {
			setError(true);
		});

		return () => {
			ipcRenderer.removeAllListeners("update_available");
			ipcRenderer.removeAllListeners("download_progress");
			ipcRenderer.removeAllListeners("update_downloaded");
			ipcRenderer.removeAllListeners("update_error");
		};
	}, []);

	const restartApp = () => {
		const { ipcRenderer } = window.require("electron");
		ipcRenderer.send("restart_app");
	};

	return {
		updateAvailable,
		progress,
		downloaded,
		error,
		restartApp,
	};
}

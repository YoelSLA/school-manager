import type { Status } from "./store";

export type UpdaterState = {
	status: Status;
	progress?: number;
	version?: string;
	notes?: string;
};

declare global {
	interface Window {
		updater?: {
			onState: (callback: (data: UpdaterState) => void) => () => void;
			startDownload: () => void;
			restartApp: () => void;
		};
	}
}

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("updater", {
	onState: (cb) => {
		const listener = (_, data) => cb(data);
		ipcRenderer.on("updater_state", listener);

		return () => {
			ipcRenderer.removeListener("updater_state", listener);
		};
	},
	startDownload: () => ipcRenderer.send("start_download"),
	restartApp: () => ipcRenderer.send("restart_app"),
});

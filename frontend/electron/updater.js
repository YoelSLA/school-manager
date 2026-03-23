const { autoUpdater } = require("electron-updater");
const { getAllWindows } = require("./windowManager");

let updaterState = {
	status: "idle",
	progress: 0,
	version: null,
	notes: null,
};

function broadcast(channel, data) {
	getAllWindows().forEach((win) => {
		if (!win.isDestroyed()) {
			win.webContents.send(channel, data);
		}
	});
}

function setupAutoUpdater() {
	if (!require("electron").app.isPackaged) return;

	autoUpdater.autoDownload = false;
	autoUpdater.autoInstallOnAppQuit = false;

	setTimeout(() => {
		autoUpdater.checkForUpdatesAndNotify();
	}, 5000);

	autoUpdater.on("update-available", (info) => {
		updaterState = {
			status: "available",
			progress: 0,
			version: info.version,
			notes: info.releaseNotes,
		};

		broadcast("updater_state", updaterState);
	});

	autoUpdater.on("download-progress", (progress) => {
		updaterState.status = "downloading";
		updaterState.progress = Math.round(progress.percent);

		broadcast("updater_state", updaterState);
	});

	autoUpdater.on("update-downloaded", () => {
		updaterState.status = "downloaded";

		broadcast("updater_state", updaterState);
	});

	autoUpdater.on("error", () => {
		updaterState.status = "error";

		broadcast("updater_state", updaterState);
	});
}

function startDownload() {
	autoUpdater.downloadUpdate();
}

function restartApp() {
	autoUpdater.quitAndInstall();
}

module.exports = {
	setupAutoUpdater,
	startDownload,
	restartApp,
};

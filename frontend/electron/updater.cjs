const { autoUpdater } = require("electron-updater");
const { app } = require("electron");
const { getMainWindow } = require("./windowManager.cjs");

let updaterState = {
	status: "idle",
	progress: 0,
	version: null,
	notes: null,
};

function sendUpdaterState() {
	const mainWindow = getMainWindow();

	if (mainWindow && !mainWindow.isDestroyed()) {
		mainWindow.webContents.send("updater_state", updaterState);
	}
}

function setupAutoUpdater() {
	if (!app.isPackaged) {
		console.log("[updater] Modo desarrollo, updater deshabilitado");
		return;
	}

	console.log("[updater] Inicializando updater...");
	console.log("[updater] Versión actual:", app.getVersion());

	autoUpdater.autoDownload = false;
	autoUpdater.autoInstallOnAppQuit = false;

	autoUpdater.on("checking-for-update", () => {
		console.log("[updater] Buscando actualización...");
	});

	autoUpdater.on("update-available", (info) => {
		console.log("[updater] Actualización encontrada:", info);

		updaterState = {
			status: "available",
			progress: 0,
			version: info.version,
			notes: info.releaseNotes,
		};

		sendUpdaterState();
	});

	autoUpdater.on("update-not-available", (info) => {
		console.log("[updater] No hay actualizaciones disponibles", info);
	});

	autoUpdater.on("download-progress", (progress) => {
		console.log(
			`[updater] Descargando: ${Math.round(progress.percent)}% (${progress.transferred}/${progress.total})`,
		);

		updaterState.status = "downloading";
		updaterState.progress = Math.round(progress.percent);

		sendUpdaterState();
	});

	autoUpdater.on("update-downloaded", (info) => {
		console.log("[updater] Actualización descargada:", info);

		updaterState.status = "downloaded";

		sendUpdaterState();
	});

	autoUpdater.on("error", (error) => {
		console.error("[updater] Error:", error);

		updaterState.status = "error";

		sendUpdaterState();
	});

	setTimeout(() => {
		console.log("[updater] Ejecutando checkForUpdates()");
		autoUpdater.checkForUpdates();
	}, 5000);
}

function startDownload() {
	console.log("[updater] Iniciando descarga manual...");
	autoUpdater.downloadUpdate();
}

function restartApp() {
	console.log("[updater] Reiniciando e instalando actualización...");
	autoUpdater.quitAndInstall();
}

module.exports = {
	setupAutoUpdater,
	startDownload,
	restartApp,
};

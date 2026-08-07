const { autoUpdater } = require("electron-updater");
const { app } = require("electron");
const log = require("electron-log");
const { getMainWindow } = require("./windowManager.cjs");

// ==============================
// Logger
// ==============================

autoUpdater.logger = log;
log.transports.file.level = "debug";

log.info("========================================");
log.info("Aplicación iniciada");
log.info("Versión:", app.getVersion());
log.info("Ruta del log:", log.transports.file.getFile().path);
log.info("========================================");

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
		log.info("[updater] Modo desarrollo, updater deshabilitado");
		return;
	}

	log.info("[updater] Inicializando updater...");
	log.info("[updater] Versión actual:", app.getVersion());

	autoUpdater.autoDownload = false;
	autoUpdater.autoInstallOnAppQuit = false;

	autoUpdater.on("checking-for-update", () => {
		log.info("[updater] Buscando actualización...");

		updaterState.status = "checking";
		sendUpdaterState();
	});

	autoUpdater.on("update-available", (info) => {
		log.info("[updater] Actualización encontrada");
		log.info(info);

		updaterState = {
			status: "available",
			progress: 0,
			version: info.version,
			notes: info.releaseNotes,
		};

		sendUpdaterState();
	});

	autoUpdater.on("update-not-available", (info) => {
		log.info("[updater] No hay actualizaciones");
		log.info(info);

		updaterState = {
			status: "idle",
			progress: 0,
			version: null,
			notes: null,
		};

		sendUpdaterState();
	});

	autoUpdater.on("download-progress", (progress) => {
		log.info(
			`[updater] Descargando ${Math.round(progress.percent)}% (${progress.transferred}/${progress.total})`,
		);

		updaterState.status = "downloading";
		updaterState.progress = Math.round(progress.percent);

		sendUpdaterState();
	});

	autoUpdater.on("update-downloaded", (info) => {
		log.info("[updater] Actualización descargada");
		log.info(info);

		updaterState.status = "downloaded";

		sendUpdaterState();
	});

	autoUpdater.on("error", (error) => {
		log.error("[updater] Error");
		log.error(error);

		updaterState.status = "error";

		sendUpdaterState();
	});

	setTimeout(async () => {
		log.info("[updater] Ejecutando checkForUpdates()");

		try {
			const result = await autoUpdater.checkForUpdates();

			log.info("[updater] Resultado:");
			log.info(result);

			if (result?.updateInfo) {
				log.info("[updater] UpdateInfo:");
				log.info(result.updateInfo);
			}
		} catch (error) {
			log.error("[updater] Error completo durante checkForUpdates()");
			log.error(error);
		}
	}, 5000);
}

function startDownload() {
	log.info("[updater] Iniciando descarga manual");

	autoUpdater
		.downloadUpdate()
		.then(() => {
			log.info("[updater] downloadUpdate() finalizó");
		})
		.catch((error) => {
			log.error("[updater] Error al descargar");
			log.error(error);
		});
}

function restartApp() {
	log.info("[updater] Reiniciando e instalando actualización");

	autoUpdater.quitAndInstall();
}

module.exports = {
	setupAutoUpdater,
	startDownload,
	restartApp,
};

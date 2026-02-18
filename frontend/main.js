const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("node:path");

function createWindow() {
	const win = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 1300,
		minHeight: 720,
		resizable: true,
		maximizable: true,
		autoHideMenuBar: app.isPackaged,
		icon: path.join(__dirname, "build/school.ico"),
	});

	if (app.isPackaged) {
		Menu.setApplicationMenu(null);
		win.setMenuBarVisibility(false);
	}

	if (app.isPackaged) {
		win.loadFile(path.join(__dirname, "dist/index.html"));
	} else {
		win.loadURL("http://localhost:5173");
	}
}

app.whenReady().then(() => {
	createWindow();

	// 🔥 Solo chequea updates en producción
	if (app.isPackaged) {
		autoUpdater.checkForUpdatesAndNotify();
	}

	// Logs opcionales
	autoUpdater.on("checking-for-update", () => {
		console.log("Buscando actualización...");
	});

	autoUpdater.on("update-available", () => {
		console.log("Actualización disponible");
	});

	autoUpdater.on("update-not-available", () => {
		console.log("No hay actualizaciones");
	});

	autoUpdater.on("error", (err) => {
		console.log("Error en autoUpdater:", err);
	});

	autoUpdater.on("update-downloaded", () => {
		console.log("Actualización descargada. Reiniciando...");
		autoUpdater.quitAndInstall();
	});
});

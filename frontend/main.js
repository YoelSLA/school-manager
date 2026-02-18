const { app, BrowserWindow, Menu } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("node:path");

function createWindow() {
	const isDev = !app.isPackaged;

	const win = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 1300,
		minHeight: 720,
		resizable: true,
		maximizable: true,
		autoHideMenuBar: !isDev,
		icon: path.join(__dirname, "build/school.ico"),
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
	});

	if (!isDev) {
		Menu.setApplicationMenu(null);
		win.setMenuBarVisibility(false);
	}

	if (isDev) {
		win.loadURL("http://localhost:5173");
		win.webContents.openDevTools();
	} else {
		const indexPath = path.join(__dirname, "dist", "index.html");
		win.loadFile(indexPath);
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

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

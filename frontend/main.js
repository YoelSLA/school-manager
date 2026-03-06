const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("node:path");

let mainWindow;
const isDev = !app.isPackaged;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 1300,
		minHeight: 720,
		resizable: true,
		maximizable: true,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
	});

	if (isDev) {
		mainWindow.loadURL("http://localhost:5173");
		mainWindow.webContents.openDevTools({ mode: "detach" });
	} else {
		mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
	}
}

function setupAutoUpdater() {
	if (!app.isPackaged) return;

	autoUpdater.autoDownload = true;
	autoUpdater.autoInstallOnAppQuit = true;

	setTimeout(() => {
		autoUpdater.checkForUpdatesAndNotify();
	}, 5000);

	autoUpdater.on("checking-for-update", () => {
		console.log("🔎 Buscando actualización...");
	});

	autoUpdater.on("update-available", () => {
		console.log("⬇️ Actualización disponible");
		mainWindow?.webContents.send("update_available");
	});

	autoUpdater.on("update-not-available", () => {
		console.log("✅ No hay actualizaciones");
	});

	autoUpdater.on("download-progress", (progress) => {
		const percent = Math.round(progress.percent);
		console.log(`📦 Descargando: ${percent}%`);
		mainWindow?.webContents.send("download_progress", percent);
	});

	autoUpdater.on("update-downloaded", () => {
		console.log("🎉 Actualización descargada");
		mainWindow?.webContents.send("update_downloaded");
	});

	autoUpdater.on("error", (err) => {
		console.error("❌ Error en autoUpdater:", err);
		mainWindow?.webContents.send("update_error");
	});
}

app.whenReady().then(() => {
	createWindow();
	setupAutoUpdater();

	ipcMain.on("restart_app", () => {
		console.log("🔄 Reiniciando aplicación...");
		autoUpdater.quitAndInstall();
	});
});

app.on("window-all-closed", () => {
	app.quit();
});

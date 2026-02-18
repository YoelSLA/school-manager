const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("node:path");

let mainWindow;

function createWindow() {
	const isDev = !app.isPackaged;

	mainWindow = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 1300,
		minHeight: 720,
		resizable: true,
		maximizable: true,
		autoHideMenuBar: !isDev,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
	});

	if (!isDev) {
		Menu.setApplicationMenu(null);
		mainWindow.setMenuBarVisibility(false);
	}

	if (isDev) {
		mainWindow.loadURL("http://localhost:5173");
		mainWindow.webContents.openDevTools();
	} else {
		const indexPath = path.join(__dirname, "dist", "index.html");
		mainWindow.loadFile(indexPath);
	}
}

app.whenReady().then(() => {
	createWindow();

	/* =========================
	   DEVTOOLS SHORTCUT
	========================= */
	globalShortcut.register("Control+Shift+I", () => {
		if (mainWindow) {
			mainWindow.webContents.openDevTools({ mode: "detach" });
		}
	});

	/* =========================
	   AUTO UPDATE
	========================= */

	if (app.isPackaged) {
		autoUpdater.checkForUpdatesAndNotify();
	}

	autoUpdater.on("checking-for-update", () => {
		console.log("🔎 Buscando actualización...");
	});

	autoUpdater.on("update-available", () => {
		console.log("⬇️ Actualización disponible");
		if (mainWindow) {
			mainWindow.webContents.send("update_available");
		}
	});

	autoUpdater.on("update-not-available", () => {
		console.log("✅ No hay actualizaciones");
	});

	autoUpdater.on("download-progress", (progressObj) => {
		const percent = Math.round(progressObj.percent);

		console.log(`📦 Descargando: ${percent}%`);

		if (mainWindow) {
			mainWindow.webContents.send("download_progress", percent);
		}
	});

	autoUpdater.on("update-downloaded", () => {
		console.log("🎉 Actualización descargada");

		// 🔥 YA NO reiniciamos automáticamente
		if (mainWindow) {
			mainWindow.webContents.send("update_downloaded");
		}
	});

	autoUpdater.on("error", (err) => {
		console.error("❌ Error en autoUpdater:", err);

		if (mainWindow) {
			mainWindow.webContents.send("update_error");
		}
	});

	/* =========================
	   IPC RESTART DESDE REACT
	========================= */

	ipcMain.on("restart_app", () => {
		console.log("🔄 Reiniciando aplicación...");
		autoUpdater.quitAndInstall();
	});
});

/* =========================
   LIMPIEZA
========================= */

app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

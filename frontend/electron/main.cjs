const { app, ipcMain, globalShortcut, Menu } = require("electron");
const { createWindow, getMainWindow } = require("./windowManager.cjs");
const {
	setupAutoUpdater,
	startDownload,
	restartApp,
} = require("./updater.cjs");

const isDev = !app.isPackaged;

app.whenReady().then(() => {
	// Ocultar menú solo en producción
	if (!isDev) {
		Menu.setApplicationMenu(null);
	}

	createWindow();

	// DEV TOOLS
	globalShortcut.register("F12", () => {
		getMainWindow()?.webContents.toggleDevTools();
	});

	globalShortcut.register("CommandOrControl+Shift+I", () => {
		getMainWindow()?.webContents.toggleDevTools();
	});

	// Updater
	setupAutoUpdater();

	// IPC
	ipcMain.on("start_download", startDownload);
	ipcMain.on("restart_app", restartApp);
});

// Cerrar app correctamente
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (getMainWindow() === null) {
		createWindow();
	}
});

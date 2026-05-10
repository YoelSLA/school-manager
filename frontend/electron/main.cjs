const { app, ipcMain, globalShortcut } = require("electron");
const { createWindow, getMainWindow } = require("./windowManager.cjs");
const {
	setupAutoUpdater,
	startDownload,
	restartApp,
} = require("./updater.cjs");

app.whenReady().then(() => {
	createWindow();

	// 🔥 DEV TOOLS (siempre habilitadas)
	globalShortcut.register("F12", () => {
		getMainWindow()?.webContents.toggleDevTools();
	});

	globalShortcut.register("CommandOrControl+Shift+I", () => {
		getMainWindow()?.webContents.toggleDevTools();
	});

	// 🔄 updater
	setupAutoUpdater();

	// 📡 IPC
	ipcMain.on("start_download", startDownload);
	ipcMain.on("restart_app", restartApp);
});

// 🛑 cerrar app correctamente
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

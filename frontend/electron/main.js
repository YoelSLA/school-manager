const { app, ipcMain, globalShortcut } = require("electron");
const { createWindow, getMainWindow } = require("./windowManager");
const { setupAutoUpdater, startDownload, restartApp } = require("./updater");

const isDev = !app.isPackaged;

app.whenReady().then(() => {
	createWindow();

	// 🔥 DEV TOOLS
	if (isDev) {
		globalShortcut.register("F12", () => {
			getMainWindow()?.webContents.toggleDevTools();
		});

		globalShortcut.register("CommandOrControl+Shift+I", () => {
			getMainWindow()?.webContents.toggleDevTools();
		});
	}

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

const { BrowserWindow, app } = require("electron");
const path = require("node:path");

const isDev = !app.isPackaged;

let mainWindow = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 1300,
		minHeight: 720,

		// Solo ocultar en producción
		autoHideMenuBar: !isDev,

		webPreferences: {
			preload: path.join(__dirname, "preload.cjs"),
		},
	});

	// Solo eliminar menú en producción
	if (!isDev) {
		mainWindow.removeMenu();
	}

	if (isDev) {
		mainWindow.loadURL("http://localhost:5173");
	} else {
		mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
	}

	return mainWindow;
}

function getMainWindow() {
	return mainWindow;
}

module.exports = {
	createWindow,
	getMainWindow,
};

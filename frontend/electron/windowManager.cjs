const { BrowserWindow, Menu, app } = require("electron");
const path = require("node:path");

const isDev = !app.isPackaged;

let mainWindow = null;

/*
	true  = mostrar menú
	false = ocultar menú
*/
const SHOW_MENU = true;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 1300,
		minHeight: 720,

		// Si es false, oculta automáticamente la barra
		autoHideMenuBar: !SHOW_MENU,

		webPreferences: {
			preload: path.join(__dirname, "preload.cjs"),
		},
	});

	// Mostrar u ocultar menú completamente
	if (!SHOW_MENU) {
		Menu.setApplicationMenu(null);
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

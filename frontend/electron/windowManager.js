const { BrowserWindow } = require("electron");
const path = require("node:path");

let mainWindow = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1366,
		height: 720,
		minWidth: 1300,
		minHeight: 720,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// 🔥 DEV vs PROD
	if (!require("electron").app.isPackaged) {
		mainWindow.loadURL("http://localhost:5173");
	} else {
		mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
	}

	return mainWindow;
}

function getMainWindow() {
	return mainWindow;
}

function getAllWindows() {
	return mainWindow ? [mainWindow] : [];
}

module.exports = {
	createWindow,
	getMainWindow,
	getAllWindows,
};

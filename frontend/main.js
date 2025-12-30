const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 🔴 NO preload
    }
  });

  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

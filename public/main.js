const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const os = require("os");
const url = require("url");
const isDev = require("electron-is-dev");
const ipcMain = electron.ipcMain;
const shell = electron.shell;

let mainWindow;

function createMainWindow() {
  isDev
    ? BrowserWindow.addDevToolsExtension(
        path.join(
          os.homedir(),
          "/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.7.0_2"
        )
      )
    : null;
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Invoice Generator",
    webPreferences: { nodeIntegration: true },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
// const Store = require("electron-store");
// const fs = require("fs");

/* function getData() {
  return JSON.parse(fs.readFileSync("../src/assets/data.json"));
} */

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1200, height: 800 });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  console.log(__dirname);
  // var data = getData();
  // console.log(data);
  // const store = new Store();
  const Database = require("better-sqlite3");
  const db = Database("./assets/test.db");
  const stmt = db.prepare("SELECT * FROM partyData");
  const info = stmt.run();
  console.log(info.changes);
  console.log(info.lastInsertRowid);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
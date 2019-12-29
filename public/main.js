const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const ipcMain = electron.ipcMain;
const shell = electron.shell

let mainWindow;
let invoiceWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({ width: 1200, height: 800, webPreferences: { nodeIntegration: true } });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createMainWindow);

ipcMain.on("preview-invoice", (event, args) => {
  invoiceWindow = new BrowserWindow({ width: 900, height: 800, webPreferences: { nodeIntegration: true } });
  invoiceWindow.loadURL(isDev ? `file://${path.join(__dirname, './invoice.html')}` : `file://${path.join(__dirname, '../build/invoice.html')}`);
  // invoiceWindow.webContents.openDevTools();
  invoiceWindow.on('closed', () => invoiceWindow = null);

  // invoiceWindow.webContents.send("get-args", {hello: "hey there!"});
});

ipcMain.on("print-to-pdf", (event) => {
  const pdfPath = path.join(__dirname, "../invoices/print.pdf");
  const window = BrowserWindow.fromWebContents(event.sender);
  window.webContents.printToPDF({
    landscape: false,
    pageSize: "A4"
  }, (error, data) => {
    console.log(data);
    console.log(error);
    pdfPath = error;
    if (error) {
      pdfPath = error;
    }
    try {
      fs.writeFile("~/Documents/Learning/print.pdf", data);
    } catch (error) {
      pdfPath = error;
    }
    /*     fs.writeFile(pdfPath, data, function (error) {
          if (error) { 
            // throw error;
            event.sender.send('wrote-pdf', error);
          }
          shell.openExternal('file://' + pdfPath);
          // event.sender.send('wrote-pdf', pdfPath);
        }); */
  });
  event.sender.send('wrote-pdf', pdfPath);
});

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
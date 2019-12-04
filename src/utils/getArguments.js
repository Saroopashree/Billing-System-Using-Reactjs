const ipcRenderer = require("electron").ipcRenderer;

var argsForInvoice;
ipcRenderer.on("get-args", (event, args) => {
  console.log(args);
  argsForInvoice = args;
});

export default argsForInvoice;
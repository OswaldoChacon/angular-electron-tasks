const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

app.commandLine.appendSwitch("lang", "en-US"); // Establecer el idioma de las DevTools a inglés

let appWin;

createWindow = () => {
  appWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Angular and Electron",
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  appWin.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "dist/angular-electron-tasks/browser/index.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  );  

  appWin.setMenu(null);

  appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

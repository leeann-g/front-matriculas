const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const ventana = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    ventana.loadURL('http://front-matriculas.test');
}

app.whenReady().then(createWindow); 
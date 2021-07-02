const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

//require('./header/header-actions-main')

function mainWindow() {
    const win = new BrowserWindow({
        // icon: path.join(__dirname,"../assets/icon.png"),
        frame: false,
        transparent: true,
        webPreferences:{
            nodeIntegration: true,
            //preload: path.join(__dirname, 'preload.js')
        },
    })
    
    win.loadFile('index.html')
}

app.whenReady().then(mainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow()
    }
})

// Faz com que o programa não inicie várias vezes durante a instalação
// if (require('electron-squirrel-startup')){
//     return app.quit();
// }
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const { writeFile } = require('fs')

require('./header/header-actions-main')

const args = process.argv

const argsLenght = process.env.NODE_ENV === 'production' ? 2 : 3

let filePath = args.length == argsLenght ? args[argsLenght - 1] : null

function mainWindow() {
    const win = new BrowserWindow({
        icon: path.join(__dirname, "../assets/icon.png"),
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
    })

    win.loadFile('index.html')
}

app.whenReady().then(mainWindow)

ipcMain.on('save', async (event, arg) => {
    const { content } = arg
    let canceled = false

    if (!filePath) {
        const window = BrowserWindow.getFocusedWindow()
        const options = {
            title: "Salvar Como: ",
            filters: [{ name: 'Arquivo de texto', extensions: ['txt'] }],
            defaultPath: "document.txt"
        }
            ; ({ canceled, filePath } = await dialog.showSaveDialog(window, options))
    }

    if (canceled) {
        return
    }

    console.table({ filePath, canceled })


    writeFile(filePath, content, (err, result) => {
        return 
    })
})

ipcMain.on('save-as', async (event, arg) => {
    const { content } = arg

    const window = BrowserWindow.getFocusedWindow()
    const options = {
        title: "Salvar Como: ",
        filters: [{ name: 'Arquivo de texto', extensions: ['txt'] }],
        defaultPath: "document.txt"
    }
    const { canceled, filePath: newFilePath } = await dialog.showSaveDialog(window, options)

    if (canceled) {
        return
    }

    console.table({ newFilePath, canceled })


    writeFile(newFilePath, content, (err, result) => {
        console.log(`Erro: ${err}\nResultado: ${result}`)
    })
})

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
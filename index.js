const textarea = document.querySelector('textarea')

textarea.onblur = () => textarea.focus()

const functions = {
    save() {
        ipcRenderer.send('save',{ content: textarea.value })
    },
    saveAs() {
        ipcRenderer.send('save-as',{ content: textarea.value })
    }
}

const shortcuts = {
    'ctrl+s': functions.save,
    'ctrl+shift+s': functions.saveAs
}

window.onkeydown = event => {
    const func = `${event.ctrlKey ? 'ctrl+' : ''}${event.shiftKey ? "shift+" : ''}${event.key.toLowerCase()}`
    shortcuts?.[func]?.()
}
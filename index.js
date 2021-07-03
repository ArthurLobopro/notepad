const textarea = document.querySelector('textarea')

const functions = {
    'ctrl+s': () => {
        console.log(textarea.value)
    }
}

window.onkeydown = event => {
    const func = `${event.ctrlKey ? 'ctrl+' : ''}${event.shiftKey ? "shift+" : ''}${event.key.toLowerCase()}`
    functions?.[func]?.()
}
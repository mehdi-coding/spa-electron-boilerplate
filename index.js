// For Electron
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// Load app configuration data
const appData = require('./src/config/appData.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow(src) {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 })
  win.maximize()
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, src),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  if (appData.dev) win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow)
app.on('ready', ezspaInit)

function ezspaInit() {
  
  // Load the window according to the Application settings
  if (appData.spa) {
    if (appData.dev) {
      createWindow(`./src/windows/${appData.devWindow}/build.html`);
    } else {
      createWindow(`./src/windows/${appData.defaultWindow}/index.html`);
    }
  } else {
    if (appData.dev) {
      createWindow(`./src/vcs/${appData.devVC}/build.html`);
    } else {
      createWindow(`./src/vcs/${appData.defaultVC}/index.html`);
    }
  }
}

// Windows Management
exports.newWindow = (windowName) => {
  let win = new BrowserWindow({ width: 800, height: 600})
  let dist ='';
  if (appData.dev) {
    dist = `./src/windows/${windowName}/build.html`;
  } else {
    dist = `./src/windows/${windowName}/index.html`;
  }
  win.loadURL(url.format({
    pathname: path.join(__dirname, dist),
    protocol: 'file:',
    slashes: true
  }))
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
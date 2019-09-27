import {app, BrowserWindow, systemPreferences, ipcMain, Menu, Tray} from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import db from './db'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, appIcon = null;

ipcMain.on('put-in-tray', (event) => {
  // const iconName = process.platform === 'win32' ? : ;
  const iconPath = path.join(__dirname, '/play.png')
  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([{
    label: '移除',
    click: () => {
      event.sender.send('tray-removed')
    }
  }])
  appIcon.setToolTip('示例')
  appIcon.setContextMenu(contextMenu)
})
ipcMain.on('remove-tray', ()=>{
  appIcon.destroy()
})


function createWindow () {
  let config = {
    width: 300,
    height: 300,
    titleBarStyle: "hidden",
    resizable:false,
    maximizable:false, // disable maximizable
    fullscreen:false, //  disable full screen expect OSX
    fullscreenable: false, //disable full screen in OSX
    hasShadow: true,
    // icon:"",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false // disable CORS
      // preload: path.join(__dirname, 'preload.js')
    }
  }
  console.log(systemPreferences.isDarkMode()) // darkmode test
  if(db.get('setting.window_position').write()) config = Object.assign({}, config, {x: db.get('setting.window_position.x').write(), y: db.get('setting.window_position.y').write()})
  mainWindow = new BrowserWindow(config)
  // and load the index.html of the app.
  if (isDev) {
       mainWindow.loadURL('http://localhost:3000/')
   } else {
       mainWindow.loadFile(path.join(__dirname, '/../build/index.html'))
   }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.webContents.openDevTools()
  })
  // Emitted when the window is closed.

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (aooIcon) appIcon.destroy();
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

app.on('will-quit',function(){
  // webContents.send() 
  let [x,y] = mainWindow.getPosition();
  db.set('setting.window_position', {x,y}).write();
})

//darkmode test
systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    console.log(systemPreferences.isDarkMode())
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

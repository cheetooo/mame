const {app} = require('electron')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(app.getPath('home') + '/.db.json')
const db = low(adapter)
const default_db = {
  app_setting: {
      volume: 0.5
  },
  setting: {
    window_position: {}
  }
}
db.defaults(default_db).write()

global.db = db
export default db
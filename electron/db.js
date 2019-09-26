import { app } from 'electron'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(app.getPath('home')+'/.db.json')
const db = low(adapter)
db.defaults({ app_setting:{volume: 0.5},setting:{position:{}} })
  .write()


global.db = db
export default db
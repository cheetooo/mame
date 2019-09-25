const low = require('lowdb')
const LocalStorage = require('lowdb/adapters/LocalStorage')

const adapter = new LocalStorage('db')
export const db = low(adapter)

db.defaults({ volume: 0.5 })
  .write()
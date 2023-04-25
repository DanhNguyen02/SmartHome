const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let instance = null;

class Database {
  constructor() {
    if (!instance) {
      client.connect((err, db) => {
        if (db) {
          this.db = db.db("smarthome");
          console.log("Successfully connected to MongoDB.");
        }
      });
      instance = this;
    }
    return instance;
  }

  getDb() {
    return this.db;
  }
}

module.exports = new Database();

export default class Database {
  constructor(json) {
    if (Database.exists) {
      return Database.instance
    }
    this.data = json
    Database.instance = this
    Database.exists = true
    return this
  }
  async get() {
    const response = await fetch(this.data)
    const result = await response.json()
    return result.recipes
  }
}
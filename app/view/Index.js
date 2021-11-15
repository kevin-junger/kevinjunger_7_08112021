export default class Index {
  constructor(data) {
    if (Index.exists) {
      return Index.instance
    }
    this.recipes = data
    Index.instance = this
    Index.exists = true
    return this
  }
  init() {
    console.log(this.recipes)
  }
}
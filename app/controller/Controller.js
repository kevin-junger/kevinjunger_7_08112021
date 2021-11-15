import Database from "./Database.js"

export default class Controller {
  constructor() {
    if (Controller.exists) {
      return Controller.instance
    }
    Controller.instance = this
    Controller.exists = true
    return this
  }
  init() {
    new Database('app/controller/recipes.json').get().then((data) => {
      console.log(data)
    })
  }
}
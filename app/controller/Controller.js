import Fail from "../view/Fail.js"
import Index from "../view/Index.js"

export default class Controller {
  constructor() {
    if (Controller.exists) {
      return Controller.instance
    }
    this.json = 'app/controller/recipes.json'
    Controller.instance = this
    Controller.exists = true
    return this
  }
  init() {
    fetch(this.json).then((response) => {
      return response.json()
    }).then((result) => {
      this.data = result.recipes
      new Index(this.data).init()
    }).catch((error) => {
      new Fail(error).init()
    })
  }
}
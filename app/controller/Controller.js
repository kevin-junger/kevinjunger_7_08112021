import Fail from '../view/Fail.js'
import Index from '../view/Index.js'

export default class Controller {
  constructor() {
    this.json = 'app/controller/recipes.json'
  }

  init() {
    fetch(this.json)
      .then((response) => response.json())
      .then((result) => {
        new Index(result.recipes).init()
      })
      .catch((error) => {
        new Fail(error).init()
      })
  }
}

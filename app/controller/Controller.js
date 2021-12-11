/**
 * class Controller
 * initiates the app by fetching data in the JSON file, then displaying the content
 */

import Fail from '../view/Fail.js'
import Index from '../view/Index.js'

export default class Controller {
  constructor() {
    this.json = 'app/controller/recipes.json' // path to the JSON file
  }

  init() {
    fetch(this.json)
      .then((response) => response.json())
      .then((result) => {
        // if JSON fetch correctly or no JS errors
        new Index(result.recipes).init()
      })
      .catch((error) => {
        // if any error arises
        new Fail(error).init()
      })
  }
}

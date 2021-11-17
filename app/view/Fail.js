export default class Fail {
  constructor(error) {
    this.error = error
  }

  init() {
    console.log(this.error)
  }
}

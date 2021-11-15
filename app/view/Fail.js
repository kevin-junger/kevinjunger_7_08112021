export default class Fail {
  constructor(error) {
    if (Fail.exists) {
      return Fail.instance
    }
    this.error = error
    Fail.instance = this
    Fail.exists = true
    return this
  }
  init() {
    console.log(this.error)
  }
}
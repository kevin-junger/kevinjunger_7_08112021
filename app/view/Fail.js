export default class Fail {
  constructor(error) {
    this.error = error
    this.wrapper = document.querySelector('.wrapper')
  }

  init() {
    this.wrapper.innerHTML = `
      <h2>Oups !</h2>
      <p>Une erreur s'est produite, veuillez réessayer.</p>
      <p>${this.error}</p>
    `
  }
}

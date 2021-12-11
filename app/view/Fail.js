/**
 * class Fail
 * called when the Controller catches an error
 */

export default class Fail {
  constructor(error) {
    this.error = error
    this.wrapper = document.querySelector('.wrapper')
  }

  init() {
    this.wrapper.innerHTML = `
      <div class="col">
        <h2 class="text-muted">Oups !</h2>
        <p class="text-muted">Une erreur s'est produite, veuillez réessayer.</p>
        <code>${this.error}</code>
      </div>
    `
  }
}

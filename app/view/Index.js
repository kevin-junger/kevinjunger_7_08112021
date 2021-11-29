export default class Index {
  constructor(data) {
    this.recipes = data
    this.search = document.querySelector('.search-input')
    this.searchBtn = document.querySelector('.search-btn')
    this.fineSearchDropdowns = document.querySelectorAll('.fine-search')
    this.wrapper = document.querySelector('.wrapper')
  }

  init() {
    this.initSearchEvents()
    this.initFineSearchEvents()
    this.displayCards(this.recipes)
  }

  initSearchEvents() {
    this.searchBtn.addEventListener('click', () => {
      this.getSearch()
    })
    this.search.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.getSearch()
      }
    })
    this.search.addEventListener('input', () => {
      if (this.search.value.trim().length >= 3) {
        this.getSearch()
      } else {
        this.displayCards(this.recipes)
      }
    })
  }

  initFineSearchEvents() {
    this.fineSearchDropdowns.forEach((dropdown) => {
      dropdown
        .querySelector('.fine-search-button')
        .addEventListener('click', () => {
          if (dropdown.classList.contains('open')) {
            dropdown.classList.remove('open')
            dropdown.classList.remove('rounded-top')
            dropdown.classList.toggle('rounded')
            dropdown
              .querySelector('.fine-search-label')
              .classList.remove('visually-hidden')
            dropdown
              .querySelector('.fine-search-list')
              .classList.toggle('visually-hidden')
            dropdown
              .querySelector('.fine-search-input')
              .classList.toggle('visually-hidden')
          } else {
            dropdown.classList.toggle('open')
            dropdown.classList.remove('rounded')
            dropdown.classList.toggle('rounded-top')
            dropdown
              .querySelector('.fine-search-label')
              .classList.toggle('visually-hidden')
            dropdown
              .querySelector('.fine-search-list')
              .classList.remove('visually-hidden')
            dropdown
              .querySelector('.fine-search-input')
              .classList.remove('visually-hidden')
            dropdown.querySelector('.fine-search-input').focus()
          }
        })
    })
  }

  getSearch() {
    const search = this.search.value.trim().toLowerCase()
    const results = []
    for (const recipe of this.recipes) {
      if (
        recipe.name.toLowerCase().includes(search) ||
        recipe.description.toLowerCase().includes(search) ||
        recipe.ingredients.find((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(search)
        )
      ) {
        results.push(recipe)
      }
    }
    this.displayCards(results)
  }

  displayCards(recipes) {
    this.wrapper.innerHTML = ''
    recipes.forEach((recipe) => {
      const card = `
        <div class="d-flex h-50 col-sm-12 col-md-6 col-lg-6 col-xl-4">
          <figure class="bg-light card">
            <img src="public/img/placeholder.webp" alt="" />
            <figcaption class="card-body">
              <div class="container-fluid">
                <div class="row">
                  <h2 class="h5 col-8 text-truncate">${recipe.name}</h2>
                  <span class="col-4 text-end"><i class="far fa-clock"></i> ${
                    recipe.time
                  } min</span
                  >
                </div>
                <div class="row">
                  <p class="col-sm-6">
                    ${recipe.ingredients
                      .map(
                        (ingredient) =>
                          `<strong>${ingredient.ingredient}</strong> : ${ingredient.quantity} ${ingredient.unit}`
                      )
                      .join('<br />')}
                  </p>
                  <p class="col-sm-6">
                    ${recipe.description}
                  </p>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      `
      this.wrapper.insertAdjacentHTML('beforeend', card)
    })
  }
}

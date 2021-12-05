export default class Index {
  constructor(data) {
    this.recipes = data
    this.search = document.querySelector('.search-input')
    this.searchBtn = document.querySelector('.search-btn')
    this.fineSearchDropdowns = document.querySelectorAll('.fine-search')
    this.wrapper = document.querySelector('.wrapper')
  }

  init() {
    this.initEvents()
    this.initDisplay()
  }

  initEvents() {
    this.searchBtn.addEventListener('click', () => {
      this.getSearch()
    })
    this.search.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.getSearch()
      }
    })
    this.search.addEventListener('input', () => {
      this.getSearch()
    })
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
      dropdown
        .querySelector('.fine-search-input')
        .addEventListener('input', () => {
          this.getFineSearchList(
            dropdown.id,
            dropdown
              .querySelector('.fine-search-input')
              .value.trim()
              .toLowerCase()
          )
        })
    })
  }

  initDisplay() {
    this.displayCards(this.recipes)
    this.getAllFineSearchLists(this.recipes)
  }

  getSearch() {
    const search = this.search.value.trim().toLowerCase()
    if (!search.length < 3) {
      const result = this.recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(search) ||
          recipe.description.toLowerCase().includes(search) ||
          recipe.appliance.toLowerCase().includes(search) ||
          recipe.utensils.find((utensil) =>
            utensil.toLowerCase().includes(search)
          ) ||
          recipe.ingredients.find((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(search)
          )
      )
      this.getAllFineSearchLists(result)
      this.displayCards(result)
    } else {
      this.getAllFineSearchLists(this.recipes)
      this.displayCards(this.recipes)
    }
  }

  getAllFineSearchLists(recipes) {
    this.fineSearchLists = {
      ingredients: [],
      appliances: [],
      utensils: [],
    }
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (!this.fineSearchLists.ingredients.includes(ingredient.ingredient)) {
          this.fineSearchLists.ingredients.push(ingredient.ingredient)
        }
      })
      if (!this.fineSearchLists.appliances.includes(recipe.appliance)) {
        this.fineSearchLists.appliances.push(recipe.appliance)
      }
      recipe.utensils.forEach((utensil) => {
        if (!this.fineSearchLists.utensils.includes(utensil)) {
          this.fineSearchLists.utensils.push(utensil)
        }
      })
    })
    this.displayAllFineSearchLists()
  }

  getFineSearchList(context, value) {
    const result = this.fineSearchLists[context].filter((item) =>
      item.toLowerCase().includes(value)
    )
    this.displayFineSearchList(context, result)
  }

  displayFineSearchList(context, items) {
    this.fineSearchDropdowns.forEach((dropdown) => {
      if (dropdown.id === context) {
        const list = dropdown.querySelector('ul')
        list.innerHTML = `${items
          .sort()
          .slice(0, 16)
          .map((element) => `<li>${element.toLowerCase()}</li>`)
          .join('')}`
      }
    })
  }

  displayAllFineSearchLists() {
    this.fineSearchDropdowns.forEach((dropdown) => {
      const list = dropdown.querySelector('ul')
      list.innerHTML = `${this.fineSearchLists[dropdown.id]
        .sort()
        .slice(0, 16)
        .map((element) => `<li>${element.toLowerCase()}</li>`)
        .join('')}`
    })
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

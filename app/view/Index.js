export default class Index {
  constructor(data) {
    this.recipes = data
    this.searchBar = document.querySelector('.search-input')
    this.searchBtn = document.querySelector('.search-btn')
    this.tags = document.querySelector('.tags')
    this.fineSearchDropdowns = document.querySelectorAll('.fine-search')
    this.wrapper = document.querySelector('.wrapper')
  }

  init() {
    this.searchBtn.addEventListener('click', () => {
      this.search(this.searchBar.value.trim().toLowerCase())
    })
    this.searchBar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.search(this.searchBar.value.trim().toLowerCase())
      }
    })
    this.searchBar.addEventListener('input', () => {
      this.search(this.searchBar.value.trim().toLowerCase())
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
          this.fineSearch(dropdown)
        })
    })
    this.search(this.searchBar.value.trim().toLowerCase())
    this.test()
  }

  search(value) {
    if (!value || value.length < 3) {
      this.searchResult = this.recipes
    } else {
      const result = this.recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(value) ||
          recipe.description.toLowerCase().includes(value) ||
          recipe.appliance.toLowerCase().includes(value) ||
          recipe.utensils.find((utensil) =>
            utensil.toLowerCase().includes(value)
          ) ||
          recipe.ingredients.find((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(value)
          )
      )
      const tags = this.tags.querySelectorAll('.tag')
      if (tags.length !== 0) {
        let filter = result
        tags.forEach((tag) => {
          switch (tag.getAttribute('data-category')) {
            case 'ingredients':
              filter = filter.filter((recipe) =>
                recipe.ingredients.find((ingredient) =>
                  ingredient.ingredient
                    .toLowerCase()
                    .includes(tag.textContent.trim().toLowerCase())
                )
              )
              break
            case 'appliances':
              filter = filter.filter((recipe) =>
                recipe.appliance
                  .toLowerCase()
                  .includes(tag.textContent.trim().toLowerCase())
              )
              break
            case 'utensils':
              filter = filter.filter((recipe) =>
                recipe.utensils.find((utensil) =>
                  utensil
                    .toLowerCase()
                    .includes(tag.textContent.trim().toLowerCase())
                )
              )
              break
            default:
              break
          }
        })
        this.searchResult = filter
      } else {
        this.searchResult = result
      }
    }
    this.fineSearchItems = {
      ingredients: [],
      appliances: [],
      utensils: [],
    }
    this.fineSearchDropdowns.forEach((dropdown) => {
      switch (dropdown.id) {
        case 'ingredients':
          this.searchResult.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
              if (
                !this.fineSearchItems.ingredients.includes(
                  ingredient.ingredient
                )
              ) {
                this.fineSearchItems.ingredients.push(ingredient.ingredient)
              }
            })
          })
          break
        case 'appliances':
          this.searchResult.forEach((recipe) => {
            if (!this.fineSearchItems.appliances.includes(recipe.appliance)) {
              this.fineSearchItems.appliances.push(recipe.appliance)
            }
          })
          break
        case 'utensils':
          this.searchResult.forEach((recipe) => {
            recipe.utensils.forEach((utensil) => {
              if (!this.fineSearchItems.utensils.includes(utensil)) {
                this.fineSearchItems.utensils.push(utensil)
              }
            })
          })
          break
        default:
          break
      }
      this.displayFineSearchList(this.fineSearchItems[dropdown.id], dropdown)
    })
    console.log(this.searchResult)
    this.displayCards(this.searchResult)
  }

  fineSearch(dropdown) {
    if (
      !dropdown.querySelector('.fine-search-input').value.trim().toLowerCase()
    ) {
      this.displayFineSearchList(this.fineSearchItems[dropdown.id], dropdown)
    } else {
      const result = this.fineSearchItems[dropdown.id].filter((item) =>
        item
          .toLowerCase()
          .includes(
            dropdown
              .querySelector('.fine-search-input')
              .value.trim()
              .toLowerCase()
          )
      )
      this.displayFineSearchList(result, dropdown)
    }
  }

  test() {
    const tags = this.tags.querySelectorAll('.tag')
    console.log(tags.length)
    tags.forEach((tag) => {
      console.log(
        `${tag.getAttribute('data-category')} ${tag.textContent
          .trim()
          .toLowerCase()}`
      )
    })
  }

  selectTag(category, name) {
    const tag = document.createElement('div')
    tag.setAttribute('data-category', category)
    tag.className = 'tag col-auto p-2 mt-2 me-3 text-white rounded'
    tag.innerHTML = `${name} <button class="bg-transparent border-0 text-white" type="button"><i class="far fa-times-circle"></i></button>`
    switch (category) {
      case 'ingredients':
        tag.classList.add('bg-primary')
        break
      case 'appliances':
        tag.classList.add('bg-success')
        break
      case 'utensils':
        tag.classList.add('bg-danger')
        break
      default:
        break
    }
    tag.querySelector('button').addEventListener('click', () => {
      this.deleteTag(tag)
    })
    this.tags.appendChild(tag)
    this.search(this.searchBar.value.trim().toLowerCase())
    this.test()
  }

  deleteTag(tag) {
    this.tags.removeChild(tag)
    this.search(this.searchBar.value.trim().toLowerCase())
    this.test()
  }

  displayFineSearchList(items, dropdown) {
    const list = dropdown.querySelector('ul')
    list.innerHTML = `${items
      .slice(0, 30)
      .map((element) => `<li>${element.toLowerCase()}</li>`)
      .join('')}`
    list.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', () => {
        this.selectTag(dropdown.id, item.textContent.trim().toLowerCase())
      })
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

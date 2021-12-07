export default class Index {
  constructor(data) {
    this.recipes = data
    this.searchBar = document.querySelector('.search-input')
    this.searchBtn = document.querySelector('.search-btn')
    this.tags = document.querySelector('.tags')
    this.filter = document.querySelectorAll('.filter')
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
    this.filter.forEach((filter) => {
      filter.querySelector('.filter-button').addEventListener('click', () => {
        if (filter.classList.contains('open')) {
          filter.classList.remove('open')
          filter.classList.remove('rounded-top')
          filter.classList.toggle('rounded')
          filter
            .querySelector('.filter-label')
            .classList.remove('visually-hidden')
          filter
            .querySelector('.filter-list')
            .classList.toggle('visually-hidden')
          filter
            .querySelector('.filter-input')
            .classList.toggle('visually-hidden')
        } else {
          filter.classList.toggle('open')
          filter.classList.remove('rounded')
          filter.classList.toggle('rounded-top')
          filter
            .querySelector('.filter-label')
            .classList.toggle('visually-hidden')
          filter
            .querySelector('.filter-list')
            .classList.remove('visually-hidden')
          filter
            .querySelector('.filter-input')
            .classList.remove('visually-hidden')
          filter.querySelector('.filter-input').focus()
        }
      })
      filter.querySelector('.filter-input').addEventListener('input', () => {
        this.searchInFilter(filter)
      })
    })
    this.search(this.searchBar.value.trim().toLowerCase())
  }

  search(value) {
    if (!value || value.length < 3) {
      this.searchResult = this.filterByTags(this.recipes)
    } else {
      const result = this.searchByValue(value)
      this.searchResult = this.filterByTags(result)
    }
    this.getTags()
    this.displayCards()
  }

  searchByValue(value) {
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
    return result
  }

  filterByTags(recipes) {
    const tags = this.tags.querySelectorAll('.tag')
    let result = recipes
    if (tags.length !== 0) {
      tags.forEach((tag) => {
        switch (tag.getAttribute('data-category')) {
          case 'ingredients':
            result = result.filter((recipe) =>
              recipe.ingredients.find((ingredient) =>
                ingredient.ingredient
                  .toLowerCase()
                  .includes(tag.textContent.trim().toLowerCase())
              )
            )
            break
          case 'appliances':
            result = result.filter((recipe) =>
              recipe.appliance
                .toLowerCase()
                .includes(tag.textContent.trim().toLowerCase())
            )
            break
          case 'utensils':
            result = result.filter((recipe) =>
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
    }
    return result
  }

  searchInFilter(filter) {
    if (!filter.querySelector('.filter-input').value.trim().toLowerCase()) {
      this.displayFilterList(this.filtersTags[filter.id], filter)
    } else {
      const result = this.filtersTags[filter.id].filter((item) =>
        item
          .toLowerCase()
          .includes(
            filter.querySelector('.filter-input').value.trim().toLowerCase()
          )
      )
      this.displayFilterList(result, filter)
    }
  }

  getTags() {
    this.filtersTags = {
      ingredients: [],
      appliances: [],
      utensils: [],
    }
    this.filter.forEach((filter) => {
      switch (filter.id) {
        case 'ingredients':
          this.searchResult.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
              if (
                !this.filtersTags.ingredients.includes(ingredient.ingredient)
              ) {
                this.filtersTags.ingredients.push(ingredient.ingredient)
              }
            })
          })
          break
        case 'appliances':
          this.searchResult.forEach((recipe) => {
            if (!this.filtersTags.appliances.includes(recipe.appliance)) {
              this.filtersTags.appliances.push(recipe.appliance)
            }
          })
          break
        case 'utensils':
          this.searchResult.forEach((recipe) => {
            recipe.utensils.forEach((utensil) => {
              if (!this.filtersTags.utensils.includes(utensil)) {
                this.filtersTags.utensils.push(utensil)
              }
            })
          })
          break
        default:
          break
      }
      this.displayFilterList(this.filtersTags[filter.id], filter)
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
  }

  deleteTag(tag) {
    this.tags.removeChild(tag)
    this.search(this.searchBar.value.trim().toLowerCase())
  }

  displayFilterList(tags, filter) {
    const list = filter.querySelector('ul')
    list.innerHTML = `${tags
      .slice(0, 30)
      .map((element) => `<li>${element.toLowerCase()}</li>`)
      .join('')}`
    list.querySelectorAll('li').forEach((tag) => {
      tag.addEventListener('click', () => {
        this.selectTag(filter.id, tag.textContent.trim().toLowerCase())
      })
    })
  }

  displayCards() {
    this.wrapper.innerHTML = ''
    this.searchResult.forEach((recipe) => {
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

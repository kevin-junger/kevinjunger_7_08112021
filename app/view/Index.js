/**
 * class Index
 * Display the content and handles all the search functions
 */

export default class Index {
  constructor(data) {
    this.recipes = data // data from JSON - should NEVER be modified
    /* DOM Elements */
    this.searchBar = document.querySelector('.search-input')
    this.searchBtn = document.querySelector('.search-btn')
    this.tags = document.querySelector('.tags')
    this.filter = document.querySelectorAll('.filter')
    this.wrapper = document.querySelector('.wrapper')
    /* --- */
    this.selectedTags = {
      // stores any new tags selected by the user
      ingredients: [],
      appliances: [],
      utensils: [],
    }
  }

  init() {
    /* Events */
    // search bar
    this.searchBtn.addEventListener('click', () => {
      this.#search(this.searchBar.value.trim().toLowerCase()) // if the search button is clicked
    })
    this.searchBar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.#search(this.searchBar.value.trim().toLowerCase()) // if the user presses Enter
      }
    })
    this.searchBar.addEventListener('input', () => {
      this.#search(this.searchBar.value.trim().toLowerCase()) // listens for input in the field
    })
    // filters
    document.addEventListener('click', (e) => {
      // closes any filter if the user clicks outside
      if (!e.target.closest('.filter')) {
        // otherwise the filters wouldn't open
        this.filter.forEach((filter) => {
          if (filter.classList.contains('open')) {
            filter.classList.remove('open')
            filter.classList.remove('rounded-top')
            filter.classList.add('rounded')
            filter
              .querySelector('.filter-label')
              .classList.remove('visually-hidden')
            filter
              .querySelector('.filter-list')
              .classList.add('visually-hidden')
            filter
              .querySelector('.filter-input')
              .classList.add('visually-hidden')
            filter.querySelector('.filter-input').value = ''
          }
        })
      }
    })
    this.filter.forEach((filter) => {
      filter
        .querySelector('.filter-button')
        .parentElement.addEventListener('click', (e) => {
          // allows to open/close each filter
          if (
            filter.classList.contains('open') &&
            !e.target.closest('.filter-input') // prevent the filter to close when the user clicks into the search field
          ) {
            filter.classList.remove('open')
            filter.classList.remove('rounded-top')
            filter.classList.add('rounded')
            filter
              .querySelector('.filter-label')
              .classList.remove('visually-hidden')
            filter
              .querySelector('.filter-list')
              .classList.add('visually-hidden')
            filter
              .querySelector('.filter-input')
              .classList.add('visually-hidden')
            filter.querySelector('.filter-input').value = ''
          } else {
            filter.classList.add('open')
            filter.classList.remove('rounded')
            filter.classList.add('rounded-top')
            filter
              .querySelector('.filter-label')
              .classList.add('visually-hidden')
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
        // allows search for a specific tag in each filter
        this.#searchInFilter(filter)
      })
    })
    /* --- */
    this.#search(this.searchBar.value.trim().toLowerCase()) // when page is loaded for the first time or reloaded, displays all recipes
  }

  /* Search and filtering-related functions */

  #search(value) {
    // search by value in the search bar AND/OR by tags
    if (!value || value.length < 3) {
      // if NO value or value is less than 3 chars (can also mean the user began his research by using tags only)
      this.searchResult = this.#filterByTags(this.recipes) // checks if tags are selected
    } else {
      /**
       * triggered when long-enough input has been done in the search bar
       * OR when new tags are selected and the input value remains the same and long-enough
       */
      const result = this.#filterByValue(value) // filters by input value first
      this.searchResult = this.#filterByTags(result) // then by tags (if any)
    }
    this.#getTags() // refresh the tags list for each search filter
    this.#display() // displays search result OR an error message if none
  }

  #filterByValue(value) {
    /**
     * creates and returns a new array with results from this.recipes
     * filtered by the input value on the search bar
     */
    const result = [] // new empty array for filtered results
    search_loop: for (let i = 0; i < this.recipes.length; i++) {
      // for all elements in this.recipes
      if (
        // if the recipe includes the value in its name OR description OR the appliance used
        this.recipes[i].name.toLowerCase().includes(value) ||
        this.recipes[i].description.toLowerCase().includes(value) ||
        this.recipes[i].appliance.toLowerCase().includes(value)
      ) {
        result.push(this.recipes[i]) // push the recipe into the result array
        continue // go to next recipe
      }
      for (let y = 0; y < this.recipes[i].utensils.length; y++) {
        if (this.recipes[i].utensils[y].toLowerCase().includes(value)) {
          // if one of the utensils used in the recipe matches
          result.push(this.recipes[i]) // push the recipe into the result array
          continue search_loop // go to next recipe
        }
      }
      for (let x = 0; x < this.recipes[i].ingredients.length; x++) {
        if (
          this.recipes[i].ingredients[x].ingredient
            .toLowerCase()
            .includes(value)
        ) {
          // if one of the ingredients used in the recipe matches
          result.push(this.recipes[i]) // push the recipe into the result array
          continue search_loop // go to next recipe
        }
      }
    }
    return result
  }

  #filterByTags(recipes) {
    /**
     * creates and returns a new array with results either filtered from this.recipes
     * (if no input from the user in the search bar) or the filtered results from #filterByValue()
     */
    const tags = this.tags.querySelectorAll('.tag') // selects any tag added in the DOM
    let result = recipes
    if (tags.length !== 0) {
      // if there's at least ONE tag in the DOM
      tags.forEach((tag) => {
        switch (tag.getAttribute('data-category')) {
          case 'ingredients': // filter by ingredients
            result = result.filter((recipe) =>
              recipe.ingredients.find(
                (ingredient) =>
                  ingredient.ingredient
                    .toLowerCase()
                    .includes(tag.textContent.trim().toLowerCase()) // keep the recipe if at one of the ingredients matches
              )
            )
            break
          case 'appliances': // filter by appliance
            result = result.filter(
              (recipe) =>
                recipe.appliance
                  .toLowerCase()
                  .includes(tag.textContent.trim().toLowerCase()) // keep the recipe if the appliance used matches
            )
            break
          case 'utensils': // filter by utensils
            result = result.filter((recipe) =>
              recipe.utensils.find(
                (utensil) =>
                  utensil
                    .toLowerCase()
                    .includes(tag.textContent.trim().toLowerCase()) // keep the recipe if at one of the ustensils used matches
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

  #searchInFilter(filter) {
    // allows the user to search for a specific tag by input in the search field in each filter
    if (!filter.querySelector('.filter-input').value.trim().toLowerCase()) {
      // if no input
      this.#displayFilterList(this.filtersTags[filter.id], filter) // displays all tags for that specific filter
    } else {
      // if input
      const result = this.filtersTags[filter.id].filter((item) =>
        item
          .toLowerCase()
          .includes(
            filter.querySelector('.filter-input').value.trim().toLowerCase()
          )
      )
      this.#displayFilterList(result, filter) // displays the filtered tags
    }
  }

  /* --- */

  /* Tags-related functions */

  #getTags() {
    // gets and stores the tags needed for the filters when the user makes a research
    this.filtersTags = {
      // the array where all the tags lists are stored before being displayed - rebuilt whenever a new research is made
      ingredients: [],
      appliances: [],
      utensils: [],
    }
    /**
     * for each filter (or category : ingredients, appliances and utensils),
     * parses each recipes and stores each ingredient, appliance or utensils, while making sure
     * it hasn't been stored before (avoids duplicates) and it doesn't correspond to a tag selected previously by the user
     */
    this.filter.forEach((filter) => {
      switch (filter.id) {
        case 'ingredients':
          this.searchResult.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
              if (
                !this.filtersTags.ingredients.includes(
                  ingredient.ingredient.trim().toLowerCase()
                ) &&
                !this.selectedTags.ingredients.includes(
                  ingredient.ingredient.trim().toLowerCase()
                )
              ) {
                this.filtersTags.ingredients.push(
                  ingredient.ingredient.trim().toLowerCase()
                )
              }
            })
          })
          break
        case 'appliances':
          this.searchResult.forEach((recipe) => {
            if (
              !this.filtersTags.appliances.includes(
                recipe.appliance.trim().toLowerCase()
              ) &&
              !this.selectedTags.appliances.includes(
                recipe.appliance.trim().toLowerCase()
              )
            ) {
              this.filtersTags.appliances.push(
                recipe.appliance.trim().toLowerCase()
              )
            }
          })
          break
        case 'utensils':
          this.searchResult.forEach((recipe) => {
            recipe.utensils.forEach((utensil) => {
              if (
                !this.filtersTags.utensils.includes(
                  utensil.trim().toLowerCase()
                ) &&
                !this.selectedTags.utensils.includes(
                  utensil.trim().toLowerCase()
                )
              ) {
                this.filtersTags.utensils.push(utensil.trim().toLowerCase())
              }
            })
          })
          break
        default:
          break
      }
      this.#displayFilterList(this.filtersTags[filter.id], filter)
    })
  }

  #selectTag(category, name) {
    /**
     * when the user clicks on any tag displayed in any filter, it adds it to the DOM,
     * pushes the corresponding data in the this.selectedTags array and initiates a new research
     */
    /* creation of the DOM element */
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
    /* --- */
    tag.querySelector('button').addEventListener('click', () => {
      // event triggered when the user clicks on the (x) button in the tag
      this.#deleteTag(tag)
    })
    this.tags.appendChild(tag) // adds the tag to the DOM
    this.selectedTags[category].push(name)
    this.#search(this.searchBar.value.trim().toLowerCase())
  }

  #deleteTag(tag) {
    /**
     * triggered when the user clicks on the (x) button in any tag
     * removes it from the DOM, deletes its entry in the this.selectedTags() array, and initiates a new research
     */
    this.tags.removeChild(tag)
    this.selectedTags[tag.getAttribute('data-category')] = this.selectedTags[
      tag.getAttribute('data-category')
    ].filter((item) => !item.includes(tag.textContent.trim()))
    this.#search(this.searchBar.value.trim().toLowerCase())
  }

  /* --- */

  /* Display-related functions */

  #displayFilterList(tags, filter) {
    // adds tags list to filter
    const list = filter.querySelector('ul')
    list.innerHTML = `${tags
      .slice(0, 30)
      .map((element) => `<li>${element.toLowerCase()}</li>`)
      .join('')}`
    list.querySelectorAll('li').forEach((tag) => {
      // event triggered when user clicks on any tag in the filter
      tag.addEventListener('click', () => {
        this.#selectTag(filter.id, tag.textContent.trim().toLowerCase())
      })
    })
  }

  #display() {
    /**
     * if this.searchResult contains at least one entry, displays the recipe(s)
     * else, displays an error message
     */
    if (this.searchResult.length > 0) {
      this.#displayCards()
    } else {
      this.wrapper.innerHTML = `
        <div class="col">
          <h2 class="text-center text-muted">Désolé, aucune recette ne correspond à votre recherche !</h2>
          <p class="text-center text-muted">Vous pouvez réessayer avec d'autres termes, comme "tarte aux pommes", "poisson"...</p>
        </div>
      `
    }
  }

  #displayCards() {
    /**
     * for each entry in this.searchResult, creates and adds a new recipe card to the DOM
     */
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

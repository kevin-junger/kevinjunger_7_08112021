// for fine-search dropdowns - temporary

const fine_search_inputs = document.querySelectorAll('.fine-search-input')
fine_search_inputs.forEach((input) => {
  input.addEventListener('focusin', () => {
    input.parentElement.classList.toggle('open')
    input.parentElement.classList.remove('rounded')
    input.parentElement.classList.toggle('rounded-top')
    input.parentElement.querySelector('.fine-search-label').classList.toggle('visually-hidden')
    input.setAttribute('placeholder','Rechercher...')
    input.parentElement.querySelector('.fine-search-list').classList.remove('visually-hidden')
  })
  input.addEventListener('focusout', () => {
    input.parentElement.classList.remove('open')
    input.parentElement.classList.remove('rounded-top')
    input.parentElement.classList.toggle('rounded')
    input.parentElement.querySelector('.fine-search-label').classList.remove('visually-hidden')
    input.setAttribute('placeholder','')
    input.parentElement.querySelector('.fine-search-list').classList.toggle('visually-hidden')
  })
})

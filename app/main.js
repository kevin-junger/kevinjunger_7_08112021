// for fine-search dropdowns - temporary

const fine_search_dropdowns = document.querySelectorAll('.fine-search')
fine_search_dropdowns.forEach((dropdown) => {
  dropdown.querySelector('.fine-search-button').addEventListener('click', () => {
    if(dropdown.classList.contains('open')){
      closeFineSearchDropdown(dropdown)
    } else {
      openFineSearchDropdown(dropdown)
    }
  })
})

function openFineSearchDropdown(dropdown) {
  dropdown.classList.toggle('open')
  dropdown.classList.remove('rounded')
  dropdown.classList.toggle('rounded-top')
  dropdown.querySelector('.fine-search-label').classList.toggle('visually-hidden')
  dropdown.querySelector('.fine-search-list').classList.remove('visually-hidden')
  dropdown.querySelector('.fine-search-input').classList.remove('visually-hidden')
  dropdown.querySelector('.fine-search-input').focus()
}
function closeFineSearchDropdown(dropdown) {
  dropdown.classList.remove('open')
  dropdown.classList.remove('rounded-top')
  dropdown.classList.toggle('rounded')
  dropdown.querySelector('.fine-search-label').classList.remove('visually-hidden')
  dropdown.querySelector('.fine-search-list').classList.toggle('visually-hidden')
  dropdown.querySelector('.fine-search-input').classList.toggle('visually-hidden')
}
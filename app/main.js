document.querySelector('#ingredient-input').addEventListener('focusin', () => {
  document.querySelector('label[for="ingredient-input"]').classList.toggle('visually-hidden')
  document.querySelector('.ingredient-list').classList.remove('visually-hidden')
})
document.querySelector('#ingredient-input').addEventListener('focusout', () => {
  document.querySelector('label[for="ingredient-input"]').classList.remove('visually-hidden')
  document.querySelector('.ingredient-list').classList.toggle('visually-hidden')
})

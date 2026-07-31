document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((item, index) => {
  item.style.setProperty('--delay', `${index * 90}ms`);
  requestAnimationFrame(() => item.classList.add('is-visible'));
});

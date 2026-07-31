document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15 });

revealItems.forEach((item, index) => {
  item.style.setProperty('--delay', `${index * 110}ms`);
  observer.observe(item);
});

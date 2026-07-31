document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((item, index) => {
  item.style.setProperty('--delay', `${index * 90}ms`);
  requestAnimationFrame(() => item.classList.add('is-visible'));
});

const cloud = document.querySelector('.cloud');
const cloudNote = document.querySelector('#cloud-note');
const tags = [...document.querySelectorAll('.cloud button')];

tags.forEach((tag) => {
  tag.addEventListener('click', () => {
    tags.forEach((item) => item.classList.toggle('is-active', item === tag));
    cloudNote.textContent = tag.dataset.note;
  });

  tag.addEventListener('focus', () => { cloudNote.textContent = tag.dataset.note; });
});

cloud?.addEventListener('pointermove', (event) => {
  const cloudRect = cloud.getBoundingClientRect();
  tags.forEach((tag) => {
    const rect = tag.getBoundingClientRect();
    const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
    const strength = Math.max(0, 1 - distance / 180);
    const x = ((rect.left + rect.width / 2 - event.clientX) / cloudRect.width) * strength * 10;
    const y = ((rect.top + rect.height / 2 - event.clientY) / cloudRect.height) * strength * 10;
    tag.style.setProperty('--x', `${x}px`);
    tag.style.setProperty('--y', `${y}px`);
  });
});

cloud?.addEventListener('pointerleave', () => tags.forEach((tag) => {
  tag.style.removeProperty('--x');
  tag.style.removeProperty('--y');
}));

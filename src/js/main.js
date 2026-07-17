import { initSplitFlaps } from './animation.js';

function updateClock() {
  const clock = document.querySelector('#local-time');
  if (!clock) return;

  const now = new Date();
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);

  clock.textContent = `${time} UTC+08`;
  clock.dateTime = now.toISOString();
}

function initNavigation() {
  const rows = [...document.querySelectorAll('.board-row')];
  const sections = rows
    .map((row) => document.querySelector(row.getAttribute('href')))
    .filter(Boolean);

  const activeGate = document.querySelector('#active-gate');
  const activeDestination = document.querySelector('#active-destination');

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    rows.forEach((row) => {
      const current = row.getAttribute('href') === `#${visible.target.id}`;
      row.classList.toggle('is-current', current);
      if (current) row.setAttribute('aria-current', 'location');
      else row.removeAttribute('aria-current');
      if (current) {
        activeGate.textContent = `GATE ${row.dataset.gate}`;
        activeDestination.textContent = `${row.dataset.label} / ${row.dataset.status}`;
      }
    });
  }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.6] });

  sections.forEach((section) => observer.observe(section));
}

document.querySelector('#year').textContent = new Date().getFullYear();
updateClock();
window.setInterval(updateClock, 60000);
initNavigation();
initSplitFlaps();

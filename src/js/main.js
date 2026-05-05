const LIGHT_PALETTE = [
  '#e2c4a0',
  '#bca888',
  '#a0b8a0',
  '#8aada2',
  '#98b5b8',
  '#a8a2b4',
  '#c0a8a0',
  '#b0aa98',
  '#9caea6',
  '#bcb49c',
  '#a2a0ae',
  '#b4b0a6',
];

const DARK_PALETTE = [
  '#5A4030',
  '#3A4838',
  '#2E4040',
  '#403848',
  '#4A3830',
  '#384038',
  '#3A3540',
  '#484038',
  '#2E3A38',
  '#403828',
  '#353040',
  '#383828',
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function generateBlobs() {
  const container = document.getElementById('bg-mesh');
  if (!container) return;

  const isDark = document.body.classList.contains('dark');
  const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE;

  container.innerHTML = '';

  const sheet = document.createElement('style');
  let css = '';

  for (let i = 0; i < 10; i++) {
    const size = rand(20, 50);
    const x = rand(-15, 85);
    const y = rand(-15, 85);
    const color = palette[i % palette.length];
    const duration = rand(14, 28);
    const delay = rand(-15, 0);
    const dx = rand(-12, 12);
    const dy = rand(-12, 12);
    const scaleEnd = rand(0.92, 1.08);

    css += `@keyframes bd${i}{0%{transform:translate(0,0) scale(1)}100%{transform:translate(${dx}vw,${dy}vh) scale(${scaleEnd})}}`;

    const blob = document.createElement('div');
    blob.classList.add('blob');
    blob.style.cssText = `width:${size}vmax;height:${size}vmax;left:${x}%;top:${y}%;background:${color};opacity:${rand(0.3, 0.55)};animation:bd${i} ${duration}s ease-in-out ${delay}s infinite alternate;`;

    container.appendChild(blob);
  }

  sheet.textContent = css;
  document.head.appendChild(sheet);
}

document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.15}s`;
  });

  const toggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }

  generateBlobs();

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    sunIcon.style.display = isDark ? 'none' : 'block';
    moonIcon.style.display = isDark ? 'block' : 'none';
    generateBlobs();
  });
});

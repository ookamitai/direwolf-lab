const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789–/ ';

function randomGlyph(target) {
  let glyph = target;
  while (glyph === target) glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  return glyph;
}

function createCharacter(character, index) {
  const cell = document.createElement('span');
  cell.className = 'flap-char';
  cell.style.setProperty('--index', index);
  cell.setAttribute('aria-hidden', 'true');

  const top = document.createElement('span');
  top.className = 'flap-half flap-top';
  top.textContent = character === ' ' ? '\u00a0' : character;

  const bottom = document.createElement('span');
  bottom.className = 'flap-half flap-bottom';
  bottom.textContent = character === ' ' ? '\u00a0' : character;

  cell.append(top, bottom);
  return cell;
}

function animateCharacter(cell, finalCharacter, delay) {
  const halves = cell.querySelectorAll('.flap-half');
  const intermediate = randomGlyph(finalCharacter);
  halves.forEach((half) => { half.textContent = intermediate === ' ' ? '\u00a0' : intermediate; });

  window.setTimeout(() => {
    cell.classList.add('is-flipping');
    window.setTimeout(() => {
      halves.forEach((half) => { half.textContent = finalCharacter === ' ' ? '\u00a0' : finalCharacter; });
    }, 105);
    window.setTimeout(() => cell.classList.remove('is-flipping'), 250);
  }, delay);
}

export function initSplitFlaps() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = [...document.querySelectorAll('[data-flap]')];

  labels.forEach((label, rowIndex) => {
    const text = label.dataset.flap;
    label.textContent = '';
    label.setAttribute('aria-label', text);

    [...text].forEach((character, characterIndex) => {
      const cell = createCharacter(character, characterIndex);
      label.appendChild(cell);
      if (!reducedMotion && character !== ' ') {
        animateCharacter(cell, character, 120 + rowIndex * 80 + characterIndex * 22);
      }
    });
  });
}

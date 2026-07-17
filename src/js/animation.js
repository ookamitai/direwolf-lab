const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const FLIP_DURATION = 96;

function displayGlyph(character) {
  return character === ' ' ? '\u00a0' : character;
}

function createPanel(className, character) {
  const panel = document.createElement('span');
  panel.className = `flap-panel ${className}`;

  const glyph = document.createElement('span');
  glyph.className = 'flap-glyph';
  glyph.textContent = displayGlyph(character);
  panel.appendChild(glyph);

  return panel;
}

function setPanel(panel, character) {
  panel.firstElementChild.textContent = displayGlyph(character);
}

function createCharacter(finalCharacter) {
  const initialCharacter = finalCharacter === ' ' ? ' ' : 'A';
  const cell = document.createElement('span');
  cell.className = 'flap-char';
  cell.setAttribute('aria-hidden', 'true');

  cell.append(
    createPanel('flap-static-top', initialCharacter),
    createPanel('flap-static-bottom', initialCharacter),
    createPanel('flap-moving-top', initialCharacter),
    createPanel('flap-moving-bottom', initialCharacter),
  );

  return cell;
}

function sequenceTo(character) {
  if (character === ' ') return [];

  const letterIndex = LETTERS.indexOf(character);
  if (letterIndex >= 0) return [...LETTERS.slice(1, letterIndex + 1)];

  const digitIndex = DIGITS.indexOf(character);
  if (digitIndex >= 0) return [...DIGITS.slice(0, digitIndex + 1)];

  return [character];
}

function flipOnce(cell, from, to) {
  const staticTop = cell.querySelector('.flap-static-top');
  const staticBottom = cell.querySelector('.flap-static-bottom');
  const movingTop = cell.querySelector('.flap-moving-top');
  const movingBottom = cell.querySelector('.flap-moving-bottom');

  setPanel(staticTop, to);
  setPanel(staticBottom, from);
  setPanel(movingTop, from);
  setPanel(movingBottom, to);

  cell.classList.remove('is-flipping');
  void cell.offsetWidth;
  cell.classList.add('is-flipping');

  return new Promise((resolve) => {
    window.setTimeout(() => {
      setPanel(staticBottom, to);
      cell.classList.remove('is-flipping');
      resolve();
    }, FLIP_DURATION);
  });
}

async function animateCharacter(cell, finalCharacter, delay) {
  await new Promise((resolve) => window.setTimeout(resolve, delay));

  let current = 'A';
  for (const next of sequenceTo(finalCharacter)) {
    await flipOnce(cell, current, next);
    current = next;
  }
}

export function initSplitFlaps() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = [...document.querySelectorAll('[data-flap]')];

  labels.forEach((label, rowIndex) => {
    const text = label.dataset.flap;
    label.textContent = '';
    label.setAttribute('aria-label', text);

    [...text].forEach((character, characterIndex) => {
      const cell = createCharacter(character);
      label.appendChild(cell);

      if (reducedMotion || character === ' ') {
        cell.querySelectorAll('.flap-panel').forEach((panel) => setPanel(panel, character));
        return;
      }

      animateCharacter(cell, character, 80 + rowIndex * 55 + characterIndex * 14);
    });
  });
}

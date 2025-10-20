import { initCounter, updateCounter } from './js/counter.js';
import { initConfetti } from './js/confetti.js';

async function init() {
  initCounter();
  initConfetti();

  try {
    const response = await fetch('/api/celebrate');
    if (response.ok) {
      const { count } = await response.json();
      updateCelebrateCount(count);
    }
  } catch (error) {
    console.error('Failed to fetch initial count:', error);
  }

  setInterval(updateCounter, 1000);
}

function updateCelebrateCount(count) {
  const celebrateElement = document.getElementById('celebrate-count');
  const padded = count.toString().padStart(6, '0');
  let html = '';
  padded.split('').forEach(digit => {
    html += `<span class="digit">${digit}</span>`;
  });
  celebrateElement.innerHTML = html;
}

init();
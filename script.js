import { initCounter, updateCounter } from './js/counter.js';
import { initConfetti } from './js/confetti.js';

async function init() {
  initCounter();
  initConfetti();

  try {
    const response = await fetch('/api/celebrate');
    if (response.ok) {
      const { count } = await response.json();
      document.getElementById('celebrate-count').textContent = `Celebrated ${count} times!`;
    }
  } catch (error) {
    console.error('Failed to fetch initial count:', error);
  }

  setInterval(updateCounter, 1000);
}

init();
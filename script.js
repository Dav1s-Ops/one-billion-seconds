import { initCounter, updateCounter } from './js/counter.js';
import { fireConfetti } from './js/confetti.js';
import { initCelebrateCounter, updateCelebrateCounter } from './js/celebrate_counter.js';

async function init() {
  initCounter();

  let currentCount = 0;

  try {
    const response = await fetch('/api/celebrate');
    if (response.ok) {
      const { count } = await response.json();
      currentCount = count;
      initCelebrateCounter(currentCount);
    }
  } catch (error) {
    console.error('Failed to fetch initial count:', error);
  }

  setInterval(updateCounter, 1000);

  const confettiBtn = document.getElementById('confetti-btn');
  confettiBtn.addEventListener('click', () => {
    currentCount++;
    updateCelebrateCounter(currentCount);
    fireConfetti();

    fetch('/api/celebrate', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json().then(({ count }) => {
            currentCount = Math.max(currentCount, count);
            updateCelebrateCounter(currentCount);
          });
        } else {
          throw new Error('Response not OK');
        }
      })
      .catch(error => {
        console.error('Failed to increment:', error);
        currentCount--;
        updateCelebrateCounter(currentCount);
      });
  });
}

init();
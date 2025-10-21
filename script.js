import { initCounter, updateCounter } from './js/counter.js';
import { fireConfetti } from './js/confetti.js';
import { initCelebrateCounter, updateCelebrateCounter } from './js/celebrate_counter.js';

async function init() {
  initCounter();

  initCelebrateCounter(0);

  const confettiBtn = document.getElementById('confetti-btn');
  confettiBtn.disabled = true;

  let currentCount = 0;

  try {
    const response = await fetch('/api/celebrate');
    if (response.ok) {
      const { count } = await response.json();
      if (count > 0) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: count,
          duration: 1 + Math.log10(count + 1),
          ease: "power1.out",
          onUpdate: function() {
            updateCelebrateCounter(Math.floor(this.targets()[0].val), 0.2);
          },
          onComplete: function() {
            currentCount = count;
            confettiBtn.disabled = false;
          }
        });
      } else {
        currentCount = count;
        confettiBtn.disabled = false;
      }
    } else {
      confettiBtn.disabled = false;
    }
  } catch (error) {
    console.error('Failed to fetch initial count:', error);
    confettiBtn.disabled = false;
  }

  setInterval(updateCounter, 1000);

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
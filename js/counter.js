import { updateMilestones } from './milestones.js';
import { updateProgress } from './progress.js';

export const birthDate = new Date(1994, 6, 3);
const counterElement = document.querySelector('.counter');
let previousDigits = [];
let lastSeconds = 0;

export const getSecondsAlive = () => Math.floor((Date.now() - birthDate.getTime()) / 1000);

export const formatNumber = (num) => num.toString().padStart(10, '0');

export function initCounter() {
  const currentSeconds = getSecondsAlive();
  const digits = formatNumber(currentSeconds).split('');
  let html = '';
  for (let i = 0; i < 10; i++) {
    if (i > 0 && i % 3 === 1) {
      html += '<span class="comma">,</span>';
    }
    html += `<span class="digit">${digits[i]}</span>`;
  }
  counterElement.innerHTML = html;
  previousDigits = digits;
  lastSeconds = currentSeconds;
  updateMilestones(currentSeconds);
  updateProgress(currentSeconds);
}

export function updateCounter() {
  const currentSeconds = getSecondsAlive();
  const digits = formatNumber(currentSeconds).split('');
  const digitElements = document.querySelectorAll('.digit');

  digits.forEach((digit, index) => {
    if (digit !== previousDigits[index]) {
      const el = digitElements[index];
      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          el.textContent = digit;
          gsap.set(el, { y: 20, opacity: 0, scaleY: 0 });
          gsap.to(el, {
            y: 0,
            opacity: 1,
            scaleY: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        },
      });
    }
  });

  previousDigits = digits;

  updateMilestones(currentSeconds);
  updateProgress(currentSeconds);
  lastSeconds = currentSeconds;
}
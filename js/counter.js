import { updateMilestones } from './milestones.js';
import { updateProgress } from './progress.js';

export const birthDate = new Date(1994, 6, 3);
const counterElement = document.querySelector('.counter');
let previousDigits = [];
let lastSeconds = 0;

export const getSecondsAlive = () => Math.floor((Date.now() - birthDate.getTime()) / 1000);

export const formatNumber = (num) => {
  const plain = num.toString().padStart(12, '0');
  return plain.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export function initCounter() {
  const currentSeconds = getSecondsAlive();
  const formatted = formatNumber(currentSeconds);
  let html = '';
  formatted.split('').forEach(char => {
    if (char === ',') {
      html += '<span class="comma">,</span>';
    } else {
      html += `<span class="digit">${char}</span>`;
    }
  });
  counterElement.innerHTML = html;
  previousDigits = formatted.replace(/,/g, '').split('');
  lastSeconds = currentSeconds;
  updateMilestones(currentSeconds);
  updateProgress(currentSeconds);
}

export function updateCounter() {
  const currentSeconds = getSecondsAlive();
  const plain = currentSeconds.toString().padStart(12, '0');
  const digits = plain.split('');
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
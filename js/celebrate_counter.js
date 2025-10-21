let previousCelebrateDigits = [];

const formatCelebrateNumber = (num) => num.toString().padStart(7, '0');

export function initCelebrateCounter(count) {
  const formatted = formatCelebrateNumber(count);
  let html = '';
  formatted.split('').forEach(digit => {
    html += `<span class="digit">${digit}</span>`;
  });
  document.getElementById('celebrate-count').innerHTML = html;
  previousCelebrateDigits = formatted.split('');
}

export function updateCelebrateCounter(count, animDuration = 0.6) {
  const formatted = formatCelebrateNumber(count);
  const digits = formatted.split('');
  const digitElements = document.getElementById('celebrate-count').querySelectorAll('.digit');

  digits.forEach((digit, index) => {
    if (digit !== previousCelebrateDigits[index]) {
      const el = digitElements[index];
      const dur1 = animDuration * (0.2 / 0.6);
      const dur2 = animDuration * (0.4 / 0.6);
      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: dur1,
        onComplete: () => {
          el.textContent = digit;
          gsap.set(el, { y: 20, opacity: 0, scaleY: 0 });
          gsap.to(el, {
            y: 0,
            opacity: 1,
            scaleY: 1,
            duration: dur2,
            ease: 'power2.out',
          });
        },
      });
    }
  });

  previousCelebrateDigits = digits;
}
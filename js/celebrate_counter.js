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

export function updateCelebrateCounter(count) {
  const formatted = formatCelebrateNumber(count);
  const digits = formatted.split('');
  const digitElements = document.getElementById('celebrate-count').querySelectorAll('.digit');

  digits.forEach((digit, index) => {
    if (digit !== previousCelebrateDigits[index]) {
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

  previousCelebrateDigits = digits;
}
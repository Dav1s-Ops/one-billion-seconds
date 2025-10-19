const birthDate = new Date(1994, 6, 3); // July 3, 1994 (months are 0-indexed)
const counterElement = document.querySelector('.counter');
let previousDigits = [];

const getSecondsAlive = () => Math.floor((Date.now() - birthDate.getTime()) / 1000);
const formatNumber = (num) => num.toString().padStart(10, '0');

// Init HTML structure
function initCounter() {
  const digits = formatNumber(getSecondsAlive()).split('');
  let html = '';
  for (let i = 0; i < 10; i++) {
    if (i > 0 && i % 3 === 1) { // Add commas after every 3 digits, adjust for padding
      html += '<span class="comma">,</span>';
    }
    html += `<span class="digit">${digits[i]}</span>`;
  }
  counterElement.innerHTML = html;
  previousDigits = digits;
}

// Update the counter every second
function updateCounter() {
  const currentSeconds = getSecondsAlive();
  const digits = formatNumber(currentSeconds).split('');
  const digitElements = document.querySelectorAll('.digit');

  digits.forEach((digit, index) => {
    if (digit !== previousDigits[index]) {
      const el = digitElements[index];
      // Animate out old digit
      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          el.textContent = digit;
          gsap.set(el, { y: 20, opacity: 0, scaleY: 0 });
          // Animate in new digit
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
}

// Start it up!
initCounter();
setInterval(updateCounter, 1000);
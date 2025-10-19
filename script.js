import confetti from "https://esm.run/canvas-confetti@1";

const birthDate = new Date(1994, 6, 3);
const counterElement = document.querySelector('.counter');
const progressFill = document.querySelector('.progress-fill');
const progressLabel = document.getElementById('progress-label');
let previousDigits = [];
let lastSeconds = 0;

const milestones = [
  { seconds: 100000000, descElement: document.querySelectorAll('.seconds-desc')[0].parentNode },
  { seconds: 1000000000, descElement: document.querySelectorAll('.seconds-desc')[1].parentNode },
  { seconds: 2000000000, descElement: document.querySelectorAll('.seconds-desc')[2].parentNode },
  { seconds: 3000000000, descElement: document.querySelectorAll('.seconds-desc')[3].parentNode }
];

const getSecondsAlive = () => Math.floor((Date.now() - birthDate.getTime()) / 1000);
const formatNumber = (num) => num.toString().padStart(10, '0');

// Initialize the counter HTML structure (10 digit spans + commas in groups of 3)
function initCounter() {
  const currentSeconds = getSecondsAlive();
  const digits = formatNumber(currentSeconds).split('');
  let html = '';
  for (let i = 0; i < 10; i++) {
    if (i > 0 && i % 3 === 1) { // Add commas after every 3 digits from the right (but since padded, adjust)
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

  updateMilestones(currentSeconds);
  updateProgress(currentSeconds);
  lastSeconds = currentSeconds;
}

// Function to update milestone animations
function updateMilestones(currentSeconds) {
  milestones.forEach((milestone, index) => {
    const el = milestone.descElement;
    if (currentSeconds >= milestone.seconds) {
      // Past: Green and scaled (with bounce once)
      if (!el.dataset.achieved) {
        gsap.to(el, { color: '#A4F236', scale: 1.05, duration: 0.5, ease: 'bounce.out' });
        el.dataset.achieved = true;
      }
      el.style.color = '#A4F236'; // Persist
    } else if (index === milestones.findIndex(m => currentSeconds < m.seconds)) {
      // Next upcoming: Pulse
      gsap.to(el, { scale: 1.1, repeat: -1, yoyo: true, duration: 1, ease: 'sine.inOut' });
    } else {
      // Future: Gray and faded
      gsap.to(el, { opacity: 0.5, duration: 0.3 });
    }
  });
}

// Function to update progress bar
function updateProgress(currentSeconds) {
  const nextMilestone = milestones.find(m => currentSeconds < m.seconds) || milestones[milestones.length - 1];
  const progress = ((currentSeconds / nextMilestone.seconds) * 100).toFixed(2);
  gsap.to(progressFill, { width: `${progress}%`, duration: 0.5, ease: 'linear' });
  progressLabel.textContent = `Progress to ${nextMilestone.seconds.toLocaleString()} seconds: ${progress}%`;
}

// Start it up
initCounter();
setInterval(updateCounter, 1000);

// Confetti button
document.getElementById('confetti-btn').addEventListener('click', () => {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
});
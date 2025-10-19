export const milestones = [
  { seconds: 100000000, descElement: document.querySelectorAll('.seconds-desc')[0].parentNode },
  { seconds: 1000000000, descElement: document.querySelectorAll('.seconds-desc')[1].parentNode },
  { seconds: 2000000000, descElement: document.querySelectorAll('.seconds-desc')[2].parentNode },
  { seconds: 3000000000, descElement: document.querySelectorAll('.seconds-desc')[3].parentNode }
];

export function updateMilestones(currentSeconds) {
  milestones.forEach((milestone, index) => {
    const el = milestone.descElement;
    if (currentSeconds >= milestone.seconds) {
      if (!el.dataset.achieved) {
        gsap.to(el, { color: '#A4F236', scale: 1.05, duration: 0.5, ease: 'bounce.out' });
        el.dataset.achieved = true;
      }
      el.style.color = '#A4F236';
    } else if (index === milestones.findIndex(m => currentSeconds < m.seconds)) {
      gsap.to(el, { scale: 1.1, repeat: -1, yoyo: true, duration: 1, ease: 'sine.inOut' });
    } else {
      gsap.to(el, { opacity: 0.5, duration: 0.3 });
    }
  });
}
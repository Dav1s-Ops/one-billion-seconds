import { milestones } from './milestones.js';

const progressFill = document.querySelector('.progress-fill');
const progressLabel = document.getElementById('progress-label');

export function updateProgress(currentSeconds) {
  const nextMilestone = milestones.find(m => currentSeconds < m.seconds) || milestones[milestones.length - 1];
  const progress = ((currentSeconds / nextMilestone.seconds) * 100).toFixed(2);
  gsap.to(progressFill, { width: `${progress}%`, duration: 0.5, ease: 'linear' });
  progressLabel.textContent = `Progress to ${nextMilestone.seconds.toLocaleString()} seconds: ${progress}%`;
}
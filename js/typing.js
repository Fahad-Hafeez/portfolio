/* typing.js — typewriter animation */

const phrases = [
  'AI Researcher',
  'Startup Founder',
  'Dataset Creator',
  'Open Source Builder',
  'Machine Learning Engineer',
  'Trustworthy AI Advocate',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let isPaused     = false;

const TYPING_SPEED   = 70;   // ms per character typed
const DELETING_SPEED = 35;   // ms per character deleted
const PAUSE_AFTER    = 2200; // ms to hold the completed phrase

function tick() {
  const el = document.getElementById('typing');
  if (!el) return;

  const currentPhrase = phrases[phraseIndex];

  if (isPaused) {
    isPaused    = false;
    isDeleting  = true;
    setTimeout(tick, DELETING_SPEED);
    return;
  }

  if (isDeleting) {
    charIndex--;
    el.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, 400); // brief pause before next phrase
      return;
    }

    setTimeout(tick, DELETING_SPEED);
  } else {
    charIndex++;
    el.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === currentPhrase.length) {
      isPaused = true;
      setTimeout(tick, PAUSE_AFTER);
      return;
    }

    setTimeout(tick, TYPING_SPEED);
  }
}

// Small initial delay before starting
setTimeout(tick, 800);

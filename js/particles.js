/* particles.js — subtle neural-net style particle background */

tsParticles.load('particles-js', {
  fpsLimit: 60,
  background: { color: 'transparent' },
  particles: {
    number: {
      value: 48,
      density: { enable: true, area: 900 },
    },
    color: { value: '#5b9bef' },
    opacity: {
      value: 0.22,
      random: { enable: true, minimumValue: 0.08 },
      animation: {
        enable: true,
        speed: 0.6,
        minimumValue: 0.06,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 2.5 },
      random: true,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    links: {
      enable: true,
      distance: 160,
      color: '#5b9bef',
      opacity: 0.07,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
    },
    modes: {
      grab: {
        distance: 140,
        links: { opacity: 0.18 },
      },
    },
  },
  detectRetina: true,
});

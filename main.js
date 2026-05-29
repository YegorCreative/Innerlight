// ── NAV SCROLL EFFECT ──
const navHeader = document.getElementById('nav-header');
window.addEventListener('scroll', () => {
  navHeader.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE HAMBURGER ──
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

const setMobileMenuState = (isOpen) => {
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  navLinks.classList.toggle('open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
};

hamburger.addEventListener('click', () => {
  setMobileMenuState(!navLinks.classList.contains('open'));
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMobileMenuState(false);
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    setMobileMenuState(false);
    hamburger.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 720 && navLinks.classList.contains('open')) {
    setMobileMenuState(false);
  }
});

// ── INTERSECTION OBSERVER – fade-in-up on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .contact-card, .about-content, .about-visual').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── Stagger service cards ──
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll('.contact-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

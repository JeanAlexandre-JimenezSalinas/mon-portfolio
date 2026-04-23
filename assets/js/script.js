/*
══════════════════════════════════════════════════════════════════
TP MODULE 5 — script.js
Portfolio personnel — JavaScript
══════════════════════════════════════════════════════════════════
*/

const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('success-message');

const hero = document.querySelector('.hero');
const photo = document.querySelector('.profile-photo');
const heroTitle = document.querySelector('.hero-title');

const skillBars = document.querySelectorAll('.skill-progress');
const revealElements = document.querySelectorAll('.reveal');
const skillsSection = document.querySelector('#skills');
const statCards = document.querySelectorAll('.stat-card');

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════ */
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (burger) burger.classList.remove('open');
    if (navLinks) navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  revealOnScroll();
  animateSkillBars();
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   HERO TITLE LETTERS
═══════════════════════════════════════════════════════════════ */
function animateHeroTitleLetters() {
  if (!heroTitle) return;

  const text = heroTitle.dataset.text?.trim();
  if (!text) return;

  heroTitle.innerHTML = '';

  const words = text.split(/\s+/);

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.classList.add('hero-word');

    word.split('').forEach((char, charIndex) => {
      const letterSpan = document.createElement('span');
      letterSpan.classList.add('hero-letter');
      letterSpan.textContent = char;

      const randomDelay = Math.random() * 0.35;
      const baseDelay = wordIndex * 0.18 + charIndex * 0.04;

      letterSpan.style.animation =
        'dropBounce 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards';
      letterSpan.style.animationDelay = `${baseDelay + randomDelay}s`;

      wordSpan.appendChild(letterSpan);
    });

    heroTitle.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      heroTitle.appendChild(document.createTextNode(' '));
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   HERO LOAD ANIMATION
═══════════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll(
    '.hero-content > *:not(.hero-title), .hero-image'
  );

  animateHeroTitleLetters();

  setTimeout(() => {
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = `
          opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
          transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
          filter 0.8s ease
        `;

        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0)';
      }, index * 180);
    });
  }, 300);
});

/* ═══════════════════════════════════════════════════════════════
   HERO PARALLAX
═══════════════════════════════════════════════════════════════ */
if (hero && photo) {
  hero.addEventListener('mousemove', (e) => {
    const { width, height, left, top } = hero.getBoundingClientRect();

    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    photo.style.transform = `
      translateY(${y * -20}px)
      translateX(${x * -20}px)
      scale(1.03)
    `;
  });

  hero.addEventListener('mouseleave', () => {
    photo.style.transform = 'translate(0, 0) scale(1)';
  });
}

/* ═══════════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════════ */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated || !skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 150 && rect.bottom > 0) {
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
    });

    skillsAnimated = true;
  }
}

/* ═══════════════════════════════════════════════════════════════
   REVEAL
═══════════════════════════════════════════════════════════════ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
);

revealElements.forEach(el => observer.observe(el));

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════════════ */
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    isValid = validateField(name, 'name-error', 'Votre nom est requis') && isValid;
    isValid = validateEmail(email, 'email-error') && isValid;
    isValid = validateField(subject, 'subject-error', 'Le sujet est requis') && isValid;
    isValid = validateField(message, 'message-error', 'Votre message est requis') && isValid;

    if (!isValid) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/xwvanady', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi');
      }

      contactForm.reset();
      if (successMsg) successMsg.style.display = 'block';

      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
      }, 5000);
    } catch (error) {
      alert("Le message n'a pas pu être envoyé. Réessaie plus tard.");
    } finally {
      submitBtn.textContent = 'Envoyer le message';
      submitBtn.disabled = false;
    }
  });
}

function validateField(field, errorId, errorText) {
  const errorSpan = document.getElementById(errorId);

  if (!field || !field.value.trim()) {
    if (field) field.classList.add('invalid');
    if (errorSpan) errorSpan.textContent = errorText;
    return false;
  }

  field.classList.remove('invalid');
  if (errorSpan) errorSpan.textContent = '';
  return true;
}

function validateEmail(field, errorId) {
  const errorSpan = document.getElementById(errorId);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!field || !field.value.trim()) {
    if (field) field.classList.add('invalid');
    if (errorSpan) errorSpan.textContent = 'Votre email est requis';
    return false;
  }

  if (!emailRegex.test(field.value)) {
    field.classList.add('invalid');
    if (errorSpan) errorSpan.textContent = 'Format email invalide (exemple@domaine.fr)';
    return false;
  }

  field.classList.remove('invalid');
  if (errorSpan) errorSpan.textContent = '';
  return true;
}

document.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.classList.remove('invalid');
    const errorId = field.id + '-error';
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) errorSpan.textContent = '';
  });
});

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  animateSkillBars();
});

/* mailTo */
document.querySelectorAll('.email-link').forEach(link => {
  const user = link.dataset.user;
  const domain = link.dataset.domain;

  if (!user || !domain) return;

  const email = `${user}@${domain}`;
  link.href = `mailto:${email}`;
});

/* stat cards sound */
statCards.forEach(card => {
  card.addEventListener('click', () => {
    const sound = new Audio('assets/sounds/mono2.mp3');
    sound.volume = 0.6;

    sound.play().catch(err => {
      console.log('Audio bloqueado:', err);
    });

    card.classList.add('shake');

    setTimeout(() => {
      card.classList.remove('shake');
    }, 300);
  });
});
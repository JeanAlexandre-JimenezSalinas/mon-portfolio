// On sélectionne les éléments qu'on va manipuler
// C'est toujours la première chose à faire en JS
const navbar = document.getElementById("navbar");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const skillBars = document.querySelectorAll(".skill-progress");

// Au clic sur le burger : ouvrir/fermer le menu
if (burger) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open"); // anime le X
    navLinks.classList.toggle("open"); // fait glisser le menu
  });
}

// Fermer le menu quand on clique un lien
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  // Navbar : fond plus opaque après 50px de scroll
  navbar.classList.toggle("scrolled", window.scrollY > 50);

  // Bouton retour en haut : visible après 400px
  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }
});

// Bouton retour en haut — scroll fluide vers 0
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// IntersectionObserver : déclenche l'animation quand la section est visible
let skillsAnimated = false;


const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-level') + '%';
    });
    skillsAnimated = true;
  }
}, { threshold: 0.3 });


const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);


//Validacion du formulaire
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Validaciones...
    if (!name.value.trim()) {
      document.getElementById("name-error").textContent = "Votre nom est requis";
      isValid = false;
    } else {
      document.getElementById("name-error").textContent = "";
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    if (!emailOk) {
      document.getElementById("email-error").textContent = "Email invalide";
      isValid = false;
    } else {
      document.getElementById("email-error").textContent = "";
    }

    if (!message.value.trim()) {
      document.getElementById("message-error").textContent = "Message requis";
      isValid = false;
    } else {
      document.getElementById("message-error").textContent = "";
    }

    // SOLO si es inválido se bloquea
    if (!isValid) {
      e.preventDefault(); // ← SOLO aquí
    }
  });
  
  //mailto:
 const emailLinks = document.querySelectorAll(".email-link");

emailLinks.forEach((link) => {
  const email = "Jalexanjs88@gmail.com";
  link.href = `mailto:${email}`;
});
}


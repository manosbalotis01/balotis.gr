const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const underline = document.querySelector('.nav-underline');

function moveUnderline(element) {
  const rect = element.getBoundingClientRect();
  const containerRect = element.closest('.container').getBoundingClientRect();
  underline.style.width = rect.width + 'px';
  underline.style.left = (rect.left - containerRect.left) + 'px';
}

function loadPage(page) {
  const content = document.getElementById('content');
  content.classList.remove('visible');

  // Ενημέρωση active link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(page)) {
      link.classList.add('active');
      moveUnderline(link);
    }
  });

  fetch(page)
    .then(res => res.text())
    .then(data => {
      setTimeout(() => {
        content.innerHTML = data;
        content.classList.add('visible');
      }, 300);
    })
    .catch(() => {
      content.innerHTML = "<p>Σφάλμα φόρτωσης περιεχομένου.</p>";
      content.classList.add('visible');
    });
}

let galleryLightbox = null;

function initLightbox() {
  // Καθάρισε παλιό instance αν υπάρχει (π.χ. αλλάζεις σελίδα)
  if (galleryLightbox && galleryLightbox.destroy) {
    galleryLightbox.destroy();
  }
  // Δένουμε σε ΟΛΑ τα στοιχεία της σελίδας που έχουν .glightbox
  galleryLightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    closeButton: true,
    plyr: { css: '' } // αν ποτέ βάλεις video
  });
}



// Αρχική τοποθέτηση underline στο πρώτο active
window.addEventListener('DOMContentLoaded', () => {
  const firstLink = document.querySelector('.navbar-nav .nav-link');
  if (firstLink) {
    firstLink.classList.add('active');
    moveUnderline(firstLink);
  }
});

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const scrollBtn = document.querySelector('.scroll-top');
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});


// Shrinking navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 100) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});


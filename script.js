// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        try {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } catch (err) {
            console.warn("Invalid selector:", targetId);
        }
    });
});

// Navbar blur effect on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Simple reveal on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section > div').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Image Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxContainer = document.getElementById('lightbox-container');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

// Find all elements that should trigger the lightbox (images or wrapper divs)
const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

lightboxTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(trigger);
  });

  // Keyboard accessibility
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('role', 'button');
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(trigger);
    }
  });
});

function openLightbox(trigger) {
  const img = trigger.querySelector('img') || trigger;
  const fullSrc = trigger.dataset.full || img.src;
  const caption = trigger.dataset.caption || img.alt || '';
  const link = trigger.dataset.link || '';
  const linkText = trigger.dataset.linkText || 'View Certificate';

  if (!fullSrc) return;

  lightboxImg.src = fullSrc;
  lightboxImg.alt = img.alt;

  let captionHTML = `<div>${caption}</div>`;
  if (link) {
    captionHTML += `<a href="${link}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-accent-500/15 border border-accent-500/30 rounded-lg text-accent-400 text-sm font-medium hover:bg-accent-500/25 transition-all">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
      ${linkText}
    </a>`;
  }
  lightboxCaption.innerHTML = captionHTML;

  lightbox.classList.remove('opacity-0', 'pointer-events-none');
  lightbox.classList.add('opacity-100');
  lightboxContainer.classList.remove('scale-95');
  lightboxContainer.classList.add('scale-100');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('opacity-0', 'pointer-events-none');
  lightbox.classList.remove('opacity-100');
  lightboxContainer.classList.add('scale-95');
  lightboxContainer.classList.remove('scale-100');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxContainer) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.classList.contains('opacity-0')) {
    closeLightbox();
  }
});
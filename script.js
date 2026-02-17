// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Close mobile menu when a link is clicked
    document.getElementById('menu-toggle').checked = false;
    
    // Get the target section
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Update active link
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .exp-card, .project-card, .certificate-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  const menuToggle = document.getElementById('menu-toggle');
  
  if (!nav.contains(e.target) && !hamburger.contains(e.target) && menuToggle.checked) {
    menuToggle.checked = false;
  }
});

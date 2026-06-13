// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

function toggleMobileMenu() {
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  mobileOverlay.style.display = mobileOverlay.style.display === 'flex' ? 'none' : 'flex';
  
  // Animate menu button
  const spans = mobileMenuBtn.querySelectorAll('span');
  spans[0].style.transform = mobileMenu.style.display === 'flex' ? 'rotate(45deg) translate(8px, 8px)' : '';
  spans[1].style.opacity = mobileMenu.style.display === 'flex' ? '0' : '1';
  spans[2].style.transform = mobileMenu.style.display === 'flex' ? 'rotate(-45deg) translate(7px, -7px)' : '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', toggleMobileMenu);

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', toggleMobileMenu);
});

// Close mobile menu on scroll
window.addEventListener('scroll', () => {
  if (mobileMenu.style.display === 'flex') {
    mobileMenu.style.display = 'none';
    mobileOverlay.style.display = 'none';
  }
});

// Phone Clock Update
const phoneClock = document.getElementById('phoneClock');
const clockToggle = document.getElementById('clockToggle');
const clockTime = phoneClock.querySelector('.clock-time');
const clockSeconds = phoneClock.querySelector('.clock-seconds');
const clockAmpm = phoneClock.querySelector('.clock-ampm');
let is24Hour = false;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  if (!is24Hour) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    clockAmpm.textContent = ampm;
  } else {
    clockAmpm.textContent = '';
  }
  
  const displayHours = String(hours).padStart(2, '0');
  clockTime.textContent = `${displayHours}:${minutes}`;
  clockSeconds.textContent = `:${seconds}`;
}

clockToggle.addEventListener('click', () => {
  is24Hour = !is24Hour;
  clockToggle.textContent = is24Hour ? '12h' : '24h';
});

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// Phone Greeting based on time of day
const phoneGreeting = document.getElementById('phoneGreeting');

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = '';
  let emoji = '';
  
  if (hour < 12) {
    greeting = 'Good morning';
    emoji = '🌸';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
    emoji = '☀️';
  } else {
    greeting = 'Good evening';
    emoji = '🌙';
  }
  
  phoneGreeting.textContent = `${greeting}! ${emoji}`;
}

updateGreeting();
setInterval(updateGreeting, 60000); // Update every minute

// Mood button interaction
const moodBtns = document.querySelectorAll('.mood-btn');

moodBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    moodBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Add bounce animation
    btn.style.animation = 'none';
    setTimeout(() => {
      btn.style.animation = '';
    }, 10);
  });
});

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for multiple elements
      const delay = index * 0.1;
      entry.target.style.animationDelay = `${delay}s`;
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'reveal 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach(el => {
  observer.observe(el);
});

// Feature card interactions
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach((card, index) => {
  card.style.setProperty('--feature-index', index);
  
  card.addEventListener('mouseenter', () => {
    featureCards.forEach(c => {
      c.style.opacity = '0.6';
    });
    card.style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', () => {
    featureCards.forEach(c => {
      c.style.opacity = '1';
    });
  });
});

// Preview phone interactions
const previewPhones = document.querySelectorAll('.preview-phone');

previewPhones.forEach((phone, index) => {
  phone.style.setProperty('--phone-index', index);
  
  phone.addEventListener('mouseenter', () => {
    previewPhones.forEach(p => {
      p.style.opacity = '0.6';
    });
    phone.style.opacity = '1';
  });
  
  phone.addEventListener('mouseleave', () => {
    previewPhones.forEach(p => {
      p.style.opacity = '1';
    });
  });
});

// Steps animation
const steps = document.querySelectorAll('.step');

steps.forEach((step, index) => {
  step.style.setProperty('--step-index', index);
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 245, 248, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
  } else {
    navbar.style.background = 'rgba(255, 245, 248, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
  }
});

// Add parallax effect to floating shapes
window.addEventListener('scroll', () => {
  const shapes = document.querySelectorAll('.shape');
  const scrollY = window.scrollY;
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    shape.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// Testimonial card rotation on hover
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Initialize animations on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

console.log('🍡 Mochi Space loaded! Welcome to your cozy corner. 💕');

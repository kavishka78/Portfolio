/* ============================================
   Mobile Navigation Toggle
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

/* ============================================
   Navbar Scroll Effect & Active Link Highlight
   ============================================ */
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Add shadow/background to navbar on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight current section in navbar
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ============================================
   Intersection Observer for Fade-in Animations
   ============================================ */
const fadeObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, fadeObserverOptions);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ============================================
   Progress Bar Animation on Scroll
   ============================================ */
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.progress');
      if (bar) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      }
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => progressObserver.observe(cat));

/* ============================================
   Contact Form Validation
   ============================================ */
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formStatus = document.getElementById('form-status');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

// Initialize EmailJS
(function () {
  emailjs.init("VBAPYQCYuj5s7cb8X");
})();

// Single form submit handler
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Reset previous errors
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  let isValid = true;

  // Name validation
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Please enter your name.';
    isValid = false;
  }

  // Email validation
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Please enter your email.';
    isValid = false;
  } else if (!validateEmail(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Message validation
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'Please enter a message.';
    isValid = false;
  }

  if (!isValid) {
    formStatus.textContent = 'Please fix the errors above and try again.';
    formStatus.classList.add('error');
    return;
  }

  // If valid, send email
  formStatus.textContent = 'Sending...';

  let now = new Date().toLocaleString();
  
  const templateData = {
    to_email: document.getElementById('email').value,
    from_name: document.getElementById('name').value,
    user_email: document.getElementById('email').value,
    user_message: document.getElementById('message').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
    time: now
  };
  
  console.log('Sending data:', templateData);

  emailjs.send("service_cm5ivoi", "template_6cw2cl8", templateData)
  .then(function (response) {
    console.log('Email sent successfully:', response);
    formStatus.textContent = '✅ Message sent!';
    formStatus.classList.add('success');
    contactForm.reset();
  })
  .catch(function (error) {
    console.error('EmailJS error:', error);
    formStatus.textContent = '❌ Failed to send. Please try again.';
    formStatus.classList.add('error');
  });
});

/* ============================================
   Dynamic Footer Year
   ============================================ */
document.getElementById('year').textContent = new Date().getFullYear();

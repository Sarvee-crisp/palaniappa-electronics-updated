// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dots .dot');

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    dots.forEach(function(dot) {
        dot.classList.remove('active');
    });
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Auto slide every 4 seconds (like the actual site)
if (slides.length > 0) {
    setInterval(nextSlide, 4000);
}

// Dot navigation
dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate Stats on Scroll
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(function(stat) {
        const targetValue = stat.textContent;
        const numericValue = parseInt(targetValue.replace(/\D/g, ''));
        const suffix = targetValue.replace(/[0-9]/g, '');
        
        if (!stat.classList.contains('animated')) {
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(function() {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = numericValue + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + suffix;
                }
            }, 30);
            
            stat.classList.add('animated');
        }
    });
}

// Intersection Observer for Stats Animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(statsSection);
}

// Add animation to cards on scroll
function addScrollAnimation() {
    const cards = document.querySelectorAll('.product-card, .blog-card, .brand-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(function() {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(function(card) {
        observer.observe(card);
    });
}

// Initialize scroll animations
window.addEventListener('load', function() {
    addScrollAnimation();
});

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.borderBottom = '4px solid #e74c3c';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderBottom = 'none';
    });
});

// Add active state to navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Prevent default for empty links
document.querySelectorAll('a[href="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

console.log('Palaniappa Electronics Website Loaded Successfully!');

// Career Form Handling
const careerForm = document.getElementById('careerForm');
if (careerForm) {
    careerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        
        alert('Thank you ' + firstName + ' ' + lastName + '! Your application has been submitted. We will get back to you soon.');
        this.reset();
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        
        alert('Thank you ' + name + '! Your message has been sent. We will contact you shortly.');
        this.reset();
    });
}

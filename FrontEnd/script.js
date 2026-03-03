
// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - navbar.offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for statistics
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateStats() {
    if (hasAnimated) return;
    
    const aboutModule = document.getElementById('about');
    if (aboutModule && aboutModule.classList.contains('active-module')) {
        hasAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }
}

// Observe when About module becomes active
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active-module')) {
            animateStats();
        }
    });
});

const aboutModule = document.getElementById('about');
if (aboutModule) {
    observer.observe(aboutModule, { attributes: true, attributeFilter: ['class'] });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const eventType = document.getElementById('eventType').value;
    const message = document.getElementById('message').value;

    // Create a notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.5s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    notification.innerHTML = `
        <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">
            <i class="fas fa-check-circle"></i> ¡Mensaje Enviado!
        </h3>
        <p style="margin: 0; opacity: 0.9;">
            Gracias ${name}, nos pondremos en contacto contigo pronto.
        </p>
    `;

    document.body.appendChild(notification);

    // Log form data (In a real application, this would be sent to a server)
    console.log('Form Data:', {
        name,
        email,
        phone,
        eventType,
        message
    });

    // Reset form
    contactForm.reset();

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
});



// Add scroll reveal animation
const fadeObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, fadeObserverOptions);

// Observe elements for fade-in
const fadeElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Gallery item click handler (placeholder for future modal functionality)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // You can add a modal/lightbox here in the future
        console.log('Gallery item clicked');
    });
});

// WhatsApp contact button (can be added later)
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/1234567890?text=Hola%2C%20me%20interesa%20información%20sobre%20sus%20servicios';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    whatsappBtn.style.cssText = `
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        background-color: #25d366;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        box-shadow: 2px 2px 3px #999;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1)';
        whatsappBtn.style.boxShadow = '0 10px 20px rgba(37, 211, 102, 0.4)';
    });

    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
        whatsappBtn.style.boxShadow = '2px 2px 3px #999';
    });

    document.body.appendChild(whatsappBtn);
}

// Uncomment to add WhatsApp floating button
// createWhatsAppButton();

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Real-time form validation
document.getElementById('email').addEventListener('blur', function() {
    if (!validateEmail(this.value) && this.value !== '') {
        this.style.borderColor = '#ff6b6b';
        showValidationMessage(this, 'Por favor ingresa un email válido');
    } else {
        this.style.borderColor = '#4ecdc4';
        removeValidationMessage(this);
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (!validatePhone(this.value) && this.value !== '') {
        this.style.borderColor = '#ff6b6b';
        showValidationMessage(this, 'Por favor ingresa un teléfono válido');
    } else {
        this.style.borderColor = '#4ecdc4';
        removeValidationMessage(this);
    }
});

function showValidationMessage(element, message) {
    removeValidationMessage(element);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.85rem; margin-top: 5px;';
    errorDiv.textContent = message;
    element.parentElement.appendChild(errorDiv);
}

function removeValidationMessage(element) {
    const existingError = element.parentElement.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}

// Initialize
console.log('Royalito Events - Website loaded successfully!');

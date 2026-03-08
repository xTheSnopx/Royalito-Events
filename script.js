
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

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Listen to scroll events
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

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

// Contact Form - Set minimum date to today
const eventDateInput = document.getElementById('eventDate');
if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
}

// Phone input validation - solo números
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

// Name input validation - solo letras y espacios
const nameInput = document.getElementById('name');
if (nameInput) {
    nameInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '');
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const eventType = document.getElementById('eventType').value;
    const services = document.getElementById('services').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const guests = document.getElementById('guests').value;
    const location = document.getElementById('location').value;
    const budget = document.getElementById('budget').value;
    const contactMethod = document.getElementById('contactMethod').value;
    const message = document.getElementById('message').value;

    // Map event type to text
    const eventTypeTexts = {
        'baby-shower': 'Baby Shower',
        'boda': 'Boda / Matrimonio',
        'fiesta-infantil': 'Fiesta Infantil',
        'fiesta-empresarial': 'Fiesta Empresarial',
        'quinceañera': 'Quinceañera',
        'bautizo': 'Bautizo',
        'primera-comunion': 'Primera Comunion',
        'graduacion': 'Graduacion',
        'aniversario': 'Aniversario',
        'decoracion': 'Decoracion con Globos',
        'shows': 'Shows y Animacion',
        'otro': 'Otro Evento'
    };

    // Map services to text
    const serviceTexts = {
        // Personajes y Disfraces
        'disfraces-tamaño-real': 'Acompañamiento con Disfraces Tamaño Real',
        'mario-sonic-vaca': 'Mario / Sonic / La Vaca Lola',
        'personaje-personalizado': 'Otro Personaje (ver comentarios)',
        // Decoracion
        'decoracion-globos': 'Decoracion con Globos',
        'decoracion-tematica': 'Decoracion Tematica Completa',
        'arcos-columnas': 'Arcos y Columnas de Globos',
        // Shows y Animacion
        'show-payasos': 'Show de Payasos',
        'show-magia': 'Show de Magia',
        'show-titeres': 'Show de Titeres',
        'zanqueros': 'Zanqueros y Circo',
        'recreacion-dirigida': 'Recreacion Dirigida',
        // Inflables
        'castillos-inflables': 'Castillos Saltarines',
        'inflables-acuaticos': 'Inflables Acuaticos',
        // Comida
        'mesa-dulces': 'Mesa de Dulces',
        'snacks': 'Servicio de Snacks',
        'comida-completa': 'Comida Completa',
        // Sonido
        'sonido-profesional': 'Sonido Profesional',
        'iluminacion-led': 'Iluminacion LED',
        'dj': 'DJ y Musica',
        // Paquetes
        'paquete-basico': 'Paquete Basico',
        'paquete-estandar': 'Paquete Estandar',
        'paquete-premium': 'Paquete Premium',
        'paquete-personalizado': 'Paquete Personalizado'
    };

    // Map budget to text
    const budgetTexts = {
        'economico': 'Economico (Menos de $500.000)',
        'moderado': 'Moderado ($500k - $1.5M)',
        'alto': 'Alto ($1.5M - $3M)',
        'premium': 'Premium (Mas de $3M)',
        'consultar': 'Por consultar'
    };

    // Map contact method
    const contactMethodTexts = {
        'whatsapp': 'WhatsApp',
        'llamada': 'Llamada Telefonica',
        'cualquiera': 'Cualquiera'
    };

    const eventTypeText = eventTypeTexts[eventType] || 'Evento';
    const serviceText = serviceTexts[services] || services || 'No especificado';
    const budgetText = budget ? budgetTexts[budget] : 'No especificado';
    const contactMethodText = contactMethodTexts[contactMethod] || contactMethod;

    // Format date
    const dateObj = new Date(eventDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Create WhatsApp message
    let whatsappMessage = `*SOLICITUD DE EVENTO - ROYALITO EVENTS*

*************************************
DATOS DEL CLIENTE
*************************************

Nombre: *${name}*
Telefono: *${phone}*
Contactar por: ${contactMethodText}

*************************************
DETALLES DEL EVENTO
*************************************

Tipo de evento: ${eventTypeText}
Servicio solicitado: *${serviceText}*
Fecha: ${formattedDate}`;

    if (eventTime) {
        whatsappMessage += `\nHora: *${eventTime}*`;
    }

    whatsappMessage += `\nInvitados: *${guests} personas*\nUbicacion: ${location}\nPresupuesto: ${budgetText}`;

    if (message) {
        whatsappMessage += `

*************************************
INFORMACION ADICIONAL
*************************************

${message}`;
    }

    whatsappMessage += `

*************************************
Espero su pronta respuesta!
*************************************`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp number (international format without +)
    const whatsappNumber = '573202460888';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Reset form
    contactForm.reset();
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
const fadeElements = document.querySelectorAll('.service-card, .gallery-item');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Gallery item click handler
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Gallery item clicked');
    });
});

// Auto-playing carousels for mobile devices
function setupAutoCarousels() {
    const carousels = document.querySelectorAll('.gallery-grid, .services-grid');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let isHovered = false;
        let autoPlayInterval;
        
        // Only run auto-play on mobile view where scroll-snap is active
        const checkAutoPlay = () => {
            clearInterval(autoPlayInterval);
            if (window.innerWidth <= 768) {
                startAutoPlay();
            }
        };

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                if (!isDown && !isHovered) {
                    const scrollAmount = carousel.clientWidth * 0.8; // Approx one card width
                    
                    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                        // Reached the end, scroll back to start seamlessly
                        carousel.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        // Scroll next
                        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }
            }, 2500); // 2.5 seconds gives a bit more time to read than 2
        };

        // Pause on interaction
        carousel.addEventListener('touchstart', () => isDown = true, {passive: true});
        carousel.addEventListener('touchend', () => {
            isDown = false;
            // Restart timer after interaction
            clearInterval(autoPlayInterval);
            setTimeout(checkAutoPlay, 3000);
        });
        
        carousel.addEventListener('mouseenter', () => isHovered = true);
        carousel.addEventListener('mouseleave', () => isHovered = false);

        // Make it draggable on desktop too
        let startX, scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Init
        window.addEventListener('resize', checkAutoPlay);
        checkAutoPlay();
    });
}

// Initialize carousels
setupAutoCarousels();

// WhatsApp contact button (can be added later)
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    // URL encoded text: "Hola Royalito Events! Me gustaría cotizar un evento 🎉"
    whatsappBtn.href = 'https://wa.me/573202460888?text=Hola%20Royalito%20Events!%20Me%20gustar%C3%ADa%20cotizar%20un%20evento';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    whatsappBtn.style.cssText = `
        position: fixed;
        width: 64px;
        height: 64px;
        bottom: 24px;
        right: 20px;
        background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        color: #FFF;
        border-radius: 50%;
        text-align: center;
        font-size: 32px;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: whatsappPulse 3s ease-in-out infinite;
        text-decoration: none;
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

// Activate WhatsApp floating button with real number
createWhatsAppButton();

// Add WhatsApp pulse animation to page
const style = document.createElement('style');
style.textContent = `
    @keyframes whatsappPulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5); }
        50% { box-shadow: 0 4px 30px rgba(37, 211, 102, 0.8), 0 0 0 8px rgba(37, 211, 102, 0.1); }
    }
`;
document.head.appendChild(style);

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

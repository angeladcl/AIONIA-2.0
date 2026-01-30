// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Log form data (in production, this would send to a server)
            console.log('Form submitted with data:', data);
            
            // Show success message
            alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
            
            // Reset form
            contactForm.reset();
            
            // In production, you would send this data to your backend:
            // fetch('/api/consultation', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
            // });
        });
    }
    
    // Module Selection Counter
    const moduleCheckboxes = document.querySelectorAll('.module-checkbox');
    
    moduleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedCount = document.querySelectorAll('.module-checkbox:checked').length;
            console.log(`Módulos seleccionados: ${selectedCount}`);
            
            // You could add visual feedback here
            // For example, update a counter or show/hide elements based on selection
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow to navbar when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    const cards = document.querySelectorAll('.service-card, .benefit-card, .module-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Analytics tracking (placeholder - integrate with your analytics service)
function trackEvent(category, action, label) {
    console.log('Analytics Event:', { category, action, label });
    
    // Example: Google Analytics integration
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || 
        e.target.classList.contains('hero-cta')) {
        trackEvent('CTA', 'Click', e.target.textContent);
    }
});

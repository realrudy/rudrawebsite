// Access Gate: show full site only with ?key=1
// Gate access: ensure robust unlock with query or stored flag
(function gateAccess() {
    const unlock = () => {
        const body = document.body;
        const gate = document.getElementById('gate');
        const site = document.getElementById('site-content');
        body.classList.add('site-visible');
        if (gate) gate.classList.add('gate-hidden');
        if (gate && gate.parentNode) gate.parentNode.removeChild(gate);
        if (site) site.style.display = 'block';
    };

    const lock = () => {
        const body = document.body;
        const gate = document.getElementById('gate');
        const site = document.getElementById('site-content');
        body.classList.remove('site-visible');
        if (gate) gate.classList.remove('gate-hidden');
        if (site) site.style.display = '';
    };

    try {
        const params = new URLSearchParams(window.location.search);
        const hasKey = params.get('key') === '1';
        const stored = window.localStorage && localStorage.getItem('rudy_site_unlock') === '1';

        if (hasKey) {
            if (window.localStorage) localStorage.setItem('rudy_site_unlock', '1');
            unlock();
        } else if (stored) {
            unlock();
        } else {
            lock();
        }
    } catch (e) {
        lock();
    }
})();

function createBackground() {
    // Create gradient mesh
    const mesh = document.createElement('div');
    mesh.className = 'gradient-mesh';
    document.body.prepend(mesh);

    // Create floating glow spots with varied sizes and positions
    const spots = 1; // reduced for subtlety
    for (let i = 0; i < spots; i++) {
        const spot = document.createElement('div');
        spot.className = 'glow-spot';
        
        // Strategic placement for better visual effect
        // Subtle placement and small size for professional look
        spot.style.left = `${20 + Math.random() * 60}%`;
        spot.style.top = `${20 + Math.random() * 60}%`;
        const smallSize = 220 + Math.random() * 80;
        spot.style.width = `${smallSize}px`;
        spot.style.height = `${smallSize}px`;
        spot.style.opacity = '0.12';
        spot.style.animationDelay = `${i * -3}s`;
        document.body.prepend(spot);
    }
}

function createStars() {
    const container = document.createElement('div');
    container.className = 'stars';
    document.body.prepend(container);

    const starCount = 30; // reduced for subtlety
    
    // Create a variety of stars with different sizes and brightness
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1 + 0.8; // smaller stars
        const opacity = Math.random() * 0.25 + 0.25; // subtler brightness
        const duration = 3 + Math.random() * 3;
        const delay = Math.random() * 1.5;
        
        Object.assign(star.style, {
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            animation: `twinkle ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            background: 'rgba(255,255,255,0.85)'
        });
        
        container.appendChild(star);
    }
}

// Project previews data
const projectPreviews = {
    'hour-logger': {
        title: 'Hour Logger System',
        description: 'Volunteer hour tracking system for Simply Code volunteers, with manual admin approval.',
        images: [
            '/images/1.png',
            '/images/2.png',
            '/images/4.png',
            '/images/5.png',


        ]
    }
    // Add more projects as needed
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createBackground();
    createStars();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const oldBackground = document.querySelector('.gradient-mesh, .glow-spot');
        if (oldBackground) {
            oldBackground.remove();
        }
        createBackground();
    });
    
    // Handle navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add fade-in animation for sections
    function setupSectionAnimations() {
        const sections = document.querySelectorAll('section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Only animate once
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        });
    }
    
    setupSectionAnimations();

    const modal = document.getElementById('projectModal');
    const modalClose = modal.querySelector('.modal-close');
    const previewButtons = document.querySelectorAll('.project-preview');
    
    let currentSlide = 0;
    
    function showSlide(index, images) {
        const items = modal.querySelectorAll('.carousel-item');
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }
    
    function openModal(projectId) {
        const project = projectPreviews[projectId];
        if (!project) return;
        
        // Update modal content
        modal.querySelector('.project-title').textContent = project.title;
        modal.querySelector('.project-description').textContent = project.description;
        
        // Create carousel items
        const carouselContainer = modal.querySelector('.carousel-items');
        carouselContainer.innerHTML = project.images
            .map(src => `<div class="carousel-item"><img src="${src}" alt="Project preview"></div>`)
            .join('');
            
        // Show first slide
        currentSlide = 0;
        setTimeout(() => {
            showSlide(currentSlide, project.images);
        }, 100);
        
        // Show modal with smooth transition
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    function closeModal() {
        modal.classList.remove('active');
        
        // Remove body class after transition completes
        setTimeout(() => {
            document.body.classList.remove('modal-open');
        }, 300);
    }
    
    // Event listeners
    previewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.closest('.project-card').dataset.project;
            openModal(projectId);
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Carousel navigation
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    
    prevButton.addEventListener('click', () => {
        const items = modal.querySelectorAll('.carousel-item');
        currentSlide = (currentSlide - 1 + items.length) % items.length;
        showSlide(currentSlide);
    });
    
    nextButton.addEventListener('click', () => {
        const items = modal.querySelectorAll('.carousel-item');
        currentSlide = (currentSlide + 1) % items.length;
        showSlide(currentSlide);
    });
});

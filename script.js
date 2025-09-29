function createBackground() {
    // Create gradient mesh
    const mesh = document.createElement('div');
    mesh.className = 'gradient-mesh';
    document.body.prepend(mesh);

    // Create floating glow spots with varied sizes and positions
    const spots = 4; // Increased number of spots
    for (let i = 0; i < spots; i++) {
        const spot = document.createElement('div');
        spot.className = 'glow-spot';
        
        // Strategic placement for better visual effect
        if (i === 0) {
            // Top left area
            spot.style.left = `${Math.random() * 30}%`;
            spot.style.top = `${Math.random() * 30}%`;
            spot.style.width = '600px';
            spot.style.height = '600px';
        } else if (i === 1) {
            // Bottom right area
            spot.style.left = `${70 + Math.random() * 30}%`;
            spot.style.top = `${70 + Math.random() * 30}%`;
            spot.style.width = '500px';
            spot.style.height = '500px';
        } else {
            // Random positioning for remaining spots
            spot.style.left = `${20 + Math.random() * 60}%`;
            spot.style.top = `${20 + Math.random() * 60}%`;
            spot.style.width = `${400 + Math.random() * 200}px`;
            spot.style.height = spot.style.width;
        }
        
        spot.style.animationDelay = `${i * -5}s`; // Spread out the animation timing
        document.body.prepend(spot);
    }
}

function createStars() {
    const container = document.createElement('div');
    container.className = 'stars';
    document.body.prepend(container);

    const starCount = 180; // Increased star count
    
    // Create a variety of stars with different sizes and brightness
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1; // Vary star size between 1-3px
        const opacity = Math.random() * 0.5 + 0.5; // Vary star brightness
        const duration = 2 + Math.random() * 4; // Longer animation duration range
        const delay = Math.random() * 3; // Longer delay for more random effect
        
        Object.assign(star.style, {
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            animation: `twinkle ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`
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

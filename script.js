function createBackground() {
    // Create gradient mesh
    const mesh = document.createElement('div');
    mesh.className = 'gradient-mesh';
    document.body.prepend(mesh);

    // Create floating glow spots
    const spots = 3;
    for (let i = 0; i < spots; i++) {
        const spot = document.createElement('div');
        spot.className = 'glow-spot';
        spot.style.left = `${Math.random() * 100}%`;
        spot.style.top = `${Math.random() * 100}%`;
        spot.style.animationDelay = `${i * -3}s`;
        document.body.prepend(spot);
    }
}

function createStars() {
    const container = document.createElement('div');
    container.className = 'stars';
    document.body.prepend(container);

    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 2;
        
        Object.assign(star.style, {
            left: `${x}%`,
            top: `${y}%`,
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

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

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
        showSlide(currentSlide, project.images);
        
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
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

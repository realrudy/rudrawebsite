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

});

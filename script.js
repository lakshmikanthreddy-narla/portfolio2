// --- 1. STARRY BACKGROUND (Canvas) ---
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speed = Math.random() * 0.05 + 0.01; 
        this.opacity = Math.random();
        this.direction = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        this.y -= 0.2; 
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }

        this.opacity += this.speed * this.direction;
        if (this.opacity >= 1) {
            this.opacity = 1;
            this.direction = -1;
        } else if (this.opacity <= 0.1) {
            this.opacity = 0.1;
            this.direction = 1;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
    }
    requestAnimationFrame(animateStars);
}

initStars();
animateStars();

// --- 2. SCROLL REVEAL ANIMATIONS ---
const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => scrollObserver.observe(el));
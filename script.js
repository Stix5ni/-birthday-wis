// Smooth scroll between sections
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        updateActiveDot(index);
    });
});

function updateActiveDot(index) {
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

window.addEventListener('scroll', () => {
    let current = 0;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 300) {
            current = index;
        }
    });
    updateActiveDot(current);
});

// Scroll button
document.getElementById('scrollBtn').addEventListener('click', () => {
    sections[1].scrollIntoView({ behavior: 'smooth' });
});

// Gift box interaction
const giftBox = document.getElementById('giftBox');
const giftMessage = document.getElementById('giftMessage');
let isOpened = false;

giftBox.addEventListener('click', () => {
    if (!isOpened) {
        isOpened = true;
        giftBox.style.display = 'none';
        document.querySelector('.gift-hint').style.display = 'none';
        giftMessage.classList.add('show');

        // Create confetti
        createConfetti();

        // Create fireworks
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.6);
                createFirework(x, y);
            }, i * 150);
        }
    }
});

// Confetti
function createConfetti() {
    const burst = document.getElementById('confettiBurst');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8edea', '#c084fc', '#667eea'];

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        burst.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Fireworks
function createFirework(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8edea', '#c084fc'];

    for (let i = 0; i < 40; i++) {
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.width = '8px';
        firework.style.height = '8px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.borderRadius = '50%';
        firework.style.pointerEvents = 'none';
        firework.style.zIndex = '20';
        document.body.appendChild(firework);

        const angle = (i / 40) * Math.PI * 2;
        const velocity = 5 + Math.random() * 8;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = x;
        let posY = y;
        let velX = vx;
        let velY = vy;

        const animate = () => {
            posX += velX;
            posY += velY;
            velY += 0.2;

            firework.style.left = posX + 'px';
            firework.style.top = posY + 'px';
            firework.style.opacity = 1 - (posY - y) / 500;

            if (posY < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                firework.remove();
            }
        };
        animate();
    }
}

// Restart button
document.getElementById('restartBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    isOpened = false;
    giftBox.style.display = 'block';
    document.querySelector('.gift-hint').style.display = 'block';
    giftMessage.classList.remove('show');
});

// Particles in hero
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, ' + Math.random() * 0.5 + ')';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer?.appendChild(particle);
        }
    }
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-40px) translateX(-10px); }
        75% { transform: translateY(-20px) translateX(10px); }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(floatStyle);

createParticles();

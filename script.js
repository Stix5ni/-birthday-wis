// Confetti effect
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8edea', '#c084fc', '#667eea'];

    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.width = Math.random() * 10 + 5 + 'px';
        confettiPiece.style.height = confettiPiece.style.width;
        confettiPiece.style.borderRadius = '50%';
        confettiPiece.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiPiece.style.animationDelay = Math.random() * 0.5 + 's';
        confettiContainer.appendChild(confettiPiece);
    }
}

// Add fall animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fireworks effect
function createFirework(x, y) {
    const fireworksContainer = document.getElementById('fireworks');

    for (let i = 0; i < 30; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.width = '10px';
        firework.style.height = '10px';
        firework.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8edea', '#c084fc'][Math.floor(Math.random() * 5)];
        firework.style.borderRadius = '50%';

        const angle = (i / 30) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = x;
        let posY = y;
        let velX = vx;
        let velY = vy;

        fireworksContainer.appendChild(firework);

        const animate = () => {
            posX += velX;
            posY += velY;
            velY += 0.2; // gravity

            firework.style.left = posX + 'px';
            firework.style.top = posY + 'px';
            firework.style.opacity = 1 - (posY - y) / 400;

            if (posY < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                firework.remove();
            }
        };
        animate();
    }
}

// Button click event
document.getElementById('surpriseBtn').addEventListener('click', function() {
    createConfetti();

    // Random fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6);
            createFirework(x, y);
        }, i * 150);
    }

    // Button feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);
});

// Initial confetti on page load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});

// Add some sparkle to cards on hover
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '100%';
        sparkle.style.height = '100%';
        sparkle.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)';
        sparkle.style.borderRadius = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkleEffect 0.6s ease-out forwards';

        this.style.position = 'relative';
        this.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 600);
    });
});

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

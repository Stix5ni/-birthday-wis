// Музыка
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isMusicPlaying = false;

musicBtn.addEventListener('click', function() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = '🔊';
        isMusicPlaying = true;
    }
});

// Конфетти
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.shape = Math.floor(Math.random() * 3);
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;

        if (this.shape === 0) {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else if (this.shape === 1) {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}

const confettiArray = [];
for (let i = 0; i < 200; i++) {
    confettiArray.push(new Confetti());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiArray.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });
    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Фейерверки
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

class Firework {
    constructor() {
        this.x = Math.random() * fireworksCanvas.width;
        this.y = fireworksCanvas.height;
        this.targetY = Math.random() * fireworksCanvas.height / 2;
        this.speed = 3;
        this.exploded = false;
        this.particles = [];
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.explode();
            }
        } else {
            this.particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1;
                p.alpha -= 0.01;
                if (p.alpha <= 0) {
                    this.particles.splice(index, 1);
                }
            });
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = Math.random() * 3 + 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                alpha: 1,
                color: this.color
            });
        }
    }

    draw() {
        if (!this.exploded) {
            fwCtx.beginPath();
            fwCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            fwCtx.fillStyle = this.color;
            fwCtx.fill();
        } else {
            this.particles.forEach(p => {
                fwCtx.beginPath();
                fwCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                fwCtx.fillStyle = p.color;
                fwCtx.globalAlpha = p.alpha;
                fwCtx.fill();
                fwCtx.globalAlpha = 1;
            });
        }
    }
}

const fireworks = [];

function animateFireworks() {
    fwCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    fwCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    if (Math.random() < 0.03) {
        fireworks.push(new Firework());
    }

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.exploded && fw.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

// Кнопка сюрприза
const surpriseBtn = document.getElementById('surpriseBtn');
const giftBox = document.getElementById('giftBox');
let clickCount = 0;

const messages = [
    "🎊 Ты самая замечательная!",
    "🌟 И самая умная!",
    "💕 И самая красивая!",
    "🎁 И самая добрая!",
    "🌈 Люблю тебя, сестрёнка!",
    "🎉 С Днём Рождения ещё раз!"
];

surpriseBtn.addEventListener('click', function() {
    if (clickCount < messages.length) {
        surpriseBtn.querySelector('span').textContent = messages[clickCount];
        surpriseBtn.style.background = `linear-gradient(135deg, hsl(${Math.random() * 360}, 80%, 60%), hsl(${Math.random() * 360}, 80%, 60%))`;

        for (let i = 0; i < 50; i++) {
            confettiArray.push(new Confetti());
        }

        clickCount++;

        if (clickCount === messages.length) {
            giftBox.classList.add('show');
        }
    }
});

// Подарочная коробка
giftBox.addEventListener('click', function() {
    for (let i = 0; i < 100; i++) {
        confettiArray.push(new Confetti());
    }
    fireworks.push(new Firework());
    fireworks.push(new Firework());
    fireworks.push(new Firework());
});

// Интерактивные карточки пожеланий
const wishCards = document.querySelectorAll('.wish-card');
wishCards.forEach(card => {
    card.addEventListener('click', function() {
        for (let i = 0; i < 20; i++) {
            confettiArray.push(new Confetti());
        }
    });
});

// Адаптация при изменении размера окна
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
});
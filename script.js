// Конфетти эффект
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
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
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

const confettiArray = [];
for (let i = 0; i < 150; i++) {
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

// Кнопка сюрприза
const surpriseBtn = document.getElementById('surpriseBtn');
let clickCount = 0;

const messages = [
    "🎊 Ура! Ты самая замечательная!",
    "🌟 И самая умная!",
    "💕 И самая красивая!",
    "🎁 И самая добрая!",
    "🌈 Люблю тебя, сестрёнка!",
    "🎉 С Днём Рождения ещё раз!"
];

surpriseBtn.addEventListener('click', function() {
    if (clickCount < messages.length) {
        surpriseBtn.textContent = messages[clickCount];
        surpriseBtn.style.background = `linear-gradient(135deg, hsl(${Math.random() * 360}, 80%, 60%), hsl(${Math.random() * 360}, 80%, 60%))`;

        // Дополнительные конфетти
        for (let i = 0; i < 30; i++) {
            confettiArray.push(new Confetti());
        }

        clickCount++;
    } else {
        surpriseBtn.textContent = "💝 Спасибо за клики!";
        surpriseBtn.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    }
});

// Адаптация canvas при изменении размера окна
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
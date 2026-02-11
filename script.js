const state = {
    plan: 'Dinner & Movie'
};

const elements = {
    pills: document.querySelectorAll('.pill'),
    yesBtn: document.getElementById('yes-btn'),
    noBtn: document.getElementById('no-btn'),
    overlay: document.getElementById('success-overlay'),
    finalPlan: document.getElementById('final-plan'),
    resetBtn: document.getElementById('reset-btn'),
    bg: document.querySelector('.heart-bg')
};

// Plan Selection
elements.pills.forEach(pill => {
    pill.addEventListener('click', () => {
        elements.pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.plan = pill.dataset.plan;
    });
});

// Dodging Logic (Only for mouse/touch, accessible via keyboard)
const dodge = () => {
    const maxX = window.innerWidth - elements.noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - elements.noBtn.offsetHeight - 20;

    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    elements.noBtn.style.position = 'fixed'; // Escape container
    elements.noBtn.style.left = randomX + 'px';
    elements.noBtn.style.top = randomY + 'px';
};

elements.noBtn.addEventListener('mouseenter', dodge);
elements.noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodge();
});

// Success Logic
elements.yesBtn.addEventListener('click', () => {
    elements.finalPlan.textContent = state.plan;
    elements.overlay.classList.remove('hidden');
    elements.noBtn.style.display = 'none'; // Hide rejected button

    // Intense Heart Shower
    setInterval(createHeart, 100);
});

// Reset
elements.resetBtn.addEventListener('click', () => location.reload());

// Heart Animation Helper
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerText = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    elements.bg.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
}

// Initial Atmosphere
for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 200);
}

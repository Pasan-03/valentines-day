document.addEventListener('DOMContentLoaded', () => {
    // State
    // State
    const state = {
        herName: 'Nayanathara',
        yourName: 'Pasan',
        plan: 'Dinner & Movie'
    };

    // DOM Elements
    const elements = {
        askCard: document.getElementById('ask-card'),
        successOverlay: document.getElementById('success-overlay'),

        displays: {
            herName: document.getElementById('display-her-name'),
            yourName: document.getElementById('display-your-name'),
            // Removed display-plan as it's not used in display mode anymore, or we can keep it if we want to show it in success?
            // Actually the plan is selected via pills now.
            successHerName: document.getElementById('success-her-name')
        },

        pills: document.querySelectorAll('.pill'),

        buttons: {
            yes: document.getElementById('yes-btn'),
            no: document.getElementById('no-btn'),
            reset: document.getElementById('reset-btn')
        }
    };

    // --- Plan Selection ---
    elements.pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all
            elements.pills.forEach(p => p.classList.remove('active'));
            // Add to clicked
            pill.classList.add('active');
            // Update state
            state.plan = pill.dataset.plan;
        });
    });

    // --- The "No" Button Dodge Logic ---
    const moveNoButton = (e) => {
        // Only dodge if not using keyboard focus (accessibility)
        // We can detect keyboard usage via the :focus-visible pseudo-class checking,
        // but traditionally mouseover is enough for mouse users.
        // Touch users: handled via touchstart?

        const btn = elements.buttons.no;
        // const container = elements.askCard; // No longer needed for full screen

        const btnRect = btn.getBoundingClientRect();

        // Calculate safe area (WHOLE SCREEN)
        const maxX = window.innerWidth - btnRect.width;
        const maxY = window.innerHeight - btnRect.height;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Apply new position using FIXED to escape the card container
        btn.style.position = 'fixed';
        btn.style.left = `${randomX}px`;
        btn.style.top = `${randomY}px`;
        btn.style.transform = 'none'; // No rotation

        // Ensure it doesn't clip top/left of container (padding is handled by random math 0 to Max)
    };

    // Events for Dodging
    elements.buttons.no.addEventListener('mouseover', moveNoButton);
    elements.buttons.no.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveNoButton();
    });

    // Allow keyboard focus without moving (Accessiblity Requirement)
    elements.buttons.no.addEventListener('focus', () => {
        // Reset position to allow easy clicking if they tabbed successfully?
        // Actually, requirement says "don't dodge when focused via keyboard".
        // The mouseover event won't trigger on tab focus.
        // So we just do nothing here.
    });


    // --- "Yes" Button & Celebration ---
    elements.buttons.yes.addEventListener('click', () => {
        // Show Success
        elements.successOverlay.classList.remove('hidden');

        // Disable No Button
        elements.buttons.no.disabled = true;
        elements.buttons.no.style.opacity = '0.5';

        // Start Hearts
        createHeartShower();
    });

    const createHeartShower = () => {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';

            document.querySelector('.heart-bg').appendChild(heart);

            // Cleanup
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 100); // Faster shower for celebration
    };

    // --- Reset ---
    elements.buttons.reset.addEventListener('click', () => {
        window.location.reload();
    });

    // Initial floating hearts (background ambiance)
    // Add MORE hearts for better background fill
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // Slower background hearts
            document.querySelector('.heart-bg').appendChild(heart);
        }, i * 300);
    }
});

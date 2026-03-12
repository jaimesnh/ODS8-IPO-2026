document.addEventListener('DOMContentLoaded', () => {
    // Helper function for haptic feedback
    const triggerHaptic = (pattern = 50) => {
        const isHaptic = localStorage.getItem('haptic') === 'true';
        if (isHaptic && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    // Apply saved settings on load
    const applySettings = () => {
        if (localStorage.getItem('high-contrast') === 'true') {
            document.body.classList.add('high-contrast');
            const hcToggle = document.getElementById('high-contrast');
            if (hcToggle) hcToggle.checked = true;
        }

        if (localStorage.getItem('large-text') === 'true') {
            document.body.classList.add('large-text');
            const ltToggle = document.getElementById('large-text');
            if (ltToggle) ltToggle.checked = true;
        }

        if (localStorage.getItem('subtitles') === 'true') {
            document.body.classList.add('subtitles-on');
            const subToggle = document.getElementById('subtitles');
            if (subToggle) subToggle.checked = true;
        }

        const hapticToggle = document.getElementById('haptic');
        if (hapticToggle && localStorage.getItem('haptic') === 'true') {
            hapticToggle.checked = true;
        }
    };

    // Initialize logic
    applySettings();

    // 1. High Contrast Mode
    const highContrastToggle = document.getElementById('high-contrast');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', (e) => {
            triggerHaptic();
            if (e.target.checked) {
                document.body.classList.add('high-contrast');
                localStorage.setItem('high-contrast', 'true');
            } else {
                document.body.classList.remove('high-contrast');
                localStorage.setItem('high-contrast', 'false');
            }
        });
    }

    // 2. Increase Text Size
    const largeTextToggle = document.getElementById('large-text');
    if (largeTextToggle) {
        largeTextToggle.addEventListener('change', (e) => {
            triggerHaptic();
            if (e.target.checked) {
                document.body.classList.add('large-text');
                localStorage.setItem('large-text', 'true');
            } else {
                document.body.classList.remove('large-text');
                localStorage.setItem('large-text', 'false');
            }
        });
    }

    // 3. Subtitles
    const subtitlesToggle = document.getElementById('subtitles');
    if (subtitlesToggle) {
        subtitlesToggle.addEventListener('change', (e) => {
            triggerHaptic();
            if (e.target.checked) {
                document.body.classList.add('subtitles-on');
                localStorage.setItem('subtitles', 'true');
            } else {
                document.body.classList.remove('subtitles-on');
                localStorage.setItem('subtitles', 'false');
            }
        });
    }

    // 4. Haptic Feedback
    const hapticToggle = document.getElementById('haptic');
    if (hapticToggle) {
        hapticToggle.addEventListener('change', (e) => {
            localStorage.setItem('haptic', e.target.checked ? 'true' : 'false');
            if (e.target.checked && navigator.vibrate) {
                navigator.vibrate([50, 50, 50]); // Success vibration pattern
            }
        });
    }

    // Modal Logic
    const achievementsModal = document.getElementById('achievements-modal');
    const viewAllBtn = document.getElementById('view-all-btn');

    const accountModal = document.getElementById('account-modal');
    const accountDetailsBtn = document.getElementById('account-details-btn');

    const closeButtons = document.querySelectorAll('[data-close]');

    const openModal = (modal) => {
        if (modal) {
            triggerHaptic();
            modal.removeAttribute('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            triggerHaptic([30]);
            modal.setAttribute('hidden', '');
            document.body.style.overflow = '';
        }
    };

    // Open Achievements
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(achievementsModal);
        });
    }

    // Open Account Details
    if (accountDetailsBtn) {
        accountDetailsBtn.addEventListener('click', () => {
            openModal(accountModal);
        });
    }

    // Close Modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-close');
            const targetModal = document.getElementById(`${targetId}-modal`);
            closeModal(targetModal);
        });
    });

    // Save Account Settings mock
    const saveAccountBtn = document.getElementById('save-account-btn');
    if (saveAccountBtn) {
        saveAccountBtn.addEventListener('click', () => {
            triggerHaptic([30, 50, 30]);
            alert('\u00a1Configuración guardada correctamente!');
            closeModal(accountModal);
        });
    }

    // Other Buttons
    const editBtn = document.querySelector('.edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            triggerHaptic();
            openModal(accountModal);
        });
    }

    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
            triggerHaptic([30, 50, 30]);
            if (confirm('¿Seguro que quieres cerrar sesión?')) {
                alert('Sesión cerrada correctamente.');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Apply saved accessibility settings on load
    const applyGlobalSettings = () => {
        if (localStorage.getItem('high-contrast') === 'true') {
            document.body.classList.add('high-contrast');
        }

        if (localStorage.getItem('large-text') === 'true') {
            document.body.classList.add('large-text');
        }

        if (localStorage.getItem('subtitles') === 'true') {
            document.body.classList.add('subtitles-on');
        }
    };

    applyGlobalSettings();
});

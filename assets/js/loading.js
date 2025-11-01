// ===== LOADING SCREEN =====
let progress = 0;

export function initLoadingScreen() {
    const progressFill = document.getElementById('progressFill');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingScreen = document.getElementById('loadingScreen');

    function updateProgress() {
        if (progress < 100) {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;

            progressFill.style.width = progress + '%';
            loadingPercent.textContent = Math.floor(progress) + '%';

            setTimeout(updateProgress, 100);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Notify main.js that loading is complete
                document.dispatchEvent(new CustomEvent('loadingComplete'));
            }, 500);
        }
    }

    // Start loading simulation
    updateProgress();
}

// ===== MAIN APPLICATION ENTRY POINT =====

import { initLoadingScreen } from './loading.js';
import { initCustomCursor } from './cursor.js';
import { init3D, update3DOnScroll } from './3d-background.js';
import {
    revealOnScroll,
    handleNavbar,
    animateSkillCircles,
    initSmoothScrolling,
    showHeroContent
} from './animations.js';
import {
    downloadCV,
    showEasterEgg,
    closeEasterEgg,
    showModal,
    closeModal,
    initModalCloseOnOutsideClick,

} from './utils.js';

// ===== INITIALIZATION =====
function init() {
    // Initialize loading screen
    initLoadingScreen();

    // Initialize custom cursor (desktop only)
    initCustomCursor();

    // Listen for loading complete event
    document.addEventListener('loadingComplete', () => {
        init3D();
    });

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize modal close on outside click
    initModalCloseOnOutsideClick();

    // Show hero content on page load
    window.addEventListener('load', showHeroContent);

    // Scroll event listeners
    window.addEventListener('scroll', () => {
        revealOnScroll();
        handleNavbar();
        animateSkillCircles();
        update3DOnScroll();
    });

    // Initial reveal check
    revealOnScroll();
    animateSkillCircles();

    // Try to load experience data (non-blocking)
    renderExperienceFromJSON();
}

// ===== EXPOSE FUNCTIONS TO GLOBAL SCOPE FOR HTML ONCLICK HANDLERS =====
window.downloadCV = downloadCV;
window.showEasterEgg = showEasterEgg;
window.closeEasterEgg = closeEasterEgg;
window.showModal = showModal;
window.closeModal = closeModal;

// ===== START APPLICATION =====
init();

// ===== DYNAMIC EXPERIENCE RENDERING (Optional) =====
async function renderExperienceFromJSON() {
    const container = document.getElementById('experience-timeline');
    if (!container) return; // No experience section present

    try {
        const res = await fetch('assets/data/experience.json', { cache: 'no-store' });
        if (!res.ok) return; // Silently skip if not found
        const data = await res.json();
        if (!data || !Array.isArray(data.experiences) || data.experiences.length === 0) return;

        container.innerHTML = data.experiences.map((exp, idx) => {
            const title = exp.title || '';
            const company = exp.company || '';
            const location = exp.location ? ` • ${exp.location}` : '';
            const start = exp.start || '';
            const end = exp.end && exp.end.trim() ? exp.end : 'Present';
            const date = [start, end].filter(Boolean).join(' - ');
            const points = Array.isArray(exp.description) ? exp.description : [];
            const delayClass = idx > 0 ? ` skill-delay-${(idx % 6) + 1}` : '';

            const items = points.map(p => `<li>${escapeHtml(p)}</li>`).join('');

            return `
                <div class="timeline-item scroll-reveal${delayClass}">
                    <div class="timeline-content">
                        <div class="timeline-title">${escapeHtml(title)}</div>
                        <div class="timeline-company">${escapeHtml(company)}${escapeHtml(location)}</div>
                        <div class="timeline-date">${escapeHtml(date)}</div>
                        ${items ? `<ul>${items}</ul>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (e) {
        // Ignore errors to avoid breaking the static page when running from file:// or without JSON
        // console.warn('Experience JSON not loaded:', e);
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

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
}

// ===== EXPOSE FUNCTIONS TO GLOBAL SCOPE FOR HTML ONCLICK HANDLERS =====
window.downloadCV = downloadCV;
window.showEasterEgg = showEasterEgg;
window.closeEasterEgg = closeEasterEgg;
window.showModal = showModal;
window.closeModal = closeModal;

// ===== START APPLICATION =====
init();

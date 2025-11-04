// ===== UTILITY FUNCTIONS =====

// Download CV
export function downloadCV() {
    alert('📥 CV Download feature! In a real implementation, this would download your PDF CV.');
    // Uncomment and modify when you have a real CV file:
    // window.location.href = 'assets/cv/your-cv.pdf';
}

// Easter Egg
export function showEasterEgg() {
    const easterEgg = document.getElementById('easterEgg');
    if (easterEgg) {
        easterEgg.classList.add('show');
    }
}

export function closeEasterEgg() {
    const easterEgg = document.getElementById('easterEgg');
    if (easterEgg) {
        easterEgg.classList.remove('show');
    }
}

// Project Modal
export function showModal(title, description) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const projectModal = document.getElementById('projectModal');

    if (modalTitle && modalDescription && projectModal) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        projectModal.classList.add('show');
    }
}

export function closeModal() {
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.classList.remove('show');
    }
}

export function initModalCloseOnOutsideClick() {
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target.id === 'projectModal') {
                closeModal();
            }
        });
    }
}


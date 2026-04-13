// ===== UTILITY FUNCTIONS =====

// Download CV
export function downloadCV() {
    const link = document.createElement('a');
    link.href = 'https://filebrowser.narexil.tech/api/public/dl/1hYE9tcK?inline=true';
    link.download = 'Hicham_Bouchikhi_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
export function showModal(title, description, url) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const projectModal = document.getElementById('projectModal');

    if (modalTitle && modalDescription && projectModal) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        if (modalLink) {
            if (url) {
                modalLink.href = url;
                modalLink.style.display = '';
            } else {
                modalLink.style.display = 'none';
            }
        }
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


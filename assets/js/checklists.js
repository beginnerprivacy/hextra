document.addEventListener("DOMContentLoaded", function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            const overlay = document.querySelector('.overlay')
            const navoverlay = document.querySelector('.nav-overlay')
            overlay.style.display = 'block';
            navoverlay.style.display = 'block';
        }
    }

    const modalId = getQueryParam('m');
    if (modalId) {
        showModal(modalId);
    }

    const checklistCards = document.querySelectorAll('.checklist-card');
    checklistCards.forEach(card => {
        card.addEventListener('click', function(event) {
            event.preventDefault();
            const href = card.getAttribute('href');
            const modalIdFromHref = new URLSearchParams(href.split('?')[1]).get('m');
            if (modalIdFromHref) {
                showModal(modalIdFromHref);
            }
        });
    });
});
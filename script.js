document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }

    const pageLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    pageLinks.forEach(function (link) {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        }
    });

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    if (window.AOS && typeof AOS.init === 'function') {
        AOS.init({ duration: 800, once: true });
    }

    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const fullname = contactForm.querySelector('#fullname');
            const email = contactForm.querySelector('#email');
            const interest = contactForm.querySelector('#interest');
            const message = contactForm.querySelector('#message');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!fullname.value.trim() || !emailPattern.test(email.value.trim()) || !interest.value || !message.value.trim()) {
                alert('Please complete all required fields before submitting.');
                return;
            }

            contactForm.innerHTML = '<div class="form-success"><h3>Thanks for reaching out!</h3><p>Your application has been received. We will contact you soon.</p></div>';
        });
    }
});

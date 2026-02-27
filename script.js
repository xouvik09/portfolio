(function () {
    'use strict';

    function init() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const contactForm = document.getElementById('contactForm');
        const visitorCountEl = document.getElementById('visitor-count');
        const counterEl = document.getElementById('counter');

        // Visitor counter (supports #visitor-count and #counter)
        if (visitorCountEl || counterEl) {
            fetch('https://vfjsrdkot4.execute-api.eu-north-1.amazonaws.com/count')
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function (data) {
                    var value = typeof data === 'number' ? data : data.count;
                    if (visitorCountEl) {
                        visitorCountEl.textContent = value;
                    }
                    if (counterEl) {
                        counterEl.innerText = value;
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching visitor count:', error);
                    if (visitorCountEl) {
                        visitorCountEl.textContent = 'Error';
                    }
                    if (counterEl) {
                        counterEl.innerText = 'Error';
                    }
                });
        }

        // Navbar scroll effect
        if (navbar) {
            function updateNavbar() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            window.addEventListener('scroll', updateNavbar);
            updateNavbar();
        }

        // Mobile menu
        if (hamburger && navLinks) {
            function setMenuOpen(open) {
                hamburger.classList.toggle('active', open);
                navLinks.classList.toggle('active', open);
                hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            }

            hamburger.addEventListener('click', function () {
                setMenuOpen(!navLinks.classList.contains('active'));
            });

            navLinks.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    setMenuOpen(false);
                });
            });

            // Close menu when resizing to desktop
            window.addEventListener('resize', function () {
                if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                    setMenuOpen(false);
                }
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 100;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });

        // Scroll reveal
        const reveals = document.querySelectorAll('.reveal');
        function checkReveal() {
            const windowHeight = window.innerHeight;
            const revealPoint = 100;
            reveals.forEach(function (element) {
                const revealTop = element.getBoundingClientRect().top;
                if (revealTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', checkReveal, { passive: true });
        checkReveal();

        // Contact form: mailto with pre-filled recipient and body
        var yourEmail = 'souvik.ghosh.9279@outlook.com';
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var nameEl = document.getElementById('name');
                var emailEl = document.getElementById('email');
                var messageEl = document.getElementById('message');
                var name = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
                var email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
                var message = (messageEl && messageEl.value) ? messageEl.value.trim() : '';
                var subject = 'Portfolio message from ' + (name || 'Visitor');
                var body = message + (name || email ? '\n\n—\nSent by: ' + name + (email ? '\nEmail: ' + email : '') : '');
                var mailtoUrl = 'mailto:' + encodeURIComponent(yourEmail) +
                    '?subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(body);
                window.location.href = mailtoUrl;
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

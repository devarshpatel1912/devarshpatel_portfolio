/* ============================================
   DEVARSH PATEL — PORTFOLIO INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== NAVBAR ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==================== ACTIVE NAV HIGHLIGHTING ====================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);

    // ==================== PROJECT FILTERING ====================
    const filterBtns = document.querySelectorAll('.filter-btn:not(.idea-filter-btn):not(.vision-filter-btn)');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const cardCat = card.dataset.category || '';
                if (filter === 'all' || cardCat === filter || cardCat.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==================== VISION / IDEAS FILTERING ====================
    const visionFilterBtns = document.querySelectorAll('.vision-filter-btn, .idea-filter-btn');
    const visionCards = document.querySelectorAll('.vision-card, .idea-card');

    visionFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            visionFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            visionCards.forEach(card => {
                const categories = card.dataset.categories ? card.dataset.categories.split(',') : [];
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==================== COPY EMAIL TO CLIPBOARD ====================
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = document.getElementById('email-address-text');
            const email = emailText ? emailText.textContent.trim() : 'devarshpatel.191204@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                const icon = document.getElementById('copy-icon');
                if (icon) {
                    icon.className = 'fas fa-check';
                    copyEmailBtn.classList.add('copied');
                    setTimeout(() => {
                        icon.className = 'far fa-copy';
                        copyEmailBtn.classList.remove('copied');
                    }, 2000);
                }
            }).catch(() => {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            });
        });
    }

    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('form-name').value.trim(),
                email: document.getElementById('form-email').value.trim(),
                subject: document.getElementById('form-subject').value.trim(),
                message: document.getElementById('form-message').value.trim()
            };

            // Client-side validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    showFormStatus(data.message, 'success');
                    contactForm.reset();
                } else {
                    showFormStatus(data.errors ? data.errors.join(' ') : 'Something went wrong.', 'error');
                }
            } catch (error) {
                showFormStatus('Network error. Please try again later.', 'error');
            }
        });
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll(
        '.section-badge, .section-title, .section-subtitle, .subsection-title, ' +
        '.about-grid, .stats-grid, .stat-card, .project-card, .filter-btn, ' +
        '.timeline-item, .education-card, .skill-card, .domain-tag, ' +
        '.additional-card, .contact-hero, .connect-card, .contact-cta-wrapper, .info-card, .vision-card, .idea-card'
    );

    // Add reveal class
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== TYPING EFFECT FOR HERO (optional enhancement) ====================
    // Subtle typing cursor effect on hero title
    const heroGreeting = document.querySelector('.hero-greeting');
    if (heroGreeting) {
        heroGreeting.style.borderRight = '2px solid var(--accent)';
        heroGreeting.style.animation = 'blink 1s step-end infinite';
        
        // Add blink keyframe dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                50% { border-color: transparent; }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            heroGreeting.style.borderRight = 'none';
            heroGreeting.style.animation = 'none';
        }, 3000);
    }

    // ==================== CLOSE MOBILE MENU ON OUTSIDE CLICK ====================
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ==================== PARALLAX EFFECT FOR HERO ====================
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }

});

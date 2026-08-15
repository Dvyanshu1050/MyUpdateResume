// DOM Elements
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const backToTop = document.getElementById('back-to-top');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const typingText = document.getElementById('typing-text');


// ================================
// PRELOADER
// ================================

window.addEventListener('load', () => {
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }

        document.body.style.overflow = 'visible';
    }, 1000);
});


// ================================
// CUSTOM CURSOR
// ================================

if (window.innerWidth > 768 && cursor && cursorFollower) {

    document.addEventListener('mousemove', (e) => {

        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });


    const hoverElements = document.querySelectorAll(
        'a, button, .project-card, .skill-card'
    );

    hoverElements.forEach(el => {

        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });

    });
}


// ================================
// TYPING ANIMATION
// ================================

const texts = [
    'Full Stack Developer',
    'Java Enthusiast',
    'JavaScript Expert',
    'React.js Developer',
    'Problem Solver',
    'Tech Innovator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;


function typeWriter() {

    if (!typingText) return;

    const currentText = texts[textIndex];

    if (isDeleting) {

        typingText.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

    } else {

        typingText.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;
    }


    let typeSpeed = isDeleting ? 50 : 100;


    if (!isDeleting && charIndex === currentText.length) {

        typeSpeed = 2000;
        isDeleting = true;

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }


    setTimeout(typeWriter, typeSpeed);
}


document.addEventListener('DOMContentLoaded', () => {

    setTimeout(typeWriter, 1000);

});


// ================================
// THEME TOGGLE
// ================================

if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        const currentTheme =
            document.documentElement.getAttribute('data-theme');

        const newTheme =
            currentTheme === 'dark' ? 'light' : 'dark';


        document.documentElement.setAttribute(
            'data-theme',
            newTheme
        );

        localStorage.setItem(
            'theme',
            newTheme
        );


        const icon = themeToggle.querySelector('i');

        if (icon) {
            icon.className =
                newTheme === 'dark'
                    ? 'fas fa-sun'
                    : 'fas fa-moon';
        }

    });
}


// Load saved theme

const savedTheme =
    localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute(
    'data-theme',
    savedTheme
);


if (themeToggle) {

    const themeIcon =
        themeToggle.querySelector('i');

    if (themeIcon) {

        themeIcon.className =
            savedTheme === 'dark'
                ? 'fas fa-sun'
                : 'fas fa-moon';
    }
}


// ================================
// NAVBAR SCROLL EFFECT
// ================================

window.addEventListener('scroll', () => {

    if (!navbar || !backToTop) return;

    if (window.scrollY > 100) {

        navbar.classList.add('scrolled');
        backToTop.classList.add('visible');

    } else {

        navbar.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }

});


// ================================
// MOBILE MENU
// ================================

if (hamburger && navMenu) {

    hamburger.addEventListener('click', () => {

        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

    });

}


// Close mobile menu

navLinks.forEach(link => {

    link.addEventListener('click', () => {

        if (navMenu) {
            navMenu.classList.remove('active');
        }

        if (hamburger) {
            hamburger.classList.remove('active');
        }

    });

});


// ================================
// SMOOTH SCROLLING
// ================================

navLinks.forEach(link => {

    link.addEventListener('click', (e) => {

        const targetId =
            link.getAttribute('href');

        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        const targetSection =
            document.querySelector(targetId);

        if (targetSection) {

            e.preventDefault();

            const offsetTop =
                targetSection.offsetTop - 80;

            window.scrollTo({

                top: offsetTop,

                behavior: 'smooth'

            });
        }

    });

});


// ================================
// ACTIVE NAVIGATION LINK
// ================================

window.addEventListener('scroll', () => {

    const sections =
        document.querySelectorAll('section');

    const scrollPos =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute('id');

        const correspondingLink =
            document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );


        if (
            scrollPos >= sectionTop &&
            scrollPos < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link =>
                link.classList.remove('active')
            );


            if (correspondingLink) {

                correspondingLink.classList.add(
                    'active'
                );

            }

        }

    });

});


// ================================
// SKILLS CATEGORY SWITCHING
// ================================

const skillCategories =
    document.querySelectorAll('.skill-category');

const skillsGrids =
    document.querySelectorAll('.skills-grid');


skillCategories.forEach(category => {

    category.addEventListener('click', () => {

        const targetCategory =
            category.getAttribute('data-category');


        skillCategories.forEach(cat =>
            cat.classList.remove('active')
        );

        category.classList.add('active');


        skillsGrids.forEach(grid => {

            grid.classList.remove('active');


            if (
                grid.getAttribute('data-content') ===
                targetCategory
            ) {

                setTimeout(() => {

                    grid.classList.add('active');

                }, 150);

            }

        });

    });

});


// ================================
// COUNTER ANIMATION
// ================================

function animateCounters() {

    const counters =
        document.querySelectorAll('.stat-number');


    counters.forEach(counter => {

        const target =
            parseInt(
                counter.getAttribute('data-count')
            );

        const increment =
            target / 100;

        let current = 0;


        const updateCounter = () => {

            if (current < target) {

                current += increment;

                counter.textContent =
                    Math.ceil(current);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                if (target === 20) {

                    counter.textContent =
                        target + "+";

                } else {

                    counter.textContent =
                        target;
                }

            }

        };


        updateCounter();

    });

}


// ================================
// INTERSECTION OBSERVER
// ================================

const observerOptions = {

    threshold: 0.1,

    rootMargin:
        '0px 0px -50px 0px'

};


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        'visible'
                    );


                    // Skill progress bars

                    if (
                        entry.target.classList.contains(
                            'skills-grid'
                        )
                    ) {

                        const progressBars =
                            entry.target.querySelectorAll(
                                '.skill-progress'
                            );


                        progressBars.forEach(bar => {

                            const width =
                                bar.getAttribute(
                                    'data-width'
                                );


                            setTimeout(() => {

                                bar.style.width =
                                    width;

                            }, 300);

                        });

                    }


                    // Counters

                    if (
                        entry.target.classList.contains(
                            'about-stats'
                        )
                    ) {

                        animateCounters();

                    }

                }

            });

        },

        observerOptions
    );


// ================================
// ANIMATION CLASSES
// ================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const fadeElements =
            document.querySelectorAll(
                '.section-header, .about-card, .skill-card, .project-card, .timeline-item, .contact-card, .contact-form'
            );


        fadeElements.forEach(el => {

            el.classList.add('fade-in');

            observer.observe(el);

        });


        const slideLeftElements =
            document.querySelectorAll(
                '.hero-text, .about-text'
            );


        slideLeftElements.forEach(el => {

            el.classList.add(
                'slide-in-left'
            );

            observer.observe(el);

        });


        const slideRightElements =
            document.querySelectorAll(
                '.hero-image, .about-stats'
            );


        slideRightElements.forEach(el => {

            el.classList.add(
                'slide-in-right'
            );

            observer.observe(el);

        });


        const scaleElements =
            document.querySelectorAll(
                '.profile-card, .skills-grid'
            );


        scaleElements.forEach(el => {

            el.classList.add(
                'scale-in'
            );

            observer.observe(el);

        });

    }
);


// ==================================================
// CONTACT FORM
// ==================================================

const contactName =
    document.getElementById('name');

const contactEmail =
    document.getElementById('email');

const contactSubject =
    document.getElementById('subject');

const contactMessage =
    document.getElementById('message');


// ================================
// LOAD SAVED FORM DATA
// ================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        if (!contactName) return;


        const savedName =
            localStorage.getItem(
                'contact_name'
            );

        const savedEmail =
            localStorage.getItem(
                'contact_email'
            );

        const savedSubject =
            localStorage.getItem(
                'contact_subject'
            );

        const savedMessage =
            localStorage.getItem(
                'contact_message'
            );


        if (savedName !== null) {

            contactName.value =
                savedName;

        }


        if (
            contactEmail &&
            savedEmail !== null
        ) {

            contactEmail.value =
                savedEmail;

        }


        if (
            contactSubject &&
            savedSubject !== null
        ) {

            contactSubject.value =
                savedSubject;

        }


        if (
            contactMessage &&
            savedMessage !== null
        ) {

            contactMessage.value =
                savedMessage;

        }

    }
);


// ================================
// SAVE FORM DATA
// ================================

if (contactName) {

    contactName.addEventListener(
        'input',
        () => {

            localStorage.setItem(
                'contact_name',
                contactName.value
            );

        }
    );

}


if (contactEmail) {

    contactEmail.addEventListener(
        'input',
        () => {

            localStorage.setItem(
                'contact_email',
                contactEmail.value
            );

        }
    );

}


if (contactSubject) {

    contactSubject.addEventListener(
        'input',
        () => {

            localStorage.setItem(
                'contact_subject',
                contactSubject.value
            );

        }
    );

}


if (contactMessage) {

    contactMessage.addEventListener(
        'input',
        () => {

            localStorage.setItem(
                'contact_message',
                contactMessage.value
            );

        }
    );

}


// ================================
// CONTACT FORM SUBMIT
// ================================

if (contactForm) {

    contactForm.addEventListener(
        'submit',
        (e) => {

            const submitBtn =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const formData =
                new FormData(contactForm);


            const name =
                formData.get('name');

            const email =
                formData.get('email');

            const subject =
                formData.get('subject');

            const message =
                formData.get('message');


            // Validation

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                e.preventDefault();

                showNotification(
                    'Please fill in all fields',
                    'error'
                );

                return;

            }


            if (!isValidEmail(email)) {

                e.preventDefault();

                showNotification(
                    'Please enter a valid email address',
                    'error'
                );

                return;

            }


            // IMPORTANT:
            // Do NOT use preventDefault here.
            // FormSubmit must receive the request.

            if (submitBtn) {

                submitBtn.innerHTML =
                    '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

                submitBtn.disabled = true;

            }

        }
    );

}


// ================================
// EMAIL VALIDATION
// ================================

function isValidEmail(email) {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

}


// ================================
// NOTIFICATION SYSTEM
// ================================

function showNotification(
    message,
    type = 'info'
) {

    const notification =
        document.createElement('div');

    notification.className =
        `notification ${type}`;


    const icon =
        type === 'success'
            ? 'fa-check-circle'
            : type === 'error'
                ? 'fa-exclamation-circle'
                : 'fa-info-circle';


    notification.innerHTML = `

        <i class="fas ${icon}"></i>

        <span>${message}</span>

        <button class="notification-close">

            <i class="fas fa-times"></i>

        </button>

    `;


    notification.style.cssText = `

        position: fixed;

        top: 100px;

        right: 20px;

        padding: 1rem 1.5rem;

        border-radius: 0.75rem;

        color: white;

        font-weight: 500;

        z-index: 10000;

        transform: translateX(100%);

        transition:
            transform 0.3s
            cubic-bezier(0.4, 0, 0.2, 1);

        max-width: 350px;

        display: flex;

        align-items: center;

        gap: 0.75rem;

        box-shadow:
            0 20px 25px -5px
            rgba(0, 0, 0, 0.1);

    `;


    const colors = {

        success: '#10b981',

        error: '#ef4444',

        warning: '#f59e0b',

        info: '#3b82f6'

    };


    notification.style.background =
        colors[type] || colors.info;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.style.transform =
            'translateX(0)';

    }, 100);


    const closeBtn =
        notification.querySelector(
            '.notification-close'
        );


    closeBtn.style.cssText = `

        background: none;

        border: none;

        color: white;

        cursor: pointer;

        padding: 0.25rem;

        margin-left: auto;

    `;


    closeBtn.addEventListener(
        'click',
        () => {

            removeNotification(
                notification
            );

        }
    );


    setTimeout(() => {

        removeNotification(
            notification
        );

    }, 5000);

}


function removeNotification(
    notification
) {

    notification.style.transform =
        'translateX(100%)';


    setTimeout(() => {

        if (notification.parentNode) {

            document.body.removeChild(
                notification
            );

        }

    }, 300);

}


// ================================
// BACK TO TOP
// ================================

if (backToTop) {

    backToTop.addEventListener(
        'click',
        () => {

            window.scrollTo({

                top: 0,

                behavior: 'smooth'

            });

        }
    );

}


// ================================
// PARALLAX EFFECT
// ================================

window.addEventListener(
    'scroll',
    () => {

        const scrolled =
            window.pageYOffset;

        const shapes =
            document.querySelectorAll(
                '.shape'
            );


        shapes.forEach(
            (shape, index) => {

                const speed =
                    (index + 1) * 0.1;

                shape.style.transform =
                    `translateY(${scrolled * speed}px)`;

            }
        );

    }
);


// ================================
// BUTTON HOVER EFFECT
// ================================

document
    .querySelectorAll('.btn')
    .forEach(button => {

        button.addEventListener(
            'mouseenter',
            function () {

                this.style.transform =
                    'translateY(-3px)';

            }
        );


        button.addEventListener(
            'mouseleave',
            function () {

                this.style.transform =
                    'translateY(0)';

            }
        );

    });


// ================================
// RIPPLE EFFECT
// ================================

document
    .querySelectorAll(
        '.btn, .social-link, .project-link'
    )
    .forEach(element => {

        element.addEventListener(
            'click',
            function (e) {

                const ripple =
                    document.createElement(
                        'span'
                    );


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                const x =
                    e.clientX -
                    rect.left -
                    size / 2;


                const y =
                    e.clientY -
                    rect.top -
                    size / 2;


                ripple.style.cssText = `

                    position: absolute;

                    width: ${size}px;

                    height: ${size}px;

                    left: ${x}px;

                    top: ${y}px;

                    background:
                        rgba(255,255,255,0.3);

                    border-radius: 50%;

                    transform: scale(0);

                    animation:
                        ripple 0.6s ease-out;

                    pointer-events: none;

                `;


                this.style.position =
                    'relative';

                this.style.overflow =
                    'hidden';


                this.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


// ================================
// RIPPLE ANIMATION
// ================================

const style =
    document.createElement('style');


style.textContent = `

    @keyframes ripple {

        to {

            transform: scale(2);

            opacity: 0;

        }

    }

`;


document.head.appendChild(
    style
);


// ================================
// THROTTLE
// ================================

function throttle(
    func,
    wait
) {

    let timeout;


    return function executedFunction(
        ...args
    ) {

        const later = () => {

            clearTimeout(timeout);

            func(...args);

        };


        clearTimeout(timeout);

        timeout =
            setTimeout(
                later,
                wait
            );

    };

}


// ================================
// THROTTLED SCROLL
// ================================

const throttledScroll =
    throttle(
        () => {

            if (
                navbar &&
                backToTop
            ) {

                if (
                    window.scrollY > 100
                ) {

                    navbar.classList.add(
                        'scrolled'
                    );

                    backToTop.classList.add(
                        'visible'
                    );

                } else {

                    navbar.classList.remove(
                        'scrolled'
                    );

                    backToTop.classList.remove(
                        'visible'
                    );

                }

            }


            const scrolled =
                window.pageYOffset;


            const shapes =
                document.querySelectorAll(
                    '.shape'
                );


            shapes.forEach(
                (shape, index) => {

                    const speed =
                        (index + 1) * 0.1;

                    shape.style.transform =
                        `translateY(${scrolled * speed}px)`;

                }
            );


            const sections =
                document.querySelectorAll(
                    'section'
                );


            const scrollPos =
                window.scrollY + 150;


            sections.forEach(
                section => {

                    const sectionTop =
                        section.offsetTop;

                    const sectionHeight =
                        section.offsetHeight;

                    const sectionId =
                        section.getAttribute(
                            'id'
                        );


                    const correspondingLink =
                        document.querySelector(
                            `.nav-link[href="#${sectionId}"]`
                        );


                    if (
                        scrollPos >= sectionTop &&
                        scrollPos <
                            sectionTop +
                            sectionHeight
                    ) {

                        navLinks.forEach(
                            link =>
                                link.classList.remove(
                                    'active'
                                )
                        );


                        if (
                            correspondingLink
                        ) {

                            correspondingLink.classList.add(
                                'active'
                            );

                        }

                    }

                }
            );

        },

        16
    );


window.addEventListener(
    'scroll',
    throttledScroll
);


// ================================
// INITIALIZE
// ================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        document.body.classList.add(
            'loading'
        );


        setTimeout(() => {

            document.body.classList.remove(
                'loading'
            );

        }, 500);


        const reveals =
            document.querySelectorAll(
                '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
            );


        reveals.forEach(
            element => {

                const windowHeight =
                    window.innerHeight;

                const elementTop =
                    element.getBoundingClientRect()
                        .top;

                const elementVisible =
                    150;


                if (
                    elementTop <
                    windowHeight -
                    elementVisible
                ) {

                    element.classList.add(
                        'visible'
                    );

                }

            }
        );

    }
);


// ================================
// SMOOTH PAGE TRANSITION
// ================================

window.addEventListener(
    'beforeunload',
    () => {

        document.body.style.opacity =
            '0';

    }
);


// ================================
// IMAGE ERROR HANDLING
// ================================

document
    .querySelectorAll('img')
    .forEach(img => {

        img.addEventListener(
            'error',
            function () {

                this.style.display =
                    'none';

            }
        );

    });


// ================================
// KEYBOARD NAVIGATION
// ================================

document.addEventListener(
    'keydown',
    (e) => {

        if (e.key === 'Escape') {

            if (navMenu) {
                navMenu.classList.remove(
                    'active'
                );
            }

            if (hamburger) {
                hamburger.classList.remove(
                    'active'
                );
            }

        }


        if (e.key === 'Tab') {

            document.body.classList.add(
                'keyboard-navigation'
            );

        }

    }
);


document.addEventListener(
    'mousedown',
    () => {

        document.body.classList.remove(
            'keyboard-navigation'
        );

    }
);


// ================================
// ACCESSIBILITY FOCUS STYLE
// ================================

const focusStyle =
    document.createElement('style');


focusStyle.textContent = `

    .keyboard-navigation *:focus {

        outline:
            2px solid
            var(--primary-color) !important;

        outline-offset:
            2px !important;

    }

`;


document.head.appendChild(
    focusStyle
);


// ================================
// SKILL SHOW / HIDE
// ================================

const showButtons =
    document.querySelectorAll(
        '.show-btn'
    );

const allSkillCards =
    document.querySelectorAll(
        '.skill-card'
    );

const backBtn =
    document.getElementById(
        'showAllBtn'
    );

const backWrapper =
    document.querySelector(
        '.back-btn'
    );


showButtons.forEach(
    (btn, index) => {

        btn.addEventListener(
            'click',
            () => {

                allSkillCards.forEach(
                    (card, i) => {

                        if (i !== index) {

                            card.style.display =
                                'none';

                        } else {

                            card.style.display =
                                'block';

                        }

                    }
                );


                if (backWrapper) {

                    backWrapper.style.display =
                        'block';

                }

            }
        );

    }
);


if (backBtn) {

    backBtn.addEventListener(
        'click',
        () => {

            allSkillCards.forEach(
                card => {

                    card.style.display =
                        'block';

                }
            );


            if (backWrapper) {

                backWrapper.style.display =
                    'none';

            }

        }
    );

}


// ================================
// CASE STUDY DATA
// ================================

const caseData = {

    pizza: {

        title:
            "Pizza Delivery Website",

        overview:
            "Developed a responsive online food ordering platform with cart system & delivery tracking.",

        challenges:
            "Ensuring smooth real-time order updates & mobile responsiveness.",

        solutions:
            "Used JavaScript for live cart updates, integrated maps API for tracking.",

        results:
            "Increased order efficiency by 40% and improved user engagement."

    },


    springbyte: {

        title:
            "Springbyte Software",

        overview:
            "Corporate website for IT solutions showcasing services & portfolio.",

        challenges:
            "Needed a professional UI with optimized loading speed.",

        solutions:
            "Implemented clean design with reusable components in HTML, CSS, JS.",

        results:
            "Boosted client trust with 60% more inquiries."

    },


    akra: {

        title:
            "Akra Library",

        overview:
            "A modern digital library management system.",

        challenges:
            "Managing huge data of books with a simple interface.",

        solutions:
            "Created advanced search, category filters & responsive dashboard.",

        results:
            "Library staff reduced manual work by 50%."

    },


    lancecraft: {

        title:
            "LanceCraft",

        overview:
            "Concept platform for freelancers to showcase projects & connect with clients.",

        challenges:
            "Building trust and easy profile showcasing.",

        solutions:
            "Designed portfolio cards, testimonial section & case study integration.",

        results:
            "Improved user retention with sleek UI/UX."

    },


    jewellery: {

        title:
            "Jewellery Store",

        overview:
            "An e-commerce platform for premium jewellery products.",

        challenges:
            "High-quality image optimization & smooth checkout process.",

        solutions:
            "Integrated product zoom, cart & secure payment workflow.",

        results:
            "Increased online sales conversion by 35%."

    }

};


// ================================
// CASE STUDY MODAL
// ================================

const modal =
    document.getElementById(
        "caseModal"
    );

const caseCards =
    document.querySelectorAll(
        ".case-card"
    );

const closeBtn =
    document.querySelector(
        ".close-modal"
    );


caseCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                const caseKey =
                    card.getAttribute(
                        "data-case"
                    );


                const data =
                    caseData[caseKey];


                if (!data || !modal) {
                    return;
                }


                document.getElementById(
                    "caseTitle"
                ).innerText =
                    data.title;


                document.getElementById(
                    "caseOverview"
                ).innerText =
                    data.overview;


                document.getElementById(
                    "caseChallenges"
                ).innerText =
                    data.challenges;


                document.getElementById(
                    "caseSolutions"
                ).innerText =
                    data.solutions;


                document.getElementById(
                    "caseResults"
                ).innerText =
                    data.results;


                modal.style.display =
                    "block";

            }
        );

    }
);


if (closeBtn && modal) {

    closeBtn.onclick =
        () => {

            modal.style.display =
                "none";

        };

}


window.addEventListener(
    "click",
    (e) => {

        if (
            modal &&
            e.target === modal
        ) {

            modal.style.display =
                "none";

        }

    }
);
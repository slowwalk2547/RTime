// ==================== TYPING EFFECT ====================
function initTypingEffect() {
    const textElement = document.querySelector('.typing-text');
    const fullText = 'ผมชอบสร้างเว็บไซต์ที่ใช้งานได้ดีและมีหน้าตาที่สวยงาม';
    const typingSpeed = 50; // ms per character

    let currentIndex = 0;
    textElement.textContent = '';

    function type() {
        if (currentIndex < fullText.length) {
            textElement.textContent += fullText.charAt(currentIndex);
            currentIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Pause, then clear and repeat
            setTimeout(() => {
                textElement.textContent = '';
                currentIndex = 0;
                setTimeout(type, 500);
            }, 3000);
        }
    }

    type();
}

// ==================== CONTRIBUTION GRAPH ====================
function generateContributionGraph() {
    const svgElement = document.querySelector('.contribution-calendar');
    const weeks = 52;
    const days = 7;
    const boxSize = 15;
    const padding = 20;
    const gap = 3;

    // Color palette for contributions
    const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#0d3922'];

    // Clear previous content
    svgElement.innerHTML = '';

    // Add day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayLabels.forEach((day, index) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '0');
        text.setAttribute('y', padding + (index * (boxSize + gap)) + 12);
        text.setAttribute('font-size', '11');
        text.setAttribute('fill', '#a0a0a0');
        text.textContent = day;
        svgElement.appendChild(text);
    });

    // Generate contribution boxes
    for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < days; day++) {
            const x = padding + 35 + (week * (boxSize + gap));
            const y = padding + (day * (boxSize + gap));

            // Randomly assign contribution level (0-4)
            const contributionLevel = Math.floor(Math.random() * 5);
            const color = colors[contributionLevel];

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('class', 'contribution-box');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', boxSize);
            rect.setAttribute('height', boxSize);
            rect.setAttribute('fill', color);
            rect.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
            rect.setAttribute('rx', '2');

            // Add tooltip
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            const date = new Date(2024, 0, 1);
            date.setDate(date.getDate() + (week * 7) + day);
            const contributions = [0, 1, 3, 7, 15][contributionLevel];
            title.textContent = `${contributions} contribution${contributions !== 1 ? 's' : ''} on ${date.toDateString()}`;
            rect.appendChild(title);

            rect.addEventListener('mouseenter', function() {
                this.style.strokeWidth = '2';
                this.style.stroke = '#00ff88';
            });

            rect.addEventListener('mouseleave', function() {
                this.style.strokeWidth = '1';
                this.style.stroke = 'rgba(255, 255, 255, 0.1)';
            });

            svgElement.appendChild(rect);
        }
    }

    // Add month labels
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    monthLabels.forEach((month, index) => {
        const x = padding + 35 + (index * 4.3 * (boxSize + gap));
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', padding - 5);
        text.setAttribute('font-size', '11');
        text.setAttribute('fill', '#a0a0a0');
        text.textContent = month;
        svgElement.appendChild(text);
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (hero) {
            hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
        }
    });
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ==================== ACTIVE LINK HIGHLIGHTING ====================
function initActiveLinks() {
    window.addEventListener('scroll', () => {
        let currentSection = '';

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
    });
}

// ==================== PROJECT CARD INTERACTION ====================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==================== DARK MODE TOGGLE (Optional) ====================
function initDarkModeToggle() {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// ==================== SCROLL TO TOP BUTTON ====================
function initScrollToTopButton() {
    // Create button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00ff88, #00ffaa);
        color: #0f0c29;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: 0 5px 15px rgba(0, 255, 136, 0.4);
    `;

    document.body.appendChild(scrollButton);

    // Show/hide button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    // Check if on mobile
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            // Add mobile-specific styles
            sidebar.style.position = 'relative';
        }
    }

    window.addEventListener('resize', () => {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth <= 768) {
            sidebar.style.position = 'relative';
        } else {
            sidebar.style.position = 'sticky';
        }
    });
}

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', function() {
    initTypingEffect();
    generateContributionGraph();
    initSmoothScroll();
    initParallax();
    initIntersectionObserver();
    initActiveLinks();
    initProjectCards();
    initDarkModeToggle();
    initScrollToTopButton();
    initMobileMenu();

    console.log('✨ Portfolio loaded successfully!');
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    generateContributionGraph();
}, 250));

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K to open search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search would open here');
    }

    // Escape to close any modals
    if (e.key === 'Escape') {
        console.log('Escape pressed');
    }
});
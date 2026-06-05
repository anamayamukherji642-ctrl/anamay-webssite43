// 1. Theme Toggle (Dark/Light Mode) with LocalStorage persistence
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

// Function to apply theme styles
function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
        }
    } else {
        document.body.classList.remove('light-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        }
    }
}

// Initialize theme from storage
const isLightTheme = currentTheme === 'light';
applyTheme(isLightTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isCurrentlyLight = document.body.classList.contains('light-mode');
        const nextThemeIsLight = !isCurrentlyLight;

        localStorage.setItem('theme', nextThemeIsLight ? 'light' : 'dark');
        applyTheme(nextThemeIsLight);
    });
}

// 2. Responsive Mobile Navigation + Active Page Highlight
document.addEventListener('DOMContentLoaded', () => {
    const navbars = document.querySelectorAll('.navbar');
    navbars.forEach((navbar) => {
        const navMenu = navbar.querySelector('.nav-menu');
        if (!navMenu) return;

        let menuToggle = navbar.querySelector('.menu-toggle-btn');
        if (!menuToggle) {
            menuToggle = document.createElement('button');
            menuToggle.type = 'button';
            menuToggle.className = 'menu-toggle-btn';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            navbar.insertBefore(menuToggle, navMenu);
        }

        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen.toString());
        });

        navMenu.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    });

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPath || (href === 'index.html' && currentPath === '')) {
            link.classList.add('active');
        }
    });
});

// 3. Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3. Netlify AJAX Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            formStatus.innerText = "Sending message...";
            formStatus.style.color = "var(--accent-saffron)";

            const formData = new FormData(contactForm);

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
                .then((response) => {
                    if (response.ok) {
                        formStatus.innerText = "✅ Message sent successfully!";
                        formStatus.style.color = "var(--accent-green)";
                        contactForm.reset();
                    } else {
                        throw new Error("Form submission response was not ok.");
                    }
                })
                .catch((error) => {
                    console.error("Form error:", error);
                    formStatus.innerText = "❌ Error! Please try again later.";
                    formStatus.style.color = "#ff4d4d";
                });
        });
    }
});

// 4. Stats Counter Animation using Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat-number");
    if (stats.length === 0) return;

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute("data-target"), 10);
                const suffix = stat.getAttribute("data-suffix") || "";
                let count = 0;
                const duration = 1500; // ms
                const stepTime = Math.max(Math.floor(duration / target), 15);

                const timer = setInterval(() => {
                    count += Math.ceil(target / (duration / stepTime));
                    if (count >= target) {
                        stat.innerText = target + suffix;
                        clearInterval(timer);
                    } else {
                        stat.innerText = count + suffix;
                    }
                }, stepTime);

                observer.unobserve(stat); // Run once
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateCounters, {
        threshold: 0.2
    });

    stats.forEach(stat => statsObserver.observe(stat));
});

// 5. Testimonial Slider
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("testimonialSlider");
    const dots = document.querySelectorAll(".slider-dot");
    if (!slider || dots.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        currentIndex = index;
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % dots.length;
            showSlide(nextIndex);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    startAutoSlide();
});

// 6. Project Details Modal System
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalBody = document.getElementById("modalBody");
    const modalClose = document.getElementById("modalClose");
    const openBtns = document.querySelectorAll(".open-project-btn");

    if (!modal || !modalBody || openBtns.length === 0) return;

    // Database of project details
    const projectsData = {
        gaming: {
            title: "Crimson Dusk Gaming",
            subtitle: "YouTube Content Channel",
            tags: ["OBS Studio", "YouTube Analytics", "Premiere Pro", "Photoshop"],
            content: `
                <p>Crimson Dusk Gaming is our flagship content hub, focusing on competitive gaming, hardware optimization reviews, and tech guides. We design and curate a unique visual style that blends high-tech cyber elements with a welcoming community atmosphere.</p>
                <h4>Core Workflows & Strategy</h4>
                <p>Our video production workflow is optimized for speed and quality. We design custom overlays, implement SEO metadata trees, configure high-bitrate live-streaming outputs, and utilize advanced video and audio editing techniques to maximize viewer retention.</p>
                <h4>Project Milestones & Results</h4>
                <ul class="results-list">
                    <li>Achieved over 150,000 lifetime views across the channel.</li>
                    <li>Maintained a consistent scheduling system with multiple releases per week.</li>
                    <li>Designed CTR-optimized custom thumbnail assets yielding an average 12% click-through rate.</li>
                </ul>
            `
        },
        editing: {
            title: "Video Editing Portfolio",
            subtitle: "Storytelling & Production",
            tags: ["Adobe Premiere Pro", "After Effects", "Audition", "DaVinci Resolve"],
            content: `
                <p>Video editing is the core driver of modern digital audience engagement. We specialize in producing fast-paced, highly engaging gaming edits and technical hardware breakdowns. We prioritize advanced pacing, audio cleanup, dynamic sound effects, and color accuracy.</p>
                <h4>Editing Philosophy</h4>
                <p>Every second of a video is designed to capture attention. We use keyframed text animations, custom transition patterns, and audio compression rules to deliver professional sound levels across all digital distribution platforms.</p>
                <h4>Key Technical Results</h4>
                <ul class="results-list">
                    <li>Consistently boosted average viewer retention rates by 25% on edited pieces.</li>
                    <li>Produced over 100 high-fidelity video projects for social channels.</li>
                    <li>Standardized rendering profiles specifically optimized for H.264/HEVC hardware acceleration.</li>
                </ul>
            `
        },
        marketing: {
            title: "Digital Marketing & Branding",
            subtitle: "Strategy & Analytics",
            tags: ["SEO", "Google Analytics", "TubeBuddy", "Social Media Suites"],
            content: `
                <p>Digital marketing is the science behind audience growth. We leverage data-driven analytics tracking to grow the Crimson Dusk brand across multiple social platforms. We perform extensive keyword research, competitor analysis, and audience retention tracking.</p>
                <h4>Marketing & Scaling Methods</h4>
                <p>We build integrated marketing campaigns that bridge multiple platforms (YouTube, LinkedIn, Instagram). By analyzing detailed audience demographics, we align posting schedules and topic coverage to maximize viewer growth and brand authority.</p>
                <h4>Key Performance Results</h4>
                <ul class="results-list">
                    <li>Generated a 40% organic subscriber increase quarter-over-quarter.</li>
                    <li>Constructed metadata optimizations that doubled search impressions across targeted video tags.</li>
                    <li>Established a cross-platform brand framework that consistently refers high traffic to our primary assets.</li>
                </ul>
            `
        },
        research: {
            title: "Technical Research & Optimization",
            subtitle: "Systems & Workflows",
            tags: ["Hardware Assembly", "Optimization", "Diagnostics", "Wiki Docs"],
            content: `
                <p>Technology is the engine of digital production. We conduct detailed investigations into system optimization, custom hardware assembly, and hardware troubleshooting to ensure 99.9% operational uptime during heavy workloads.</p>
                <h4>Research Area Details</h4>
                <p>Our research focuses on resolving complex system bottlenecks. We standardize diagnostics for high-load systems (such as high-end editing computers) and document maintenance procedures for consumer electronics, guaranteeing hardware efficiency and longevity.</p>
                <h4>Key Systems Results</h4>
                <ul class="results-list">
                    <li>Developed and documented over 15 step-by-step troubleshooting procedures.</li>
                    <li>Optimized editing workstation fan curves and voltage profiles, reducing thermal throttling by 15%.</li>
                    <li>Assembled and calibrated low-latency recording rigs for crystal-clear audio capture.</li>
                </ul>
            `
        }
    };

    openBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".project-card");
            if (!card) return;

            const projectId = card.getAttribute("data-project-id");
            const data = projectsData[projectId];

            if (data) {
                // Populate modal data
                modalTitle.innerText = data.title;
                modalSubtitle.innerText = data.subtitle;

                // Build tags HTML
                let tagsHtml = '<div class="tech-tag-list">';
                data.tags.forEach(tag => {
                    tagsHtml += `<span class="tech-tag">${tag}</span>`;
                });
                tagsHtml += '</div>';

                modalBody.innerHTML = tagsHtml + data.content;

                // Open modal
                modal.classList.add("open");
                document.body.style.overflow = "hidden"; // Disable background scrolling
            }
        });
    });

    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = ""; // Re-enable background scrolling
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    // Close when clicking outside modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });
});

// 7. Interests Category Filtering
document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll("#interestsGrid .project-card");

    if (filterBtns.length === 0 || cards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
});
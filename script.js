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

// 2. Scroll to Top Button
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
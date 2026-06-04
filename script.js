// 1. Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
}

// 2. Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerText = "↑ Top";
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = "position:fixed; bottom:20px; right:20px; display:none; padding:10px; background:#3498db; color:white; border:none; border-radius:5px; cursor:pointer;";
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3. Netlify Form Handling
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formStatus.innerText = "Sending message...";
            formStatus.style.color = "#3498db";

            const formData = new FormData(contactForm);
            
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                formStatus.innerText = "✅ Message sent successfully!";
                formStatus.style.color = "#2ecc71";
                contactForm.reset();
            })
            .catch((error) => {
                console.error("Form error:", error);
                formStatus.innerText = "❌ Error! Please try again later.";
                formStatus.style.color = "#e74c3c";
            });
        });
    }
});
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const contactLang = getCurrentLang();

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        contactStatus.textContent = contactLang === "uk"
            ? "Повідомлення готове до відправлення."
            : "Your message is ready to be sent.";
        contactForm.reset();
    });
}

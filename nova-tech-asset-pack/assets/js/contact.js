// Contact Send to avoid spam and hide email from email crawlers
const contactSend = document.getElementById("contact-submit");
const action = "https://formsubmit.co/novatechoffice@gmail.com";

contactSend.addEventListener("click", () => {
    document.getElementById("gamelounge-contact").action = action;
});

const translations = {en: "English", ta: "தமிழ்"};
let lang = localStorage.getItem("msw-language") || "en";

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-en][data-ta]").forEach(el => {
    el.innerHTML = lang === "ta" ? el.dataset.ta : el.dataset.en;
  });
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.textContent = lang === "ta" ? "English" : "தமிழ்";
  localStorage.setItem("msw-language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();

  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.addEventListener("click", () => {
    lang = lang === "en" ? "ta" : "en";
    applyLanguage();
  });

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const product = document.getElementById("product").value;
      const description = document.getElementById("description").value.trim();

      const message = `Malliga Steel Works Enquiry%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AProduct: ${encodeURIComponent(product)}%0ARequirement: ${encodeURIComponent(description)}`;
      const wa = `https://wa.me/919443059754?text=${message}`;
      const mail = `mailto:malligasteelworks@gmail.com?subject=${encodeURIComponent("New Enquiry - Malliga Steel Works")}&body=${message}`;

      const status = document.getElementById("formStatus");
      status.textContent = lang === "ta"
        ? "தொடர்புக்கு WhatsApp அல்லது மின்னஞ்சல் திறக்கப்படுகிறது."
        : "Opening WhatsApp or email for your enquiry.";

      window.open(wa, "_blank");
      setTimeout(() => { window.location.href = mail; }, 700);
    });
  }
});

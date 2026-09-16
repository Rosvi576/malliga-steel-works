
const translations = { en: "English", ta: "தமிழ்" };
let lang = localStorage.getItem("msw-language") || "en";

function normalizeSiteHeader() {
  const header = document.querySelector(".site-header");
  const nav = header?.querySelector(".main-nav");
  const brand = header?.querySelector(".brand");
  if (!header || !nav || !brand) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navItems = [
    ["index.html", "Home", "முகப்பு"],
    ["services.html", "Services", "சேவைகள்"],
    ["about.html", "About", "எங்களைப் பற்றி"],
    ["contact.html", "Contact", "தொடர்பு"]
  ];
  const productItems = [
    ["gates.html", "Steel Gates", "எஃகு கேட்கள்"],
    ["staircases.html", "Staircases", "படிக்கட்டுகள்"],
    ["safety-grills.html", "Safety Grills", "சேஃப்டி கிரில்ஸ்"],
    ["beds.html", "Beds", "படுக்கைகள்"],
    ["kitchens.html", "Kitchens", "சமையலறைகள்"],
    ["stoves.html", "Stoves", "ஸ்டோவ்ஸ்"],
    ["cloth-hangers.html", "Cloth Hangers", "துணி ஹேங்கர்கள்"],
    ["wash-basins.html", "Wash Basins", "வாஷ் பேசின்கள்"]
  ];

  brand.innerHTML = `
    <img src="assets/images/logo/logo.png" alt="Malliga Steel Works logo">
    <span class="brand-text">
      <strong data-brand-en="MALLIGA" data-brand-ta="மல்லிகா">MALLIGA</strong>
      <strong data-brand-en="STEEL WORKS" data-brand-ta="ஸ்டீல் வொர்க்ஸ்">STEEL WORKS</strong>
    </span>`;

  const link = ([href, english, tamil], active = currentPage === href) =>
    `<a${active ? ' class="active"' : ""} href="${href}" data-en="${english}" data-ta="${tamil}">${english}</a>`;
  const submenu = productItems.map((item) => link(item, false)).join("");
  nav.innerHTML = `
    ${link(navItems[0])}
    <div class="nav-products">
      <a${currentPage === "products.html" ? ' class="active"' : ""} href="products.html" data-en="Products" data-ta="தயாரிப்புகள்">Products</a>
      <div class="nav-submenu">${submenu}</div>
    </div>
    ${link(navItems[1])}
    ${link(navItems[2])}
    ${link(navItems[3])}
    ${link(["get-quotation.html", "Get Quotation", "மேற்கோள் கேட்க"])}
    <button type="button" class="lang-toggle" id="langToggle">தமிழ்</button>`;

  document.querySelectorAll('a[href="tel:+916374838411"]').forEach((phone) => {
    phone.textContent = "+91 6374838411";
  });
}

function normalizeSiteFooter() {
  const footerGrid = document.querySelector(".site-footer .footer-grid");
  if (!footerGrid) return;

  footerGrid.innerHTML = `
    <div>
      <h3>Malliga Steel Works</h3>
      <p data-en="Steel fabrication and practical steel products for homes and commercial spaces." data-ta="வீடுகள் மற்றும் வணிக இடங்களுக்கான எஃகு தயாரிப்பு மற்றும் பயனுள்ள எஃகு தயாரிப்புகள்.">Steel fabrication and practical steel products for homes and commercial spaces.</p>
    </div>
    <div>
      <h4 data-en="Quick links" data-ta="விரைவு இணைப்புகள்">Quick links</h4>
      <a href="index.html" data-en="Home" data-ta="முகப்பு">Home</a>
      <a href="products.html" data-en="Products" data-ta="தயாரிப்புகள்">Products</a>
      <a href="services.html" data-en="Services" data-ta="சேவைகள்">Services</a>
      <a href="about.html" data-en="About" data-ta="எங்களைப் பற்றி">About</a>
      <a href="contact.html" data-en="Contact" data-ta="தொடர்பு">Contact</a>
      <a href="get-quotation.html" data-en="Get Quotation" data-ta="மேற்கோள் கேட்க">Get Quotation</a>
    </div>
    <div>
      <h4 data-en="Contact" data-ta="தொடர்பு">Contact</h4>
      <a href="tel:+916374838411">+91 6374838411</a>
      <a href="https://wa.me/916374838411" target="_blank" rel="noopener">WhatsApp</a>
    </div>`;
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-brand-en][data-brand-ta]").forEach((el) => {
    el.textContent = lang === "ta" ? el.dataset.brandTa : el.dataset.brandEn;
  });

  document.querySelectorAll("[data-en][data-ta]").forEach((el) => {
    const text = lang === "ta" ? el.dataset.ta : el.dataset.en;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });

  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.textContent = lang === "ta" ? "English" : "தமிழ்";
  localStorage.setItem("msw-language", lang);
}

const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
let lightboxIndex = 0;

function openLightbox(index) {
  if (!lightbox || !galleryItems.length) return;

  lightboxIndex = index;
  const current = galleryItems[index];
  const imageSrc = current?.dataset.image || current?.querySelector("img")?.src;
  if (!imageSrc) return;

  lightboxImage.src = imageSrc;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function stepLightbox(direction) {
  if (!galleryItems.length) return;
  lightboxIndex = (lightboxIndex + direction + galleryItems.length) % galleryItems.length;
  openLightbox(lightboxIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  normalizeSiteHeader();
  normalizeSiteFooter();
  applyLanguage();

  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      lang = lang === "en" ? "ta" : "en";
      applyLanguage();
    });
  }

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const productTrigger = document.querySelector(".nav-products > a");
  const productMenu = document.querySelector(".nav-products .nav-submenu");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      if (a !== productTrigger) nav.classList.remove("open");
    }));
  }

  if (productTrigger && productMenu) {
    productTrigger.addEventListener("click", (event) => {
      if (window.innerWidth <= 780) {
        event.preventDefault();
        productMenu.classList.toggle("open");
      }
    });
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  const closeButton = document.querySelector(".lightbox-close");
  const prevButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  closeButton?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", () => stepLightbox(-1));
  nextButton?.addEventListener("click", () => stepLightbox(1));

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") stepLightbox(1);
    if (event.key === "ArrowLeft") stepLightbox(-1);
  });

  const form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const product = document.getElementById("product")?.value || "General enquiry";
      const description = document.getElementById("description")?.value.trim() || "";

      const message = `Malliga Steel Works Enquiry%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AProduct: ${encodeURIComponent(product)}%0ARequirement: ${encodeURIComponent(description)}`;
      const wa = `https://wa.me/916374838411?text=${message}`;
      const mail = `mailto:malligasteelworks@gmail.com?subject=${encodeURIComponent("New Enquiry - Malliga Steel Works")}&body=${message}`;

      const status = document.getElementById("formStatus");
      status.textContent = lang === "ta"
        ? "வாட்ஸ்அப் அல்லது மின்னஞ்சல் திறக்கப்படுகிறது."
        : "Opening WhatsApp or email for your enquiry.";

      window.open(wa, "_blank");
      setTimeout(() => {
        window.location.href = mail;
      }, 700);
    });
  }
});

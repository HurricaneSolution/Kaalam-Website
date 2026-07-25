const langBtns = document.querySelectorAll('.lang-btn');
const body = document.body;
const htmlEl = document.documentElement;

function setLang(lang) {
  body.classList.remove('en', 'es', 'fr');
  body.classList.add(lang);
  htmlEl.setAttribute('lang', lang);
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.setLang === lang);
  });
  try { localStorage.setItem('kaalam-lang', lang); } catch (e) {}
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.setLang));
});

try {
  const saved = localStorage.getItem('kaalam-lang');
  if (saved && ['en', 'es', 'fr'].includes(saved)) setLang(saved);
} catch (e) {}

const ringsSvg = document.querySelector('.rings-svg');
if (ringsSvg && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ringsSvg.classList.add('in-view');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(ringsSvg);
} else if (ringsSvg) {
  ringsSvg.classList.add('in-view');
}

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const noteText = {
  en: "Thanks! We'll get back to you soon — or message us directly on WhatsApp for a faster reply.",
  es: "¡Gracias! Te responderemos pronto — o escríbenos directo por WhatsApp para una respuesta más rápida.",
  fr: "Merci ! Nous vous répondrons bientôt — ou écrivez-nous directement sur WhatsApp pour une réponse plus rapide."
};
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = body.classList.contains('es') ? 'es' : body.classList.contains('fr') ? 'fr' : 'en';
    note.textContent = noteText[lang];
    form.reset();
  });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

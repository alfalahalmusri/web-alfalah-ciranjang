// ===== NAV: solid background on scroll =====
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
import { Analytics } from "@vercel/analytics/next";

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== Mobile menu toggle =====
if (toggle) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ===== Active nav link by current page =====
const current = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== Animated stat counters =====
const stats = document.querySelectorAll('.stat b[data-count]');
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
    statIO.unobserve(el);
  });
}, { threshold: 0.4 });
stats.forEach(el => statIO.observe(el));

// ===== Simple form handler (static hosting: no backend) =====
document.querySelectorAll('form[data-static-form]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msgBox = form.querySelector('.form-msg');
    const name = form.querySelector('[name="nama"]')?.value || '';
    if (msgBox) {
      msgBox.textContent = `Terima kasih${name ? ', ' + name : ''}. Pesan Anda telah kami catat. Tim kami akan menghubungi Anda melalui WhatsApp/telepon secepatnya.`;
      msgBox.style.display = 'block';
    }
    form.reset();
  });
});
const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 16);
}

function updateActiveLink() {
  const position = window.scrollY + 150;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (position >= section.offsetTop) activeId = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateHeader();
    updateActiveLink();
    ticking = false;
  });
}, { passive: true });

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('.navbar-collapse.show');
    if (menu && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

updateHeader();
updateActiveLink();

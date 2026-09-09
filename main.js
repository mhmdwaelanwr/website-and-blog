const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('main section[id]')];

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}

function updateActiveLink() {
  const position = window.scrollY + 140;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (position >= section.offsetTop) activeId = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

window.addEventListener('scroll', () => {
  updateHeader();
  updateActiveLink();
}, { passive: true });

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('.navbar-collapse.show');
    if (menu && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
updateHeader();
updateActiveLink();

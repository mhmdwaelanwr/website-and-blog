const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('main section[id]')];

const cvUrl = 'https://drive.google.com/file/d/1jc6X8hWW-20nQDrijstQvzeek055qaxk/view?usp=drivesdk';

function addCvLinks() {
  const heroActions = document.querySelector('#home .d-flex.flex-wrap.gap-3');
  if (heroActions && !heroActions.querySelector('[data-cv-link]')) {
    const cvButton = document.createElement('a');
    cvButton.className = 'btn btn-outline-info btn-lg px-4';
    cvButton.href = cvUrl;
    cvButton.target = '_blank';
    cvButton.rel = 'noreferrer';
    cvButton.dataset.cvLink = 'true';
    cvButton.innerHTML = '<i class="bi bi-file-earmark-person me-2"></i>View CV';
    heroActions.appendChild(cvButton);
  }

  const contactActions = document.querySelector('#contact .d-flex.flex-wrap.justify-content-center.gap-3');
  if (contactActions && !contactActions.querySelector('[data-cv-link]')) {
    const cvButton = document.createElement('a');
    cvButton.className = 'btn btn-outline-info btn-lg';
    cvButton.href = cvUrl;
    cvButton.target = '_blank';
    cvButton.rel = 'noreferrer';
    cvButton.dataset.cvLink = 'true';
    cvButton.innerHTML = '<i class="bi bi-file-earmark-person me-2"></i>View CV';
    contactActions.appendChild(cvButton);
  }
}

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
addCvLinks();
updateHeader();
updateActiveLink();

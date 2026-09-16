/*
 * Copyright © 2026 Mohamed Anwar. All rights reserved.
 * Original project-specific JavaScript in this repository is proprietary to Mohamed Anwar.
 * Third-party libraries retain their respective licenses.
 */

const header = document.querySelector('.site-header');

function addCapabilitiesSection() {
  if (document.getElementById('skills')) return;

  const experience = document.getElementById('experience');
  if (!experience) return;

  const section = document.createElement('section');
  section.id = 'skills';
  section.className = 'section-block';
  section.innerHTML = `
    <div class="container">
      <div class="section-intro row align-items-end g-4">
        <div class="col-lg-8">
          <p class="eyebrow">CAPABILITIES</p>
          <h2>The stack changes. The goal stays the same: understand the system and ship something useful.</h2>
        </div>
        <div class="col-lg-4">
          <p class="mb-0" style="color: var(--muted)">A practical mix of application development, systems work, backend engineering, automation, and applied AI.</p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-md-6">
          <article class="work-card">
            <div class="work-icon"><i class="bi bi-code-square"></i></div>
            <p class="project-kicker">LANGUAGES & APPLICATIONS</p>
            <h3>Build across different environments</h3>
            <p>Python, C#/.NET, Kotlin/Java, TypeScript/JavaScript, Dart, Bash and PowerShell across desktop, mobile, web and developer tooling.</p>
          </article>
        </div>

        <div class="col-md-6">
          <article class="work-card">
            <div class="work-icon"><i class="bi bi-hdd-stack"></i></div>
            <p class="project-kicker">SYSTEMS & DELIVERY</p>
            <h3>Work below the UI layer</h3>
            <p>Linux, Docker, GitHub Actions, CI/CD, packaging, diagnostics, release workflows and root-cause investigation.</p>
          </article>
        </div>

        <div class="col-md-6">
          <article class="work-card">
            <div class="work-icon"><i class="bi bi-database"></i></div>
            <p class="project-kicker">BACKEND & DATA</p>
            <h3>Connect the moving parts</h3>
            <p>FastAPI, Node.js, PostgreSQL, SQLite, Redis, REST APIs and background-processing workflows for practical products.</p>
          </article>
        </div>

        <div class="col-md-6">
          <article class="work-card">
            <div class="work-icon"><i class="bi bi-stars"></i></div>
            <p class="project-kicker">APPLIED AI</p>
            <h3>Use models as part of a system</h3>
            <p>Vision and model APIs, provider fallback, local inference, automation and human-review boundaries around AI-assisted workflows.</p>
          </article>
        </div>
      </div>
    </div>`;

  experience.parentNode.insertBefore(section, experience);

  const experienceLink = document.querySelector('.nav-link[href="#experience"]');
  if (experienceLink) {
    const item = document.createElement('li');
    item.className = 'nav-item';
    item.innerHTML = '<a class="nav-link" href="#skills">Skills</a>';
    experienceLink.closest('.nav-item')?.before(item);
  }
}

function addResumeShortcut() {
  const heroActions = document.querySelector('.hero-actions');
  const navResume = document.querySelector('.btn-outline-accent[href*="drive.google.com"]');
  if (!heroActions || !navResume || heroActions.querySelector('[data-resume-link]')) return;

  const link = document.createElement('a');
  link.className = 'btn btn-quiet btn-lg';
  link.href = navResume.href;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.dataset.resumeLink = 'true';
  link.innerHTML = '<i class="bi bi-file-earmark-person"></i> Résumé';
  heroActions.appendChild(link);
}

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 16);
}

function updateActiveLink() {
  const navLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const position = window.scrollY + 150;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (position >= section.offsetTop) activeId = section.id;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function setupNavigation() {
  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('.navbar-collapse.show');
      if (menu && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
}

addCapabilitiesSection();
addResumeShortcut();
setupNavigation();

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

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

updateHeader();
updateActiveLink();

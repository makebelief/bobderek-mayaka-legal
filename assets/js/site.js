(() => {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => mobileNav?.classList.remove('open')));
  const rail = document.querySelector('.contact-rail');
  const toggle = document.querySelector('.rail-toggle');
  if (rail && toggle) toggle.addEventListener('click', () => rail.classList.toggle('collapsed'));
  const form = document.querySelector('[data-mail-form]');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry: ${d.get('matter') || 'Legal matter'}`);
    const body = encodeURIComponent(`Name: ${d.get('name') || ''}\nPhone: ${d.get('phone') || ''}\nEmail: ${d.get('email') || ''}\nMatter: ${d.get('matter') || ''}\n\n${d.get('message') || ''}`);
    location.href = `mailto:bobderekmayakalegal@gmail.com?subject=${subject}&body=${body}`;
  });
})();

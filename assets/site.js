const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('is-open');
};
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

document.querySelectorAll('.service').forEach(service => {
  service.addEventListener('toggle', () => {
    if (service.open) document.querySelectorAll('.service').forEach(other => {
      if (other !== service) other.open = false;
    });
  });
});

const dialog = document.querySelector('#bookingDialog');
const selected = document.querySelector('#selectedService');
let previousFocus;
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
  previousFocus = button;
  const name = button.dataset.book;
  selected.hidden = !name;
  document.querySelector('#selectedName').textContent = name || '';
  document.querySelector('#selectedPrice').textContent = button.dataset.price || '';
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  previousFocus?.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();

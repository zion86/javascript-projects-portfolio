const burgerMenu = (
  menu = '.menu',
  menuItem = '.menu-list__item',
  menuActive = 'menu-active',
  hamburgerMenu = '.humburger-menu',
  hamburgerMenuActive = 'humburger-menu-active',
) => {

  const menuElem = document.querySelector(menu);
  const hamburgerMenuElem = document.querySelector(hamburgerMenu);

  const handlerMenu = (event) => {
    const target = event.target;
    const parent = target.closest(menu);

    if ((!parent && target !== hamburgerMenuElem) || target.closest(menuItem)) {
      toggleMenu();
    }
  };

  const toggleMenu = () => {
    menuElem.classList.toggle(menuActive);
    hamburgerMenuElem.classList.toggle(hamburgerMenuActive);

    if (menuElem.classList.contains(menuActive)) {
      document.body.addEventListener('click', handlerMenu);
    } else {
      document.body.removeEventListener('click', handlerMenu);
    }
  }

  hamburgerMenuElem.addEventListener('click', toggleMenu);
};

export default burgerMenu;
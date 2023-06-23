// Lidar com a responsividade do menu

const toggleMenu = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');
const header = document.getElementById('header');
const body = document.querySelector('body');

function handleClickToggleMenu() {
    navBar.classList.toggle('show');
    body.classList.toggle('body-pd');
    header.classList.toggle('body-pd');
    this.classList.toggle('bx-x');
}

toggleMenu.addEventListener('click', handleClickToggleMenu);

// Lidar com os links do menu

const linksMenu = document.querySelectorAll('.nav__link');

function handleClickLinkMenu() {
    linksMenu.forEach(linkMenu => linkMenu.classList.remove('active'))
    this.classList.add('active')
}

linksMenu.forEach(
    linkMenu => linkMenu.addEventListener('click', handleClickLinkMenu)
)

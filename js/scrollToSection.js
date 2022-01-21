export default function scrollToSection(arg) {
    let section = document.querySelector(arg.e.target.getAttribute('href'));

    if (section) {
      arg.e.preventDefault();
      arg.menu.forEach(elem => {
        elem.classList.remove('_active')
      })
      window.scroll({
        left: 0,
        top: section.offsetTop - arg.header.offsetHeight,
        behavior: 'smooth'
      })
  
  }
}


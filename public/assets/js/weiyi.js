// console.log('From weiyi.js')
//


// Mobile hamburger menu

document.getElementById('nav-toggle').addEventListener('click', toggleNav)

function toggleNav() {
  const burger = document.getElementById('nav-toggle')
  const mobile_menu = document.getElementById("mobileMenuWrap")

  /*
  const nav = document.getElementById("navbarMenu")
  const className = nav.getAttribute("class")
  if (className == "navbar-menu") {
  */

  if (WY_hasClass(mobile_menu, 'is-hidden')) {
    WY_removeClass(mobile_menu, 'is-hidden')
    WY_addClass(burger, 'is-active')
  }
  else {
    WY_addClass(mobile_menu, 'is-hidden')
    WY_removeClass(burger, 'is-active')
  }

  /*
  className = mobile_menu.getAttribute('class')
  if (className == 'navbar-menu is-active level-right is-hidden') {
    //nav.className = "navbar-menu is-active"
    mobile_menu.className = "navbar-menu is-active level-right"
    burger.className = 'navbar-burger burger is-active'
    console.log('active')
  }
  else {
    //nav.className = "navbar-menu"
    mobile_menu.className = "navbar-menu is-active level-right is-hidden"
    burger.className = 'navbar-burger burger'
    console.log('not active')
  }
  */
}

document.onscroll = () => {
  const windowTop = document.documentElement.scrollTop;
  const element = document.getElementsByTagName('header')[0];

  if (windowTop > 80) {
    element.classList.add('scrolled');
  } else {
    element.classList.remove('scrolled');
  }
};
$(document).ready(function() {
  $('.drawer').drawer();

  $('.drawer-toggle').click(function() {
    $('header .menu-icon').toggleClass('opened');
  });

  $('.drawer-menu-item').click(function() {
    $('header .menu-icon').removeClass('opened');
    $('.drawer').drawer('close');
  });
});

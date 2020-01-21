document.onscroll = () => {
  const windowTop = document.documentElement.scrollTop;
  const element = document.getElementsByTagName('header')[0];

  if (windowTop > 80) {
    element.classList.add('scrolled');
  } else {
    element.classList.remove('scrolled');
  }
};
const navbar = () => {
  $('.drawer').drawer();
  $('.drawer-menu-item').click(function(e) {
    if (!e.target.classList.contains('not-closed-menu-item')) {
      $('.drawer').drawer('close');
    }
  });
};

navbar();

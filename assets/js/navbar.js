document.onscroll = () => {
  const windowTop = document.documentElement.scrollTop;
  const element = document.getElementById('header');

  element.className = windowTop > 80 ? 'scrolled' : '';
};

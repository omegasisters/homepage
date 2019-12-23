const videoSwiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  mousewheel: true,
  grabCursor: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

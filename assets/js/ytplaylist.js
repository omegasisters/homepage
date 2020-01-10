const loadPlayList = (id, dom) => {
  fetch(`/homepage/assets/playlists/${id}.json`)
    .then((response) => response.json())
    .then((MoviesData) => {
      MoviesData.items.reverse();

      MoviesData.items.forEach((MovieData) => {
        const container = document.createElement('div');
        container.className = 'swiper-slide';
        const link = document.createElement('a');

        if ('resourceId' in MovieData.snippet) {
          link.href = `https://youtu.be/${MovieData.snippet.resourceId.videoId}`;
        } else {
          link.href = `https://youtu.be/${MovieData.id.videoId}`;
        }
        link.className = 'video-link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = MovieData.snippet.title;

        const image = document.createElement('img');
        image.src = MovieData.snippet.thumbnails.default.url;
        image.dataset.src = MovieData.snippet.thumbnails.high.url;
        image.className = 'lazy';

        const span = document.createElement('span');
        span.textContent = MovieData.snippet.title;
        span.className = 'video-title';

        link.appendChild(image);
        link.appendChild(span);

        container.appendChild(link);

        dom.appendChild(container);
      });
      // 必要があれば画角変更時のイベントハンドラで制御
      const isNarrow = window.matchMedia('(max-width:700px)').matches;

      let swiperParams = {
        spaceBetween: 5,
        slidesPerView: isNarrow ? 1 : 3,
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          bulletElement: 'span',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      };
      if (!isNarrow) {
        swiperParams.effect = 'coverflow';
        swiperParams.coverflowEffect = {
          coverflowEffect: {
            depth: 10,
            modifier: 1,
            slideShadows: false,
          },
        };
      }

      new Swiper('.swiper-container', swiperParams);
      lazyLoad();
    });
};

// https://www.youtube.com/playlist?list=PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja
if (!document.URL.match('alpha')) {
  loadPlayList(
    'PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja',
    document.getElementById('beginner-playlist'),
  );
} else {
  // https://www.youtube.com/channel/UCDiCNS939uq5E4-5CJ-EAZQ/videos
  loadPlayList('alphaList', document.getElementById('beginner-playlist'));
}

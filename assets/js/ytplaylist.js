const loadPlayList = (id, dom) => {
  if (dom === null) return;

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
        image.alt = '';
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
      /*
       * const isNarrow = window.matchMedia('(max-width:700px)').matches;
       */

      const swiperParams = {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        effect: 'coverflow',
        coverflowEffect: {
          depth: 200,
          modifier: 1,
          slideShadows: false,
        },
        breakpoints: {
          900: {
            slidesPerView: 2,
            coverflowEffect: {
              modifier: 0.9,
            },
          },
          1300: {
            slidesPerView: 3,
            coverflowEffect: {
              modifier: 0.8,
            },
          },
          1600: {
            slidesPerView: 4,
            coverflowEffect: {
              modifier: 0.7,
            },
          },
          1900: {
            slidesPerView: 5,
            coverflowEffect: {
              modifier: 0.6,
            },
          },
        },
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

      new Swiper('.swiper-container', swiperParams);
      lazyLoad();
    });
};

if (!window.location.pathname.endsWith('/alpha.html')) {
  // https://www.youtube.com/playlist?list=PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja
  loadPlayList(
    'PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja',
    document.getElementById('beginner-playlist'),
  );
} else {
  // https://www.youtube.com/channel/UCDiCNS939uq5E4-5CJ-EAZQ/videos
  loadPlayList('alphaList', document.getElementById('beginner-playlist'));
}

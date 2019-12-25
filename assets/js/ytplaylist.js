const loadPlayList = (id, dom) => {
  fetch(`./assets/playlists/${id}.json`)
    .then((response) => response.json())
    .then((MoviesData) => {
      MoviesData.items.reverse();

      MoviesData.items.forEach((MovieData) => {
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

        dom.appendChild(link);
      });

      var IsDevice = DeviceName => (navigator.userAgent.indexOf(DeviceName) > 0);

      var isSmartphone = (IsDevice('iPhone') || IsDevice('iPod') || IsDevice('Android') && IsDevice('Movile'));

      var isTablet = (!isSmartphone && IsDevice('Android') || IsDevice('iPad'));

      if(isSmartphone || isTablet)
      {
        $('.' + dom.className).slick({
          autoplay: true,
          autoplaySpeed: 4000,
          dots: false,
          slidesToShow: 1,
        });
      } else {
        $('.' + dom.className).slick({
          autoplay: true,
          autoplaySpeed: 4000,
          dots: true,
          slidesToShow: 3,
        });
      }

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

const loadPlayList = (id, dom) => {
  fetch(`./assets/playlists/${id}.json`)
    .then((response) => response.json())
    .then((MoviesData) => {
      MoviesData.items.reverse();

      MoviesData.items.forEach((MovieData) => {
        const link = document.createElement('a');
        link.href = `https://youtu.be/${MovieData.snippet.resourceId.videoId}`;
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

      $('.' + dom.className).slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        slidesToShow: 3,
      });

      lazyLoad();
    });
};

// https://www.youtube.com/playlist?list=PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja
loadPlayList(
  'PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja',
  document.getElementById('beginner-playlist'),
);

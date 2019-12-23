const loadPlayList = (id, dom) => {
  fetch(`./assets/playlists/${id}.json`)
  .then(response => response.json())
  .then(json => {
    json.items.reverse();

    json.items.forEach(item => {
      const link = document.createElement('a');
      link.href = `https://youtu.be/${item.snippet.resourceId.videoId}`;
      link.className = 'video-link';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = item.snippet.title;

      const image = document.createElement('img');
      image.src = item.snippet.thumbnails.default.url;
      image.dataset.src = item.snippet.thumbnails.high.url;
      image.className = 'lazy';

      const span = document.createElement('span');
      span.textContent = item.snippet.title
      span.className = 'video-title'

      link.appendChild(image);
      link.appendChild(span);

      dom.appendChild(link);
    });

    lazyLoad();
  });
};

// https://www.youtube.com/playlist?list=PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja
loadPlayList('PLjUYRJfqz5WuCvIcDw6a_maOwZN7ic4ja', document.getElementById('beginner-playlist'));

const luckyRayRio = () => {
  var isSiteVisit = document.cookie.replace(
    /(?:(?:^|.*;\s*)is-site-visit\s*\=\s*([^;]*).*$)|^.*$/,
    '$1',
  );

  if (isSiteVisit === 'true') {
    const probability = 1.0;

    const isLucky = Math.random() * 100 < probability;
    const toAddClass = isLucky ? 'lucky' : 'normal';

    for (const element of document.getElementsByClassName('links')) {
      element.classList.add(toAddClass);
    }
  }
  document.cookie = 'is-site-visit=true';
};

luckyRayRio();

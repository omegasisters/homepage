const luckyRayRio = () => {
  const isSiteVisit = localStorage.getItem('isSiteVisit');
  if (isSiteVisit === 'true') {
    const probability = 1.0;
    const isLucky = Math.random() * 100 < probability;
    const toAddClass = isLucky ? 'lucky' : 'normal';

    for (const element of document.getElementsByClassName('links')) {
      element.classList.add(toAddClass);
    }
  } else {
    localStorage.setItem('isSiteVisit', 'true');
  }
};

luckyRayRio();

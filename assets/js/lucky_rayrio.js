const luckyRayRio = () => {
  const toAddClass = isLucky() ? 'lucky' : 'normal';

  for (const element of document.getElementsByClassName('links')) {
    element.classList.add(toAddClass);
  }
};

function isLucky() {
  const isSiteVisit = localStorage.getItem('isSiteVisit');
  const probability = 1.0;

  if (isSiteVisit === 'true') {
    return Math.random() * 100 < probability;
  } else {
    localStorage.setItem('isSiteVisit', 'true');
    return 0;
  }
}

luckyRayRio();

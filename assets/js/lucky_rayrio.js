const luckyRayRio = () => {
  const toAddClass = isLucky() ? 'lucky' : 'normal';

  for (const element of document.getElementsByClassName('links')) {
    element.classList.add(toAddClass);
  }
  for (const element of document.getElementsByClassName('c-unchan__toguro')) {
    element.classList.add(toAddClass);
  }
  for (const element of document.getElementsByClassName('c-unchan__tsuno__inner')) {
    element.classList.add(toAddClass);
  }
  for (const element of document.getElementsByClassName('ppp')) {
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

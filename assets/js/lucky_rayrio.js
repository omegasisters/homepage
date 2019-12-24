const luckyRayRio = () => {
  // 1からnまでのランダムな整数を生成する
  const n = 100;
  var x = Math.floor(Math.random() * n + 1);
  var elements = document.getElementsByClassName('links');
  switch (x) {
    case 1:
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('lucky');
      }
      break;
    default:
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('normal');
      }
      break;
  }
};

luckyRayRio();

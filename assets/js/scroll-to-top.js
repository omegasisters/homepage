const scroll2Top = before => {
  const element = document.scrollingElement;
  const length = element.scrollTop;

  if (before && length > before) {
    return;
  }

  if (length < 10) {
    element.scrollTop = 0;
  } else {
    element.scrollTop = length / 1.1;
    setTimeout(() => scroll2Top(length), 10);
  }
};

document.getElementById("top-to-unchan").onclick = () => scroll2Top();

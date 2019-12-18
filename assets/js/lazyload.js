const lazyLoad = () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return
      target.src = target.dataset.src
      observer.unobserve(target)
    })
  })

  document.querySelectorAll('.lazy').forEach(item => {
    observer.observe(item)
  })
};

lazyLoad();

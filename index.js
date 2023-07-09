const containers = document.querySelectorAll('.container');

containers.forEach((container, index) => {
  container.style.animationDelay = `${index}s`;
});

// for dev purposes
window.addEventListener('focus', function () {
  // location.reload();
});

window.addEventListener('resize', () => {
  scaleCanvas();
});

// first screen => screenStart() in prod
screenStart();

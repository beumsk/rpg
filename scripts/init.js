// for dev purposes
window.addEventListener('focus', function () {
  location.reload();
});

// screen logic
function screenLogic(screen) {
  switch (screen) {
    case 'start':
      screenStart();
      break;
    case 'world':
      screenWorld();
      break;
    case 'fight':
      screenFight();
      break;
    default:
      screenStart();
  }
}

// first screen => 'start' in prod
screenLogic('start');

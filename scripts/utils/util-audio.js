// audio utils

const audioFiles = {
  start: { path: './audio/title.wav', state: 'stop' },
  world: { path: './audio/final.wav', state: 'stop' },
  fight: { path: './audio/battle.wav', state: 'stop' },
};

for (key in audioFiles) {
  audioFiles[key].audio = new Audio(audioFiles[key].path);
  audioFiles[key].audio.loop = true;
  document.body.appendChild(audioFiles[key].audio);
}

window.addEventListener('blur', audioOff);

window.addEventListener('focus', audioOn);

function audioPlay(name, bypass) {
  if (!bypass && !player.options?.audio) return;
  for (key in audioFiles) {
    if (audioFiles[key].state === 'play') {
      // if same audio => return
      if (key === name) return;
      audioStop(key);
    }
  }
  audioFiles[name].audio.play();
  audioFiles[name].state = 'play';
}

function audioPause(name) {
  audioFiles[name].state = 'pause';
  audioFiles[name].audio.pause();
}

function audioStop(name) {
  audioFiles[name].state = 'stop';
  audioFiles[name].audio.pause();
  audioFiles[name].audio.currentTime = 0;
}

function audioOn(bypass) {
  for (key in audioFiles) {
    if (audioFiles[key].state === 'pause') {
      audioPlay(key, bypass);
    }
  }
}

function audioOff() {
  for (key in audioFiles) {
    if (audioFiles[key].state === 'play') {
      audioPause(key);
    }
  }
}

function audioToggle() {
  if (player.options.audio) {
    audioOff();
  } else {
    audioOn(true);
  }
  player.options.audio = !player.options.audio;
}

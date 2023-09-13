function screenReward(type) {
  canvas.style.background = cGrad2;
  contentEl.style.background = cGrad2;

  let content;

  let index = 0;
  let rewardButtons = contentEl.getElementsByTagName('button');

  const rewards = randomRewards();
  // TODO: chest, map and world should give different kind of rewards!
  // TODO: add more info on focus => effects...
  // TODO: add animation for random feel
  // TODO: add attacks??
  const rewardsHTML = `
    <div class="rewards">
      <button data-type="item" data-value="${rewards.item.name}" data-qtt="${rewards.itemQtt}">
        ${rewards.item.name} x${rewards.itemQtt}
      </button>
      ${
        rewards.stuf
          ? `<button data-type="stuf" data-value="${rewards.stuf.name}">${rewards.stuf.name}</button>`
          : ''
      }
      ${
        rewards.attack
          ? `<button data-type="attack" data-value="${rewards.attack.name}">${rewards.attack.name}</button>`
          : ''
      }
      <button data-type="gems" data-value="${rewards.gems}">${rewards.gems} gems</button>
    </div>
  `;

  if (type === 'chest') {
    content = `
      <div class="reward">
        <h1>You opened a chest!</h1>
        <p>Pick the reward you want</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (type === 'lvl') {
  } else if (type === 'map') {
    content = `
      <div class="reward">
        <h1>You cleared ${currentMap.name} from the enemies!</h1>
        <p>Pick the reward you want</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (type === 'world') {
    content = `
      <div class="reward">
        <h1>You saved the ${currentWorld.name} world from the masters!</h1>
        <p>Pick the reward you want</p>
        ${rewardsHTML}
      </div>
    `;
  }

  contentEl.innerHTML = content;
  Array.from(rewardButtons).map((x) => x.addEventListener('click', rewardClick));
  rewardButtons[0].focus();

  document.addEventListener('keydown', keyRewardHandler);

  function keyRewardHandler(e) {
    const key = e.key;
    if (key === 'ArrowRight') {
      index = index !== rewardButtons.length - 1 ? index + 1 : 0;
      rewardButtons[index].focus();
    } else if (key === 'ArrowLeft') {
      index = index !== 0 ? index - 1 : rewardButtons.length - 1;
      rewardButtons[index].focus();
    }
  }

  function stop() {
    document.removeEventListener('keydown', keyRewardHandler);
    clearCanvas();
    contentEl.innerHTML = '';
    if (type === 'chest') {
      screenTransition('left', () => screenWorld(true));
    } else if (type === 'lvl') {
      // screenTransition('left', () => screenFightEnd());
    } else if (type === 'map') {
      changeMap(currentMap.world, 'next');
    } else if (type === 'world') {
      changeMap('temple', 'temple', currentWorld.name);
    }
  }

  function rewardClick(e) {
    let crt = e.target;
    if (crt.dataset.type === 'gems') {
      player.gems += parseFloat(crt.dataset.value);
    } else if (crt.dataset.type === 'item') {
      itemFind(
        items.filter((i) => i.name === crt.dataset.value),
        crt.dataset.qtt
      );
    } else if (crt.dataset.type === 'stuf') {
      stuffFind(stuff.filter((s) => s.name === crt.dataset.value));
    } else if (crt.dataset.type === 'attack') {
      attackFind(attacks.filter((a) => a.name === crt.dataset.value));
    }
    if (type === 'chest') currentMap.deadSpots.find((x) => x.type === 'chest').type = '';
    infoQueue.push(
      () =>
        (infoEl.innerText = `You got ${crt.dataset.value} ${
          crt.dataset.qtt ? 'x' + crt.dataset.qtt : ''
        } (${crt.dataset.type})`)
    );
    stop();
  }
}

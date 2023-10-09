function screenReward(from) {
  canvas.style.background = cGrad2;
  contentEl.style.background = cGrad2;

  let content;

  let index = 0;
  let rewardButtons = contentEl.getElementsByTagName('button');

  const rewards = randomRewards(from);

  // TODO: add more info on focus => effects...
  // TODO: add animation for random feel
  const rewardsHTML = `
    <div class="rewards">
      ${
        rewards.item
          ? `<button data-type="item" data-value="${rewards.item.name}" data-qtt="${rewards.itemQtt}">
              ${rewards.item.name} x${rewards.itemQtt}
            </button>`
          : ''
      }
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
      ${
        rewards.attackImprove
          ? player.attacks
              .filter((x) => x.type === 'attack')
              .map((x) => `<button data-type="improve" data-value="${x.name}">${x.name}</button>`)
              .join('')
          : ''
      }
      ${
        rewards.gems
          ? `<button data-type="gems" data-value="${rewards.gems}">${rewards.gems} gems</button>`
          : ''
      }
    </div>
  `;

  if (from === 'chest') {
    content = `
      <div class="reward">
        <h1>You opened a chest!</h1>
        <p>Choose wisely between these rewards</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (from === 'lvl') {
    content = `
      <div class="reward">
        <h1>You reached lvl ${player.lvl}!</h1>
        <p>Improve one of your attacks or learn a new one.</p>
        <p>Choose wisely between these attacks</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (from === 'map') {
    content = `
      <div class="reward">
        <h1>You cleared ${currentMap.name} from the enemies!</h1>
        <p>Choose wisely between these rewards</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (from === 'world') {
    content = `
      <div class="reward">
        <h1>You saved the ${currentWorld.name} world from the masters!</h1>
        <p>Choose wisely between these rewards</p>
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
    if (from === 'chest') {
      screenTransition('left', () => screenWorld(true));
    } else if (from === 'lvl') {
      screenTransition('left', () => screenWorld());
    } else if (from === 'map') {
      changeMap(currentMap.world, 'next');
    } else if (from === 'world') {
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
        Number(crt.dataset.qtt)
      );
    } else if (crt.dataset.type === 'stuf') {
      stuffFind(stuff.filter((s) => s.name === crt.dataset.value));
    } else if (crt.dataset.type === 'attack') {
      attackFind(attacks.filter((a) => a.name === crt.dataset.value));
    } else if (crt.dataset.type === 'improve') {
      attackImprove(crt.dataset.value);
    }
    if (from === 'chest') currentMap.deadSpots.find((x) => x.type === 'chest').type = '';
    infoQueue.push(
      () =>
        (infoEl.innerText = `You got ${crt.dataset.value} ${
          crt.dataset.qtt ? 'x' + crt.dataset.qtt : ''
        } (${crt.dataset.type})`)
    );
    stop();
  }
}

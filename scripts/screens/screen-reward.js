function screenReward(from) {
  contentEl.style.background = cGrad2;

  infoEl.innerText = '';

  let content;

  let index = 0;
  let rewardButtons = contentEl.getElementsByTagName('button');

  const rewards = randomRewards(from);

  // TODO: add animation for random feel
  const rewardsHTML = rewards
    ? `
    <div class="rewards">
      ${
        rewards.item
          ? `<div>
              <button data-type="item" data-value="${rewards.item.name}" data-qtt="${
              rewards.itemQtt
            }">
                ${rewards.item.name} x${rewards.itemQtt}
              </button>
              <div class="popup bottom">${popupInfo(rewards.item)}</div>
            </div>`
          : ''
      }
      ${
        rewards.stuf
          ? `<div>
              <button data-type="stuf" data-value="${rewards.stuf.name}">${
              rewards.stuf.name
            }</button>
              <div class="popup bottom">${popupInfo(rewards.stuf)}</div>
            </div>`
          : ''
      }
      ${
        rewards.gems
          ? `<button data-type="gems" data-value="${rewards.gems}">${rewards.gems} gems</button>`
          : ''
      }
    </div>
  `
    : '';

  if (from === 'chest') {
    content = `
      <div class="reward scroll">
        <h1>You opened a chest!</h1>
        <p>Choose wisely between these rewards</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (from === 'map') {
    content = `
      <div class="reward scroll">
        <h1>You cleared ${currentMap.name} from the enemies!</h1>
        <p>Choose wisely between these rewards</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (from === 'world') {
    content = `
      <div class="reward scroll">
        <h1>You saved the ${currentWorld.name} world from the masters!</h1>
        <p>Choose wisely between these rewards</p>
        ${rewardsHTML}
      </div>
    `;
  } else if (from === 'tuto') {
    content = `
      <div class="reward scroll">
        <h1>You finished the tutorial!</h1>
        <p>You are now ready to really start your adventure.</p>
        <p>Good luck!</p>
        <div class="rewards">
          <button>Continue</button>
        </div>
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
      e.preventDefault();
      index = index !== rewardButtons.length - 1 ? index + 1 : 0;
      rewardButtons[index].focus();
    } else if (key === 'ArrowLeft') {
      e.preventDefault();
      index = index !== 0 ? index - 1 : rewardButtons.length - 1;
      rewardButtons[index].focus();
    }
  }

  function stop() {
    document.removeEventListener('keydown', keyRewardHandler);
    clearCanvas();
    if (from === 'chest') {
      screenTransition('left', () => screenWorld(), '', cGrad1);
    } else if (from === 'map') {
      changeMap(currentMap.world, 'next');
    } else if (from === 'world') {
      changeMap('temple', 'temple', currentWorld.name);
    } else if (from === 'tuto') {
      changeMap('temple', 'temple');
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
    }
    if (from === 'chest') currentMap.deadSpots.find((x) => x.type === 'chest').type = '';
    // infoQueue.push(
    //   () =>
    //     (infoEl.innerText = `You got ${crt.dataset.value} ${
    //       crt.dataset.qtt ? 'x' + crt.dataset.qtt : ''
    //     } (${crt.dataset.type})`)
    // );
    stop();
  }
}

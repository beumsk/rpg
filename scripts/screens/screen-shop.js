function screenShop() {
  canvas.style.backgroundImage = '';

  infoEl.innerText = ' ';

  let index = 0;
  let shopBtns = contentEl.getElementsByTagName('button');

  function keyShopHandler(e) {
    const key = e.key;
    if (key === 'ArrowUp') {
      infoEl.innerText = ' ';
      index = index !== 0 ? index - 1 : shopBtns.length - 1;
      shopBtns[index].focus();
    } else if (key === 'ArrowDown') {
      infoEl.innerText = ' ';
      index = index !== shopBtns.length - 1 ? index + 1 : 0;
      shopBtns[index].focus();
    } else if (key === 'Escape' || key === 'Backspace') {
      stop();
    }
  }

  document.addEventListener('keydown', keyShopHandler);

  function updateShop() {
    contentEl.innerHTML = '<div class="shop"></div>';

    const currShop = player.shop.filter((x) => x.lvl <= player.lvl);

    if (currShop?.length > 0) {
      currShop.map((x, i) => {
        const containerEl = document.createElement('div');

        const btnEl = document.createElement('button');
        btnEl.innerText = stuffTypes.includes(x.type)
          ? `${x.name} |${x.type.charAt(0).toUpperCase()}|: ${JSON.stringify(x.effect)} /${
              x.lvl
            }\\ (${x.price} ◈)`
          : `${x.name}: ${JSON.stringify(x.effect)} (${x.price} ◈)`;
        btnEl.dataset.value = x.name;
        containerEl.appendChild(btnEl);

        const popupEl = document.createElement('div');
        popupEl.classList.add('popup');
        popupEl.innerHTML = popupInfo(x, true);
        containerEl.appendChild(popupEl);

        contentEl.querySelector('.shop').appendChild(containerEl);
        index = 0;
        if (i === index) btnEl.focus();
        btnEl.addEventListener('click', btnClick);
      });

      const exitBtn = document.createElement('button');
      exitBtn.innerText = '← exit';
      exitBtn.addEventListener('click', () => {
        stop();
      });
      contentEl.querySelector('.shop').appendChild(exitBtn);
    }
  }
  updateShop();

  function btnClick(e) {
    e.preventDefault();
    let crt = e.target;
    shopBuy(crt.dataset.value);
    updateShop();
    updateState();
  }

  function stop() {
    infoEl.innerText = '';
    document.removeEventListener('keydown', keyShopHandler);
    contentEl.innerHTML = '';
    screenWorld();
  }
}
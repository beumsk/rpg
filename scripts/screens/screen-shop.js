function screenShop() {
  // contentEl.style.backgroundImage = '';

  // TODO: add title, style etc

  infoEl.innerText = ' ';

  let index = 0;
  let shopBtns = contentEl.getElementsByTagName('button');

  function keyShopHandler(e) {
    const key = e.key;
    if (key === 'ArrowUp') {
      e.preventDefault();
      infoEl.innerText = ' ';
      index = index !== 0 ? index - 1 : shopBtns.length - 1;
      shopBtns[index].focus();
    } else if (key === 'ArrowDown') {
      e.preventDefault();
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
    index = 0;

    let currShop = player.shop.filter((x) => x.lvl <= player.lvl && x.src.includes('shop'));

    if (tutoStep === 'shop') {
      if (player.items.length === 0) {
        currShop = player.shop.filter((x) => x.lvl <= player.lvl && x.name === 'potion I');
      } else {
        currShop = [];
      }
    }

    const exitBtn = document.createElement('button');
    exitBtn.innerText = '← exit';
    exitBtn.addEventListener('click', () => {
      stop();
    });

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
        btnEl.addEventListener('click', btnClick);
      });
    }

    if (!currShop.length) {
      contentEl
        .querySelector('.shop')
        .insertAdjacentHTML('afterbegin', `<p>No items or stuff to buy at the moment...</p>`);
    }

    contentEl.querySelector('.shop').appendChild(exitBtn);

    shopBtns[0].focus();
  }
  updateShop();

  function btnClick(e) {
    let crt = e.target;
    shopBuy(crt.dataset.value);
    updateShop();
    updateState();
  }

  function stop() {
    if (tutoStep === 'shop' && player.items.length === 0) return;
    if (tutoStep === 'shop') tutoStep = 'potion';
    infoEl.innerText = '';
    document.removeEventListener('keydown', keyShopHandler);
    contentEl.innerHTML = '';
    screenWorld();
  }
}

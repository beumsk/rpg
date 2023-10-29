function screenDojo() {
  // contentEl.style.backgroundImage = '';

  // TODO: add title, style etc

  infoEl.innerText = ' ';

  let index = 0;
  let dojoBtns = contentEl.getElementsByTagName('button');

  function keyDojoHandler(e) {
    const key = e.key;
    if (key === 'ArrowUp') {
      e.preventDefault();
      infoEl.innerText = ' ';
      index = index !== 0 ? index - 1 : dojoBtns.length - 1;
      dojoBtns[index].focus();
    } else if (key === 'ArrowDown') {
      e.preventDefault();
      infoEl.innerText = ' ';
      index = index !== dojoBtns.length - 1 ? index + 1 : 0;
      dojoBtns[index].focus();
    } else if (key === 'Escape' || key === 'Backspace') {
      stop();
    }
  }

  document.addEventListener('keydown', keyDojoHandler);

  function updateDojo() {
    contentEl.innerHTML = '<div class="dojo"></div>';
    index = 0;

    let currDojoLearn = player.dojo.filter(
      (x) =>
        x.src.includes('dojo') &&
        x.age <= Math.ceil(player.lvl / 5) &&
        (x.element === currentWorld?.name ||
          x.element === 'neutral' ||
          player.elements.includes(x.element)) &&
        !player.attacks.find((y) => y.name === x.name)
    );

    // TODO: improve to lvl 4 max??
    let currDojoImprove = player.dojo.filter(
      (x) => player.attacks.find((y) => y.name === x.name) && x.lvl <= 3
    );

    if (tutoStep === 'dojo' && player.attacks.length > 0) {
      currDojoImprove = [];
    }

    const exitBtn = document.createElement('button');
    exitBtn.innerText = '← exit';
    exitBtn.addEventListener('click', () => {
      stop();
    });

    if (currDojoLearn?.length > 0) {
      currDojoLearn.map((x, i) => {
        const containerEl = document.createElement('div');

        const btnEl = document.createElement('button');
        btnEl.innerText = `${x.name}: ${x.dmg ? x.dmg + 'dmg' : x.type} ${x.element} (${
          x.price
        } ⋈)`;
        btnEl.dataset.value = x.name;
        containerEl.appendChild(btnEl);

        const popupEl = document.createElement('div');
        popupEl.classList.add('popup');
        popupEl.innerHTML = popupInfo(x, true);
        containerEl.appendChild(popupEl);

        contentEl.querySelector('.dojo').appendChild(containerEl);
        btnEl.addEventListener('click', btnClick);
      });
    }

    if (currDojoImprove?.length > 0) {
      currDojoImprove.map((x, i) => {
        const containerEl = document.createElement('div');

        const btnEl = document.createElement('button');
        btnEl.innerText = `|!| ${x.name}: ${x.dmg ? x.dmg + 'dmg' : x.type} ${x.element} (${
          x.price
        } ⋈)`;
        btnEl.dataset.value = x.name;
        containerEl.appendChild(btnEl);

        const popupEl = document.createElement('div');
        popupEl.classList.add('popup');
        popupEl.innerHTML = popupInfo(x, true);
        containerEl.appendChild(popupEl);
        contentEl.querySelector('.dojo').appendChild(containerEl);
        btnEl.addEventListener('click', btnClick);
      });
    }

    if (!currDojoLearn.length && !currDojoImprove.length) {
      contentEl
        .querySelector('.dojo')
        .insertAdjacentHTML('afterbegin', `<p>No attack to learn or improve at the moment...</p>`);
    }

    contentEl.querySelector('.dojo').appendChild(exitBtn);

    dojoBtns[0].focus();
  }
  updateDojo();

  function btnClick(e) {
    let crt = e.target;
    dojoBuy(crt.dataset.value);
    updateDojo();
    updateState();
  }

  function stop() {
    if (tutoStep === 'dojo' && player.attacks.length === 0) return;
    if (tutoStep === 'dojo') tutoStep = 'fight';
    infoEl.innerText = '';
    document.removeEventListener('keydown', keyDojoHandler);
    contentEl.innerHTML = '';
    screenWorld();
  }
}

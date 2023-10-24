function screenLvlUp() {
  contentEl.style.background = cGrad2;

  contentEl.innerHTML = `
    <div class="lvl-up">
      <h1>You reached lvl ${player.lvl}!</h1>
      <div class="fighters">
        <p class="">You got +1 ⋈ scroll</p>
        <p class="">You got +20 ♥ health</p>
        <p class="">You got +20 ↣ strength</p>
        <p class="">You got +10 ∇ defense</p>
        <p class="">You got +10 ❖ wisdom</p>
        <p class="">You got +10 % critics</p>
      </div>
    </div>
  `;

  document.addEventListener('keydown', keyLvlUpHandler);
  contentEl.addEventListener('click', keyLvlUpHandler);

  function keyLvlUpHandler() {
    document.removeEventListener('keydown', keyLvlUpHandler);
    contentEl.removeEventListener('click', keyLvlUpHandler);
    // contentEl.innerHTML = '';
    screenTransition('left', () => screenWorld(), '', cGrad1);
  }
}

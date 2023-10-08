// create html: container + canvas
const containerEl = document.createElement('div');
containerEl.classList.add('container');
document.body.appendChild(containerEl);

const canvasEl = document.createElement('canvas');
canvasEl.classList.add('canvas');
containerEl.appendChild(canvasEl);

const fightEl = document.createElement('div');
fightEl.classList.add('fight');
containerEl.appendChild(fightEl);

const contentEl = document.createElement('div');
contentEl.classList.add('content');
containerEl.appendChild(contentEl);

const transitionEl = document.createElement('div');
transitionEl.classList.add('transition');
containerEl.appendChild(transitionEl);

const stateEl = document.createElement('div');
stateEl.classList.add('state');
containerEl.appendChild(stateEl);

const infoEl = document.createElement('div');
infoEl.classList.add('info');
containerEl.appendChild(infoEl);

const actionQueueEl = document.createElement('button');
actionQueueEl.classList.add('action-queue');
containerEl.appendChild(actionQueueEl);

// const actionMoveEl = document.createElement('div');
// actionMoveEl.classList.add('action-move');
// containerEl.appendChild(actionMoveEl);

const actionMenuEl = document.createElement('button');
actionMenuEl.classList.add('action-menu');
containerEl.appendChild(actionMenuEl);

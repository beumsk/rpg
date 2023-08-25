// create html: container + canvas
const containerEl = document.createElement('div');
containerEl.classList.add('container');
document.body.appendChild(containerEl);

const canvasEl = document.createElement('canvas');
canvasEl.classList.add('canvas');
containerEl.appendChild(canvasEl);

const contentEl = document.createElement('div');
contentEl.classList.add('content');
containerEl.appendChild(contentEl);

const stateEl = document.createElement('div');
stateEl.classList.add('state');
containerEl.appendChild(stateEl);

const infoEl = document.createElement('div');
infoEl.classList.add('info');
containerEl.appendChild(infoEl);

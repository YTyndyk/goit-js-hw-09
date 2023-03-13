const CHANGE_COLOR_DELAY = 1000;
let colorId = null;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
stopBtn.disabled = true;

function onStartBtnClick() {
  colorId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
function onStopBtnClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(colorId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const TIMER_DELAY = 1000;

let selectedDate = null;
let currentDate = null;
let intervalID = null;

const startBtn = document.querySelector('button[data-start]');
const flatpickrInput = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtn.disabled = true;
startBtn.addEventListener('click', setTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        'Ooops...',
        'Please, choose a date in the future!',
        'Okay'
      );
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
      Report.success('Congratulation!', 'Click on start!', 'Okay');
    }
  },
};

const fp = flatpickr(flatpickrInput, options);

function setTimer() {
  counter.start();
}

const counter = {
  start() {
    intervalID = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      updateTimerface(convertMs(deltaTime));
      startBtn.disabled = true;
      if (deltaTime <= 0) {
        this.stop();
        Report.info(
          'Timer stopped!',
          'Please, if you want to start timer, choose a date and click on start or reload this page',
          'Okay'
        );
      }
    }, TIMER_DELAY);
  },
  stop() {
    startBtn.disabled = true;
    clearInterval(intervalID);
    return;
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateTimerface({ days, hours, minutes, seconds }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}

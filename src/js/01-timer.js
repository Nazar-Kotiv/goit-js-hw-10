import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast/dist/js/iziToast.min.js";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval;
let userSelectedDate;

const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

const convertMs = (ms) => {
  const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

  const days = Math.floor(ms / day),
    hours = Math.floor((ms % day) / hour),
    minutes = Math.floor(((ms % day) % hour) / minute),
    seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateTimerDisplay = (timeObject) => {
  Object.entries(timeObject).forEach(([key, value]) => {
    timerFields[key].textContent = addLeadingZero(value);
  });
};

const startTimer = () => {
  const currentDate = new Date();
  const timeDifference = userSelectedDate - currentDate;

  if (timeDifference <= 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startButton.disabled = true;
    return;
  }

  startButton.disabled = true;
  countdownInterval = setInterval(() => {
    const updatedTime = convertMs(userSelectedDate - new Date());
    updateTimerDisplay(updatedTime);

    if (updatedTime.days === 0 && updatedTime.hours === 0 && updatedTime.minutes === 0 && updatedTime.seconds === 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown complete!',
        position: 'topRight',
      });
    }
  }, 1000);
};

const validateDate = (selectedDate) => {
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startButton.disabled = true;
  } else {
    iziToast.destroy();
    userSelectedDate = selectedDate;
    startButton.disabled = false;
  }
};

datetimePicker.addEventListener('input', () => {
  const selectedDate = new Date(datetimePicker.value);
  if (isNaN(selectedDate)) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date',
      position: 'topRight',
    });
    startButton.disabled = true;
  } else {
    validateDate(selectedDate);
  }
});

startButton.addEventListener('click', startTimer);

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    validateDate(selectedDates[0]);
  },
});
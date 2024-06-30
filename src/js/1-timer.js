// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import Group from '../img/error.svg'



// кнопки 

const elements = {
inpurBiblioteck: document.querySelector('#datetime-picker'),
buttonSrart: document.querySelector('button'),
timerDays: document.querySelector('[data-days]'),
timerHoyrs: document.querySelector('[data-hours]'),
timerMinutes: document.querySelector('[data-minutes]'),
timerSeconds: document.querySelector('[data-seconds]'),
};

let datumUser;
let timerId;

elements.buttonSrart.disabled = true;

// Опции библиотеки

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
    
      if (selectedDates[0].getTime() > Date.now()) { 
        elements.buttonSrart.disabled = false;
        datumUser = selectedDates[0].getTime();
        buttonSrart.classList.toggle('inactive');
          
       }else {
        iziToast.show({
          backgroundColor: '#ef4040',
          close: false,
          closeOnClick: true,
          progressBarColor: 'white',
          title: 'Error',
          titleColor: 'white',
          iconUrl: Group,
          position: 'topRight',
          icon: 'icon-error.svg',
          messageColor: 'white',
          messageSize: '16px',
          message: 'Please choose a date in the future'
        });
        
        elements.buttonSrart.disabled = true;      
      }
      
  },
};


// Вызов библиотеки
flatpickr(elements.inpurBiblioteck, options);



// Функція для підрахунку часу

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};


elements.buttonSrart.addEventListener('click', onStartTimer);

function onStartTimer() {
 
  elements.buttonSrart.disabled = true;
 elements.inpurBiblioteck.disabled = true;

  timerId = setInterval(() => {
  const timerResult = datumUser - Date.now();
  const { seconds, minutes, hours, days } = convertMs(timerResult);
    
  elements.timerDays.textContent = addLeadingZero(days);
  elements.timerHoyrs.textContent = addLeadingZero(hours);
  elements.timerMinutes.textContent = addLeadingZero(minutes);
  elements.timerSeconds.textContent = addLeadingZero(seconds);
 if (timerResult < 1000) {
  clearInterval(timerId);
  elements.inpurBiblioteck.disabled = false;
 }

}, 1000)
}





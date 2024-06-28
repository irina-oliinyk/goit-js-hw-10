// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// кнопки 

const elements = {
    inpurBiblioteck: document.querySelector('#datetime-picker'),
    buttonSrart : document.querySelector('button'),
};

let datumUser;

// Опции библиотеки
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates [0].getTime() > Date.now() ) {
        // пока что алерт, а потом заменить на вторую библиотеку
        elements.buttonSrart.disabled = false;
        datumUser = selectedDates[0].getTime();
    } else {
        window.alert("Pleas choose a date in the future");
        elements.buttonSrart.disabled = true;
    }
    console.log(selectedDates[0]);
  },
};

// Вызов библиотеки

flatpickr(elements.inpurBiblioteck, options);


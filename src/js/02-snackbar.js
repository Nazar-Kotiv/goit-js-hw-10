import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = this.elements['delay'];
  const state = this.elements['state'].value;

  const delay = parseInt(delayInput.value, 10);

  const createPromise = new Promise((resolve, reject) => {
    setTimeout(() => (state === 'fulfilled') ? resolve(delay) : reject(delay), delay);
  });

  createPromise.then(
    (delay) => {
      iziToast.success({ title: 'Success', message: `✅ Fulfilled promise in ${delay}ms` });
      delayInput.value = ''; 
    },
    (delay) => {
      iziToast.error({ title: 'Error', message: `❌ Rejected promise in ${delay}ms` });
      delayInput.value = ''; 
    }
  );
});

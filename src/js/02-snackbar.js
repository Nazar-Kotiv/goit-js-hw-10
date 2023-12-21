import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(this.elements['delay'].value, 10);
  const state = this.elements['state'].value;

  const createPromise = new Promise((resolve, reject) => {
    setTimeout(() => (state === 'fulfilled') ? resolve(delay) : reject(delay), delay);
  });

  createPromise.then(
    (delay) => iziToast.success({ title: 'Success', message: `✅ Fulfilled promise in ${delay}ms` }),
    (delay) => iziToast.error({ title: 'Error', message: `❌ Rejected promise in ${delay}ms` })
  );
});
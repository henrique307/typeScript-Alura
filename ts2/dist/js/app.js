import NegociacaoController from './controllers/negociacao-controller.js';
const controller = new NegociacaoController();
const form = document.querySelector('.form');
form ?
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    })
    :
        console.error("ERRO em app.js: form está returnando null na linha 4");

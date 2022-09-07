import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const [form, botao] = [document.querySelector(".form"), document.querySelector(".botao")];

if (form) {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		controller.adiciona();
	});
} else {
	throw Error(
		"Não foi possível inicializar a aplicação. Verifique se o .form existe."
	);
}

if (botao) {
	botao.addEventListener("click", () => {
		controller.importa()
	})
} else {
	throw Error("nao foi possivel iniciar a aplicação verifique se #botao existe")
}
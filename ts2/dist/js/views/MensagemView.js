import ViewElement from "./ViewElement.js";
export default class MensagemView extends ViewElement {
    template(mensagem) {
        return `<p class="alert alert-info">${mensagem}</p>`;
    }
}

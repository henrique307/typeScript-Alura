import ViewElement from "./ViewElement.js";

export default class MensagemView extends ViewElement<string> {

    protected template(mensagem: string): string {
        return `<p class="alert alert-info">${mensagem}</p>`
    }
}
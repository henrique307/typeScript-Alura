export default class ViewElement {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    update(mensagem) {
        this.elemento.innerHTML = this.template(mensagem);
    }
}

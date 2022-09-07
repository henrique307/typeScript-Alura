export default class ViewElement {
    constructor(seletor, escapar = false) {
        this.escapar = escapar;
        const elemento = document.querySelector(seletor);
        if (elemento)
            this.elemento = elemento;
        else
            throw Error(`ERRO em ViewElement, seletor ${seletor} não existe, cheque o arquivo negociacao-controller`);
    }
    update(mensagem) {
        let template = this.template(mensagem);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        this.elemento.innerHTML = template;
    }
}

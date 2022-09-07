import Negociacoes from "../models/negociacoes.js";

export default abstract class ViewElement<T = Negociacoes> {

    private elemento: HTMLElement;

    constructor(seletor: string, private escapar:boolean = false){
        const elemento = document.querySelector(seletor)

        if(elemento)
            this.elemento = <HTMLElement>elemento
        else
            throw Error(`ERRO em ViewElement, seletor ${seletor} não existe, cheque o arquivo negociacao-controller`);

    }

    public update(mensagem: T): void {
        let template: string = this.template(mensagem);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, "")
        }
        this.elemento.innerHTML = template;
    }

    protected abstract template(mensagem: T): string;
}
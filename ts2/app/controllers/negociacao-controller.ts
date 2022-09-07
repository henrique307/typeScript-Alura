import { DiasDaSemana } from "../enums/dias-da-semana.js";
import Negociacao from "../models/negociacao.js";
import Negociacoes from "../models/negociacoes.js";
import MensagemView from "../views/MensagemView.js";
import NegociacoesView from "../views/NegociacoesView.js";

export default class NegociacaoController {
	private inputData: HTMLInputElement;
	private inputQuantidade: HTMLInputElement;
	private inputValor: HTMLInputElement;
	private negociacoes = new Negociacoes();
	private negociacoesView = new NegociacoesView("#negociacoesView", true);
	private mensagemView = new MensagemView("#mensagemView");

	constructor() {
		this.inputData = <HTMLInputElement>document.querySelector("#data")// as HTMLInputElement // tambem funciona;
		this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
		this.inputValor = document.querySelector("#valor") as HTMLInputElement;
		this.negociacoesView
            .update(this.negociacoes);
	}

	public adiciona(): void {

		const negociacao = Negociacao
		.criaNegociacao(
			this.inputData.value,
			this.inputQuantidade.value,
			this.inputValor.value
		);

        !this.ehDiaUtil(negociacao.data.getDay()) ? (
            this.mensagemView
                .update("Apenas dias úteis são permitidos")
        ) : (
            this.aualizaView(negociacao),
            this.limparFormulario(),
            this.mensagemView
                .update("Negociacão adicionada com secesso!")
        );
	}

	private limparFormulario(): void {
		this.inputData.value = "";
		this.inputQuantidade.value = "";
		this.inputValor.value = "";
		this.inputData.focus();
	}

	private aualizaView(negociacao: Negociacao): void {
		this.negociacoes.adiciona(negociacao);
		negociacao.data.setDate(12);
		this.negociacoesView.update(this.negociacoes);
	}

    private ehDiaUtil(dia: number):boolean {
        return dia === DiasDaSemana.SABADO
            || dia === DiasDaSemana.DOMINGO
    }
}

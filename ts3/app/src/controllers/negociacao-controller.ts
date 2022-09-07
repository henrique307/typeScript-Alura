import { logarTempoDeExecucao } from "../decorators/logarTempoDeExecucao.js";
import { inspect } from "../decorators/inspect.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { domInjector } from "../decorators/domInjector.js";
import { NegociacaoDoDia } from "../interfaces/interface-nogociacao.js";
import { NegociacaoService } from "../service/nogociacaoService.js";

export class NegociacaoController {

	//importanto decorators em propriedades da classe NegociacaoController

	@domInjector("#data")
	private inputData: HTMLInputElement;
	@domInjector("#quantidade")
	private inputQuantidade: HTMLInputElement;
	@domInjector("#valor")
	private inputValor: HTMLInputElement;

	private negociacoes = new Negociacoes();
	private negociacoesView = new NegociacoesView("#negociacoesView");
	private mensagemView = new MensagemView("#mensagemView");

	constructor() {
		// 	Era assim antes
		// this.inputData = <HTMLInputElement>document.querySelector("#data");
		// this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
		// this.inputValor = document.querySelector("#valor") as HTMLInputElement;
		this.negociacoesView.update(this.negociacoes);
	}

	@inspect // <-- chamando um decorator sem parâmetros
	@logarTempoDeExecucao("um parametro") // <-- com parâmetro
	public adiciona(): void {
		//const t1 = performance.now();
		/*
            Zé, você já viu isso?
        */
		const negociacao = Negociacao.criaDe(
			this.inputData.value,
			this.inputQuantidade.value,
			this.inputValor.value
		);

		if (!this.ehDiaUtil(negociacao.data)) {
			this.mensagemView.update("Apenas negociações em dias úteis são aceitas");
			return;
		}

		this.negociacoes.adiciona(negociacao);
		console.log(negociacao.paraTexto());
		console.log(this.negociacoes.paraTexto());
		this.limparFormulario();
		this.atualizaView();
	}

	public importa() {
		NegociacaoService.obterNegociacoes()
			.then(negociacoesDoDia => {
				return negociacoesDoDia.filter(negociacaoDoDia => {
					return !this.negociacoes
						.lista()
						.some(negociacao => negociacao
							.ehIgual(negociacaoDoDia))
				})
			})
			.then((arrayDeNogaciacoes) => {
				for(let negociacao of arrayDeNogaciacoes) {
					this.negociacoes.adiciona(negociacao)
				}
				this.negociacoesView.update(this.negociacoes)
			})
	}

	private ehDiaUtil(data: Date) {
		return (
			data.getDay() > DiasDaSemana.DOMINGO &&
			data.getDay() < DiasDaSemana.SABADO
		);
	}

	private limparFormulario(): void {
		this.inputData.value = "";
		this.inputQuantidade.value = "";
		this.inputValor.value = "";
		this.inputData.focus();
	}

	private atualizaView(): void {
		this.negociacoesView.update(this.negociacoes);
		this.mensagemView.update("Negociação adicionada com sucesso");
	}
}

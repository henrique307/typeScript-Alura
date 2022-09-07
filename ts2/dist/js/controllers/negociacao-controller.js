import { DiasDaSemana } from "../enums/dias-da-semana.js";
import Negociacao from "../models/negociacao.js";
import Negociacoes from "../models/negociacoes.js";
import MensagemView from "../views/MensagemView.js";
import NegociacoesView from "../views/NegociacoesView.js";
export default class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView", true);
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView
            .update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao
            .criaNegociacao(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        !this.ehDiaUtil(negociacao.data.getDay()) ? (this.mensagemView
            .update("Apenas dias úteis são permitidos")) : (this.aualizaView(negociacao),
            this.limparFormulario(),
            this.mensagemView
                .update("Negociacão adicionada com secesso!"));
    }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    aualizaView(negociacao) {
        this.negociacoes.adiciona(negociacao);
        negociacao.data.setDate(12);
        this.negociacoesView.update(this.negociacoes);
    }
    ehDiaUtil(dia) {
        return dia === DiasDaSemana.SABADO
            || dia === DiasDaSemana.DOMINGO;
    }
}

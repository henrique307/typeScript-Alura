import Conjuntao from "../utils/Conjuntao.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Conjuntao<Negociacoes>{
	private negociacoes: Negociacao[] = [];
	
	public adiciona(negociacao: Negociacao) {
		this.negociacoes.push(negociacao);
	}

	public lista(): readonly Negociacao[] {
		return this.negociacoes;
	}

	public paraTexto() {
		return JSON.stringify(this.negociacoes, null, 2);
	}

	public ehIgual(negociacoes: Negociacoes): boolean {
		return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista())
	}
}

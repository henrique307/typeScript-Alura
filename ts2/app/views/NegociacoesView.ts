import Negociacoes from "../models/negociacoes.js";
import ViewElement from "./ViewElement.js";

export default class NegociacoesView extends ViewElement{

    protected template(negociacoes: Negociacoes): string {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                ${negociacoes.lista().map(negociacao => {
                    return `
                    <tr>
                        <td>${this.formatarData(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                    `
                }).join('')}
            </tbody>
        </table>
        <script>alert('HA!!!!!! TE PEGUEI >=DDDD')</script>
        ` 
    }

    private formatarData(data:Date): string {
        return new Intl.DateTimeFormat().format(data)
    }
}


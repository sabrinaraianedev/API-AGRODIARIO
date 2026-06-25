import { PreparacaoSoloControle } from "../controle/preparacaoSolo.controle";
import { PreparacaoSoloDao } from "../dao/preparacaoSolo.dao";
import { TalhaoDao } from "../dao/talhao.dao";
import { PreparacaoSoloServico } from "../servico/preparacaoSolo.servico";
import { Api } from "./api"; 

export class PreparacaoSoloApi {
    readonly preparacaoSoloControle: PreparacaoSoloControle;

   
    private constructor(readonly api: Api) {
        const preparacaoSoloDao = new PreparacaoSoloDao();
        const talhaoDao = new TalhaoDao();
        const preparacaoSoloServico = new PreparacaoSoloServico(preparacaoSoloDao, talhaoDao);
        
        this.preparacaoSoloControle = new PreparacaoSoloControle(preparacaoSoloServico);
    }

    public static build(api: Api) {
        const apiPreparacao = new PreparacaoSoloApi(api);
        apiPreparacao.addRotas();
    }

    public addRotas() {
        this.api.addRota("/preparacao-solo", "POST", this.preparacaoSoloControle.cadastrar.bind(this.preparacaoSoloControle));
        this.api.addRota("/preparacao-solo", "GET", this.preparacaoSoloControle.listar.bind(this.preparacaoSoloControle));
        this.api.addRota("/preparacao-solo/:id", "GET", this.preparacaoSoloControle.buscar.bind(this.preparacaoSoloControle));
        this.api.addRota("/preparacao-solo/:id", "PUT", this.preparacaoSoloControle.atualizar.bind(this.preparacaoSoloControle));
        this.api.addRota("/preparacao-solo/:id", "DELETE", this.preparacaoSoloControle.deletar.bind(this.preparacaoSoloControle));
    }
}
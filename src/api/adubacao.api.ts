import { AdubacaoControle } from "../controle/adubacao.controle";
import { AdubacaoDao } from "../dao/adubacao.dao";
import { TalhaoDao } from "../dao/talhao.dao";
import { AdubacaoServico } from "../servico/adubacao.servico";
import { Api } from "./api"; // Classe Api central do seu professor

export class AdubacaoApi {
    readonly adubacaoControle: AdubacaoControle;

    // INJEÇÃO: Recebe o servidor centralizado de fora
    private constructor(readonly api: Api) {
        // Criamos os moldes das classes com letra maiúscula
        const adubacaoDao = new AdubacaoDao();
        const talhaoDao = new TalhaoDao();
        const adubacaoServico = new AdubacaoServico(adubacaoDao, talhaoDao);
        
        this.adubacaoControle = new AdubacaoControle(adubacaoServico);
    }

    public static build(api: Api) {
        const apiAdubacao = new AdubacaoApi(api);
        apiAdubacao.addRotas();
    }

    public addRotas() {
        this.api.addRota("/adubacao", "POST", this.adubacaoControle.cadastrar.bind(this.adubacaoControle));
        this.api.addRota("/adubacao", "GET", this.adubacaoControle.listar.bind(this.adubacaoControle));
        this.api.addRota("/adubacao/:id", "GET", this.adubacaoControle.buscar.bind(this.adubacaoControle));
        this.api.addRota("/adubacao/:id", "PUT", this.adubacaoControle.atualizar.bind(this.adubacaoControle));
        this.api.addRota("/adubacao/:id", "DELETE", this.adubacaoControle.deletar.bind(this.adubacaoControle));
    }
}
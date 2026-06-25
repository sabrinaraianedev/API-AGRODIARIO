import { LimpezaControle } from "../controle/limpeza.controle";
import { LimpezaDao } from "../dao/limpeza.dao";
import { TalhaoDao } from "../dao/talhao.dao";
import { LimpezaServico } from "../servico/limpeza.servico";
import { Api } from "./api"; 

export class LimpezaApi {
    readonly limpezaControle: LimpezaControle;

    
    private constructor(readonly api: Api) {
        
        const limpezaDao = new LimpezaDao();
        const talhaoDao = new TalhaoDao();
        const limpezaServico = new LimpezaServico(limpezaDao, talhaoDao);
        
        this.limpezaControle = new LimpezaControle(limpezaServico);
    }

    public static build(api: Api) {
        const apiLimpeza = new LimpezaApi(api);
        apiLimpeza.addRotas();
    }

    public addRotas() {
        this.api.addRota("/limpeza", "POST", this.limpezaControle.cadastrar.bind(this.limpezaControle));
        this.api.addRota("/limpeza", "GET", this.limpezaControle.listar.bind(this.limpezaControle));
        this.api.addRota("/limpeza/:id", "GET", this.limpezaControle.buscar.bind(this.limpezaControle));
        this.api.addRota("/limpeza/:id", "PUT", this.limpezaControle.atualizar.bind(this.limpezaControle));
        this.api.addRota("/limpeza/:id", "DELETE", this.limpezaControle.deletar.bind(this.limpezaControle));
    }
}
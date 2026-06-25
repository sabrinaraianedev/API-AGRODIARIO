import 'reflect-metadata';
import { Api } from "./api/api"; 
import { AdubacaoApi } from './api/adubacao.api';

// IMPORTANTE: Conforme você for refatorando os outros arquivos (Limpeza, Poda, etc.)
// para o modelo de classe igual ao de Adubação, você vai importando e adicionando eles aqui embaixo.

function main() {
    const api = Api.build(); // Inicia o servidor central do professor

    // Liga as rotas de adubação injetando a api nele
    AdubacaoApi.build(api);

    // Quando consertar as outras camadas, é só descomentar:
    // LimpezaApi.build(api);
    // FazendaApi.build(api);

    api.start(); // Roda o servidor na porta 3000
}

main();
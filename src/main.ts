import 'reflect-metadata';
import { Api } from "./api/api";
import { AdubacaoApi } from './api/adubacao.api';
import { FazendaApi } from './api/fazenda.api';
import { LimpezaApi } from './api/limpeza.api';
import { PodaApi } from './api/poda.api';
import { PreparacaoSoloApi } from './api/preparacaoSolo.api';
import { TalhaoApi } from './api/talhao.api'; // Importa a nova API de Talhão

function main() {
 const api = Api.build(); // Inicia o servidor central do professor

 // Ativa os módulos injetando o servidor neles
 AdubacaoApi.build(api);
 FazendaApi.build(api);
 LimpezaApi.build(api);
 PodaApi.build(api);
 PreparacaoSoloApi.build(api);
 TalhaoApi.build(api); // Ativa as rotas de Talhão

 api.start(); // Roda o servidor na porta 3000
}

main();
import 'reflect-metadata';
import { Api } from "./api/api";
import { AdubacaoApi } from './api/adubacao.api';
import { FazendaApi } from './api/fazenda.api';
import { LimpezaApi } from './api/limpeza.api'; // Importa a nova classe de limpeza

function main() {
   const api = Api.build(); // Inicia o servidor central do professor

   // Ativa os módulos injetando o servidor neles
   AdubacaoApi.build(api);
   FazendaApi.build(api);
   LimpezaApi.build(api); // Ativa as rotas de Limpeza

   // Conforme corrigir os outros módulos, adicione-os aqui:
   // TalhaoApi.build(api);

   api.start(); // Roda o servidor na porta 3000
}

main();
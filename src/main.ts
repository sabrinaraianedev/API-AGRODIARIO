import 'reflect-metadata';
import { Api } from "./api/api";
import { AdubacaoApi } from './api/adubacao.api';
import { FazendaApi } from './api/fazenda.api'; // Importa a nova API de fazenda

function main() {
   const api = Api.build(); // Inicia o servidor central do professor

   // Ativa os módulos injetando o servidor neles
   AdubacaoApi.build(api);
   FazendaApi.build(api);

   // Conforme corrigir os outros módulos, adicione-os aqui:
   // LimpezaApi.build(api);
   // TalhaoApi.build(api);

   api.start(); // Roda o servidor na porta 3000
}

main();
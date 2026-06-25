import { Router } from "express"
import { PreparacaoSoloControle } from "../controle/preparacaoSolo.controle"

const rotasPreparacaoSolo = Router()
const controle = new PreparacaoSoloControle()

rotasPreparacaoSolo.post('/preparacao-solo', controle.cadastrar)
rotasPreparacaoSolo.get('/preparacao-solo', controle.listar)
rotasPreparacaoSolo.get('/preparacao-solo/:id', controle.buscar)
rotasPreparacaoSolo.put('/preparacao-solo/:id', controle.atualizar)
rotasPreparacaoSolo.delete('/preparacao-solo/:id', controle.deletar)

export default rotasPreparacaoSolo
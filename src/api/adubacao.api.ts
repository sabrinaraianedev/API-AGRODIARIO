import { Router } from "express"
import { AdubacaoControle } from "../controle/adubacao.controle"

const rotasAdubacao = Router()
const controle = new AdubacaoControle()

rotasAdubacao.post('/adubacao', controle.cadastrar)
rotasAdubacao.get('/adubacao', controle.listar)
rotasAdubacao.get('/adubacao/:id', controle.buscar)
rotasAdubacao.put('/adubacao/:id', controle.atualizar)
rotasAdubacao.delete('/adubacao/:id', controle.deletar)

export default rotasAdubacao
import { Router } from "express"
import { LimpezaControle } from "../controle/limpeza.controle"

const rotasLimpeza = Router()
const controle = new LimpezaControle()

rotasLimpeza.post('/limpeza', controle.cadastrar)
rotasLimpeza.get('/limpeza', controle.listar)
rotasLimpeza.get('/limpeza/:id', controle.buscar)
rotasLimpeza.put('/limpeza/:id', controle.atualizar)
rotasLimpeza.delete('/limpeza/:id', controle.deletar)

export default rotasLimpeza
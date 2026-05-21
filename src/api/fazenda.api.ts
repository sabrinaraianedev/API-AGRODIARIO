import { Router } from 'express'
import { FazendaControle } from '../controle/fazenda.controle'

const router = Router()

const controle = new FazendaControle()

router.post('/fazenda', controle.cadastrar)
router.get('/fazenda', controle.listar)
router.get('/fazenda/:id', controle.buscar)
router.delete('/fazenda/:id', controle.deletar)
router.put('/fazenda/:id', controle.atualizar)

export default router


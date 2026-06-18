import { Router } from 'express'
import { TalhaoControle } from '../controle/talhao.controle'

const router = Router()
const controle = new TalhaoControle()

router.post('/talhao', controle.cadastrar)
router.get('/talhao', controle.listar)
router.get('/talhao/:id', controle.buscar)
router.delete('/talhao/:id', controle.deletar)
router.put('/talhao/:id', controle.atualizar)

export default router
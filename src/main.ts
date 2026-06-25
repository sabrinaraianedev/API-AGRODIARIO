import express from 'express'
import fazendaApi from './api/fazenda.api'
import rotasTalhao from './api/talhao.api'
import rotasPoda from './api/poda.api'
import rotasPreparacaoSolo from './api/preparacaoSolo.api'
import rotasLimpeza from './api/limpeza.api'
import rotasAdubacao from './api/adubacao.api'


const app = express()

app.use(express.json())

app.use(rotasLimpeza)
app.use(fazendaApi)
app.use(rotasTalhao)
app.use(rotasPoda)
app.use(rotasPreparacaoSolo)
app.use(rotasAdubacao)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
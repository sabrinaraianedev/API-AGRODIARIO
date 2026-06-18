import express from 'express'
import fazendaApi from './api/fazenda.api'
import rotasTalhao from './api/talhao.api'

const app = express()

app.use(express.json())

app.use(fazendaApi)
app.use(rotasTalhao)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
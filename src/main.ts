import express from 'express'
import fazendaApi from './api/fazenda.api'

const app = express()

app.use(express.json())

app.use(fazendaApi)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
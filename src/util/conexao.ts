import pg from 'pg'

const { Pool } = pg

const conexao = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'bd',
    database: 'Agrodiario',
    port: 5432
    })

export default conexao
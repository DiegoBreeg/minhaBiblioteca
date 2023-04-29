import express from 'express'
import { databaseConnect } from './database/connect'
import cors from 'cors'
import { router } from './routes'

const port = 3000
const app = express()

async function Start() {
    app.use(express.json())
    app.use(cors())
    app.use(router)
    await app.listen(port, () => console.log(`Servidor connectado na porta ${port}`))
    await databaseConnect()
}


Start()
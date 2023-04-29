import { connect, set } from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()





async function databaseConnect() {
    try {
        console.log('Conectando ao banco de Dados...')
        set('strictQuery', true)
        await connect(String(process.env.mongdbUri))
        console.log('Conectado com sucesso!')
    } catch (err) {
        console.log(err)
    }

}

export { databaseConnect }
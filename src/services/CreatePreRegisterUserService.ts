import { IUser, Users } from '../database/models/User'
import * as dotenv from 'dotenv'
dotenv.config()

class CreatePreRegisterUser {
    async execute(body: IUser): Promise<Array<any>> {

        console.log("CreatePreRegisterUserService/Recived Body: ", body)
        const user = new Users<IUser>({
            FirstName: body.FirstName,
            LastName: body.LastName,
            UserName: body.UserName,
            CreationData: new Date(),
            AuthenticatedUrl: ''
        })
        
        try {
            const data = await Users.find({ UserName: user.UserName })
            if (data.length != 0)
                return [{ message: 'Este Usuário já está registrado' }]

        } catch (err) {
            return [{ message: "Houve algum erro inesperado" }, err]
        }


        const url = 'https://integracao.dli.minhabiblioteca.com.br/DigitalLibraryIntegrationService/CreatePreRegisterUser';
        const apiKey = process.env.apiKey || ''
        const requestXml =
            `<?xml version="1.0" encoding="utf-8"?>
                    <CreatePreRegisterUserRequest
                    xmlns="http://dli.zbra.com.br"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                    <FirstName>${user.FirstName}</FirstName>
                    <LastName>${user.LastName}</LastName>
                    <UserName>${user.UserName}</UserName>
                </CreatePreRegisterUserRequest>`;

        const headers = {
            'Content-Type': 'application/xml; charset=utf-8',
            'X-DigitalLibraryIntegration-API-Key': apiKey,
            'Host': 'integracao.dli.minhabiblioteca.com.br'
        };

        const requestOptions = {
            method: 'POST',
            headers,
            body: requestXml
        };


        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                return [{ message: response.status }]
            }
            const responseText = await response.text();
            const responseSucess = responseText.split(/<Success>(.*?)<\/Success>/s)[1]
            const responseMessage = responseText.split(/<Message>(.*?)<\/Message>/s)[1]
            console.log("CreatePreRegisterUserService/Response: ",responseText);
            if (responseSucess == 'false')
                return [{ message: responseMessage }]
            await user.save();
            console.log("CreatePreRegisterUserService/Saved user: ", user)
            return [{ message: responseMessage }]

        } catch (error) {
            return [{ message: error }]
        }
    }
}

export { CreatePreRegisterUser }
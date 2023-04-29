import { IUser, Users } from '../database/models/User'
import * as dotenv from 'dotenv'
dotenv.config()

class AuthenticatedUrl {
    async execute(body: IUser): Promise<Array<any>> {

        console.log("AuthenticatedUrlService/Recived Body: ",body)
        const user = {
            FirstName: body.FirstName,
            LastName: body.LastName,
            UserName: body.UserName,
        }

        try {
            //Database search filter
            const data: IUser[] = await Users.find(user)
            if (data.length == 0)
                return [{ message: 'INVALID FirstName, LastName or UserName' }]
            user.FirstName = data[0].FirstName
            user.LastName = data[0].LastName
            user.UserName = data[0].UserName

        } catch (err) {
            return [{ message: "Houve algum erro inesperado" }, err]
        }

        const url = 'https://integracao.dli.minhabiblioteca.com.br/DigitalLibraryIntegrationService/AuthenticatedUrl';
        const apiKey = process.env.apiKey || ''

        const requestXml =
            `<?xml version="1.0" encoding="utf-8"?>
                <CreateAuthenticatedUrlRequest
                xmlns="http://dli.zbra.com.br"
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <FirstName>${user.FirstName}</FirstName>
                <LastName>${user.LastName}</LastName>
                <Email>${user.UserName}</Email>
                <CourseId xsi:nil="true"/>
                <Tag xsi:nil="true"/>
                <Isbn xsi:nil="true"/>
            </CreateAuthenticatedUrlRequest>`;

        const headers = {
            'Content-Type': 'application/xml; charset=utf-8',
            'X-DigitalLibraryIntegration-API-Key': apiKey,
            'Host': 'integracao.dli.minhabiblioteca.com.br'
        };

        const requestOptions = {
            method: 'POST',
            headers,
            body: requestXml
        }

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {                
                return [{ message: response.status }]
            }
            const responseText = await response.text();
            const responseSucess = responseText.split(/<Success>(.*?)<\/Success>/s)[1]
            const authenticatedUrl = responseText.split(/<AuthenticatedUrl>(.*?)<\/AuthenticatedUrl>/s)[1]
            console.log("AuthenticatedUrlService/Response: ", responseText)
            if (responseSucess == 'false') {
                const responseMessage = responseText.split(/<Message>(.*?)<\/Message>/s)[1]
                return [{ message: responseMessage }]
            }
            console.log("AuthenticatedUrlService/Authenticated URL: ", authenticatedUrl)
            await Users.findOneAndUpdate({ UserName: user.UserName }, { AuthenticatedUrl: authenticatedUrl })
            return [{ authenticatedUrl }]

        } catch (error) {
            return [{ message: error }]
        }
    }
}

export { AuthenticatedUrl }
function CreateAuthenticatedUrlRequest() {
    require('dotenv').config();
    const name = document.querySelector('#name')
    const lastName = document.querySelector('#lastName')
    const user = document.querySelector('#lastName')

    const url = 'https://integracao.dli.minhabiblioteca.com.br/DigitalLibraryIntegrationService/AuthenticatedUrl';
    const apiKey =  ''

    const requestXml =
`<?xml version="1.0" encoding="utf-8"?>
    <CreateAuthenticatedUrlRequest
    xmlns="http://dli.zbra.com.br"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <FirstName>${name.value}</FirstName>
    <LastName>${lastName.value}</LastName>
    <Email>${user.value}</Email>
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
    };

    async function sendRequest() {
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseText = await response.text();
            console.log(responseText);
            const responseContainer  = document.createElement('div')
            responseContainer.innerText = responseText
            document.body.appendChild(responseContainer)
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    sendRequest()
}
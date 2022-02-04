const fetch = require('cross-fetch');
const dotenv = require('dotenv').config();

class Service{

    constructor(){
        this.url = process.env.URL_API;
    }

    async recuperer(){
        const response = await fetch.fetch(this.url);
        const data = await response.json();
        return data;
    }

    async recupererPseudo(pseudo){
        const response = await fetch.fetch(this.url+"/"+pseudo);
        const data = await response.json();
        return data;
    }

    async creerCollegue(collegueDto){
        const response = await fetch.fetch(this.url,
            {
                method: 'post',
                body: JSON.stringify(collegueDto),
                headers: {'Content-Type': 'application/json'}
            });
        return await response.json();
    }

}

exports.Serv = Service;
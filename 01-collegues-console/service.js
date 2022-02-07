import * as fetch from 'cross-fetch';
import 'dotenv/config';

export default class Service{

    constructor(){
        this.url = process.env.URL_API;
        this.urlVote = process.env.URL_VOTE;
    }

    async recupererTout(){
        const response = await fetch.fetch(this.url);
        return await response.json();
    }

    async recupererPseudo(pseudo){
        const response =  await fetch.fetch(this.url+"/"+pseudo);
        return await response.json();
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

    async voter(voteDto){
        const response = await fetch.fetch(this.urlVote,
            {
                method: 'post',
                body: JSON.stringify(voteDto),
                headers: {'Content-Type': 'application/json'}
            });
        return await response.json();
    }

}

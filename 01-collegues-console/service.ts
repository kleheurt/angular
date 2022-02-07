import * as fetch from 'cross-fetch';
import 'dotenv/config';
import {CollegueDto, VoteDto} from './collegue';


export default class Service{

    url:string = process.env.URL_API!;
    urlVote:string = process.env.URL_VOTE!;

    async recupererTout(){
        const response = await fetch.fetch(this.url);
        return await response.json();
    }

    async recupererPseudo(pseudo:string){
        const response =  await fetch.fetch(this.url+"/"+pseudo);
        return await response.json();
    }

    async creerCollegue(collegueDto:CollegueDto){
        const response = await fetch.fetch(this.url,
            {
                method: 'post',
                body: JSON.stringify(collegueDto),
                headers: {'Content-Type': 'application/json'}
            });
        return await response.json();
    }

    async voter(voteDto:VoteDto){
        const response = await fetch.fetch(this.urlVote,
            {
                method: 'post',
                body: JSON.stringify(voteDto),
                headers: {'Content-Type': 'application/json'}
            });
        return await response.json();
    }

}

const readline = require('readline');
const serv = require("./service")
const dotenv = require('dotenv').config();

class Presentation{

    constructor(options){
        this.options = options.set(99,"Sortir");
        this.service = new serv.Serv();
        this.inteR = readline.createInterface(process.stdin, process.stdout);
    }

    demarrer(){
        this.options.forEach((value,key) => {
            console.log(key+" : "+value);
        });
    }

    utiliser(){
        const demarrage = this.demarrer();
        this.inteR.setPrompt(demarrage);
        this.inteR.on('line', (choix) => this.choisir(choix));
    }

    async choisir(choix){
        console.log("Votre choix : "+choix);
        switch(choix){
            case '1': 
                await this.afficher();
                break;
            case '2':
                await this.creer();
                break;
            case '3':
                await this.voter();
                break;
            case '4':
                await this.afficherClassement();
                break;
            case '5':
                await this.afficherPseudo();
                break;
            case '99':
                console.log("Au revoir");
                break;
        }
    }

    async afficher(){
        this.inteR.close();
        console.log(">> Liste des collègues");            
        const data = await this.service.recuperer();
        for(const collegue of data){
            this.afficherCollegue(collegue);
       }
    }

    async creer(){
        const collegueDto = await this.creerCollegueDto();
        try{
            const collegue = await this.service.creerCollegue(collegueDto);
            this.afficherCollegue(collegue);     
        } catch(e){
            console.log("Collègue invalide - création annulée.");
            console.error(e);
        }
    }   

    async creerCollegueDto(){
        const nom = await this.saisirMot("Veuillez saisir un nom : ");
        const photo = process.env.URL_PHOTO;
        const prenom = await this.saisirMot("Veuillez saisir un prenom : ");
        const pseudo = await this.saisirMot("Veuillez saisir un pseudo : ");
        return {nom:nom, photo:photo, prenom:prenom, pseudo:pseudo};
    }

    async voter(){
        const voteDto = await this.creerVoteDto();
        try{
            const collegue = await this.service.voter(voteDto);
            this.afficherCollegue(collegue);
        } catch(e){
            console.log("Vote invalidé");
            consoler.error(e);
        }
    }

    async creerVoteDto(){
        const pseudo = await this.saisirMot("Veuillez saisir un pseudo : ");
        return {avis:"AIMER", pseudo:pseudo};
    }

    async afficherClassement(){
        console.log("à implémenter");
    }

    async afficherPseudo(){
        try{
            const pseudo = await this.saisirMot("Veuillez saisir un pseudo\n");
            const collegue = await this.service.recupererPseudo(pseudo);    
            this.afficherCollegue(collegue);
        } catch(e) {
            console.log("Pseudo non trouvé");
            console.error(e);
        }
    }

    saisirMot(laQuestion){
        return new Promise(resolve => this.inteR.question(laQuestion, x => resolve(x)));
    }

    afficherCollegue(collegue){
        console.log(`${collegue.pseudo} : ${collegue.prenom} ${collegue.nom} > score : ${collegue.score}`);
    }

}

exports.Pres = Presentation;

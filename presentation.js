const readline = require('readline');
const serv = require("./service");
const dotenv = require('dotenv').config();

class Presentation{

    constructor(){
        this.options = new Map()
            .set("Lister les collègues",this.afficher)
            .set("Créer un collègue", this.creer)
            .set("Créer un vote", this.voter)
            .set("Afficher le classement", this.afficherClassement)
            .set("Afficher par pseudo", this.afficherPseudo)
            .set("Quitter", this.quitter);

        this.service = new serv.Serv();
        this.inteR = readline.createInterface(process.stdin, process.stdout);
    }

    demarrer(){
        const opt = this.options.keys();
        for(const i in [...Array(this.options.size)]){
            console.log(i+" : "+opt.next().value);
        }
    }

    async utiliser(){
        const demarrage = this.demarrer();
        this.inteR.setPrompt(demarrage);
        this.choisir( await this.saisirMot("Votre choix : "));
    }

    saisirMot(laQuestion){
        return new Promise(resolve => this.inteR.question(laQuestion, x => resolve(x)));
    }

    afficherCollegue(collegue){
        console.log(`${collegue.pseudo} : ${collegue.prenom} ${collegue.nom} > score : ${collegue.score}`);
    }

    async choisir(choix){
        await Array.from(this.options.values())[parseInt(choix)]();
    }

    afficher = async () => {
        this.inteR.close();
        console.log(">> Liste des collègues");            
        const data = await this.service.recupererTout();
        data.forEach(this.afficherCollegue);
    }

    creer = async () => {
        const collegueDto = await this.creerCollegueDto();
        try{
            const collegue = await this.service.creerCollegue(collegueDto);
            this.afficherCollegue(collegue);     
        } catch(e){
            console.log("Collègue invalide - création annulée.");
            console.error(e);
        }
    }   

    creerCollegueDto = async () => {
        const nom = await this.saisirMot("Veuillez saisir un nom : ");
        const photo = process.env.URL_PHOTO;
        const prenom = await this.saisirMot("Veuillez saisir un prenom : ");
        const pseudo = await this.saisirMot("Veuillez saisir un pseudo : ");
        return {nom, photo, prenom, pseudo};
    }

    voter = async () => {
        const voteDto = await this.creerVoteDto();
        try{
            const collegue = await this.service.voter(voteDto);
            this.afficherCollegue(collegue);
        } catch(e){
            console.log("Vote invalidé");
            consoler.error(e);
        }
    }

    creerVoteDto = async () => {
        const pseudo = await this.saisirMot("Veuillez saisir un pseudo : ");
        return {avis:"AIMER", pseudo:pseudo};
    }

    afficherClassement = async () => {
        this.inteR.close();
        console.log(">> Classement des collègues");            
        const data = await this.service.recupererTout();
        data.sort((a,b) => b.score - a.score)
            .forEach(this.afficherCollegue);
    }

    afficherPseudo = async () => {
        try{
            const pseudo = await this.saisirMot("Veuillez saisir un pseudo : ");
            const collegue = await this.service.recupererPseudo(pseudo);    
            this.afficherCollegue(collegue);
        } catch(e) {
            console.log("Pseudo non trouvé");
            console.error(e);
        }
    }

    quitter = async () => {
        console.log("Au revoir");
        this.inteR.close();
    }
}

exports.Pres = Presentation;

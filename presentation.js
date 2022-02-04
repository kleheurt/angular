const readline = require('readline');
const serv = require("./service")
const util = require('util');


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
        console.log("Saisir un pseudo");
    }

    async voter(){
        console.log("à implémenter");
    }

    async afficherClassement(){
        console.log("à implémenter");
    }

    afficherCollegue(collegue){
        console.log(collegue.pseudo+" : "+collegue.prenom+" "+collegue.nom);
    }

}

exports.Pres = Presentation;

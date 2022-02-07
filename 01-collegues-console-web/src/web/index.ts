import Service from '../common/service';
import {CollegueWeb} from '../common/collegue';

const service:Service = new Service();

async function afficher(){
    const contenu = document.querySelector("#contenu")!;
    contenu.innerHTML += (await service.recupererTout())
        .sort((x:CollegueWeb,y:CollegueWeb) => y.score - x.score)
        .map((x:CollegueWeb) => afficherCollegue(x))
        .reduce((x:string, y:string) => x+y);
}

function afficherCollegue(collegue:CollegueWeb):string {
    return `<tr>
                <td class='col-md-2'> <img src='${collegue.photo}'></td>
                <td> ${collegue.pseudo} </td>
                <td> ${collegue.prenom} </td>
                <td> ${collegue.nom} </td>
                <td> ${collegue.score} </td>
            </tr>` 
}

afficher();


type CollegueBase = {
    pseudo:string;
    prenom:string;
    nom:string;
}

export type CollegueWeb = CollegueBase & {
    score:number;
    photo:string;
}

export type Collegue = CollegueBase & {
    score:number;
}

export type CollegueDto = CollegueBase & {
    photo:string;
}

export type VoteDto = {
    avis:string;
    pseudo:string;
}
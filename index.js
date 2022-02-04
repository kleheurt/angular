const pres = require("./presentation")
console.log('** Administration Collegues **');
presentation = new pres.Pres(new Map().set(1,"Lister les collègues")
                                        .set(2,"Créer un collègue")
                                        .set(3,"Créer un vote")
                                        .set(4, "Afficher le classement")
                                        .set(5,"Afficher par pseudo"));
presentation.utiliser();


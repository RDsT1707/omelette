// Créez un objet personnage avec les propriétés et méthodes suivantes :
class Personnage {
    constructor(nom, lieu, argent) {
        this.nom = nom;
        this.lieu = lieu;
        this.argent = argent;
        this.mainDroite = [];
        this.mainGauche = [];
    }

    seDeplacer(nouveauLieu) {
        console.log(`${this.nom} se déplace de ${this.lieu} à ${nouveauLieu.nom}.`);
        if (this.lieu && this.lieu.personnes) {
            this.lieu.personnes = this.lieu.personnes.filter(p => p !== this);
        }
        this.lieu = nouveauLieu;
        nouveauLieu.personnes.push(this);
    }

    payerArticle(article) {
        if (this.argent >= article.prix) {
            this.argent -= article.prix;
            this.mainDroite.push(article);
            console.log(`${this.nom} a acheté ${article.nom} pour ${article.prix}€. Il lui reste ${this.argent}€.`);
        } else {
            console.log(`${this.nom} n'a pas assez d'argent pour acheter ${article.nom}.`);
        }
    }

    couper(ingredient, outil) {
        if (outil.nom === "couteau" && ingredient.etat === "entier") {
            ingredient.etat = "coupé";
            console.log(`${this.nom} a coupé ${ingredient.nom} avec ${outil.nom}.`);
        } else {
            console.log(`${this.nom} ne peut pas couper ${ingredient.nom}.`);
        }
    }
}

// Créer Lieux
class Lieu {
    constructor(nom) {
        this.nom = nom;
        this.personnes = [];
    }
}

// Créer Outil
class Outil {
    constructor(nom, action) {
        this.nom = nom;
        this.action = action;
    }
}

// Ingrédient
class Ingredient {
    constructor(nom, etat, prix) {
        this.nom = nom;
        this.etat = etat;
        this.prix = prix;
    }
}

// Créez un outil (poêle).
class Poele {
    constructor(nom) {
        this.nom = nom;
        this.contenu = [];
    }

    cuire() {
        if (this.contenu.length > 0) {
            console.log(`Cuisson en cours de ${this.contenu[0].nom}...`);
            setTimeout(() => {
                this.contenu[0].etat = "cuit";
                console.log(`${this.contenu[0].nom} est maintenant cuit !`);
                this.contenu = [{ nom: "omelette", etat: "cuit" }];
            }, 4000);
        } else {
            console.log("Il n'y a rien dans la poêle à cuire.");
        }
    }
}

class bol {
    constructor() {
        this.contenu = [];
    }
    melanger(nomDuMelange) {
        if (this.contenu.length > 0) {
            console.log(`Mélange des ingrédients ${nomDuMelange}...`);
            this.contenu = [{
                nom: nomDuMelange,
                etat: "cru",
                prix: 0
            }];
            console.log(`Le mélange est prêt : ${nomDuMelange} (état : cru, prix : 0€).`)
        } else {
            console.log("Le bol est vide, rien à mélanger !");
            
        }
    }
}







let bol = new Bol();
bol.contenu.push(oignon, oeuf, fromage);
console.log("Contenu du bol avant mélange :", bol.contenu);
bol.melanger("omelette");
console.log("Contenu du bol après mélange :", bol.contenu);
let maison = new Lieu("maison");
let epicerie = new Lieu("épicerie");
let rayan = new Personnage("Rayan", maison, 20);
maison.personnes.push(rayan);
let couteau = new Outil("couteau", "couper");
let mouleur = new Outil("mouleur", "moudre");
let poele = new Poele("poêle");
let oignon = new Ingredient("oignon", "entier", 2);
let oeuf = new Ingredient("oeuf", "entier", 4);
let epice = new Ingredient("epice", "moulu", 3.25);
let fromage = new Ingredient("fromage", "coupé", 1.6);
epicerie.ingredients = [oignon, oeuf, epice, fromage];
epicerie.paniers = [
    { type: "panier", contenu: [] },
    { type: "panier", contenu: [] }
];
let bol = new Bol();
bol.contenu.push(oignon, oeuf, fromage);
console.log("Contenu du bol avant mélange :", bol.contenu);
bol.melanger("omelette");
console.log("Contenu du bol après mélange :", bol.contenu);
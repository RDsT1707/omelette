// CLASSES

class Personnage {
    constructor(nom, lieu, argent) {
        this.nom = nom;  // Nom du personnage
        this.lieu = lieu;  // Lieu où se trouve le personnage
        this.argent = argent;  // Argent du personnage
        this.mainDroite = [{ type: "panier", contenu: [] }];  // Initialisation du panier dans la main droite
        this.mainGauche = [];  // Main gauche vide
    }

    seDeplacer(nouveauLieu) {
        console.log(`${this.nom} se déplace de ${this.lieu.nom} à ${nouveauLieu.nom}.`);
        
        // Déplacer le personnage vers le nouveau lieu
        this.lieu = nouveauLieu;  // Le personnage change de lieu
        nouveauLieu.personnes.push(this);  // Le personnage est ajouté à la liste des personnes du nouveau lieu

        // Gérer le panier quand le personnage entre à l'épicerie
        if (nouveauLieu.nom === "épicerie") {
            if (this.mainDroite[0].contenu.length > 0) {
                // Si le personnage a un panier, il le rend à l'épicerie
                console.log(`${this.nom} a un panier et le rend à l'épicerie.`); 
                let panier = this.mainDroite[0];  // On garde le panier
                nouveauLieu.paniers.push(panier);  // On le remet dans les paniers de l'épicerie
                this.mainDroite[0] = { type: "panier", contenu: [] };  // On vide la main droite
            } else {
                // Si le personnage n'a pas de panier, il en reçoit un de l'épicerie
                let panierDisponible = nouveauLieu.paniers.shift();  // Prend un panier de l'épicerie
                console.log(`${this.nom} entre sans panier et reçoit un panier de l'épicerie.`);
                this.mainDroite[0] = panierDisponible;  // Ajoute le panier à la main droite
            }
        }
    }

    payerArticle(article) {
        if (this.argent >= article.prix) {
            this.argent -= article.prix;  // Enlève le prix de l'article de l'argent du personnage
            console.log(`${article.nom} a été acheté pour ${article.prix}€. Il reste ${this.argent}€.`);
        } else {
            console.log(`${this.nom} n'a pas assez d'argent pour acheter ${article.nom}. Il a seulement ${this.argent}€.`);
        }
    }
    
    couper(ingredient, outil) {
        if (outil.nom === "couteau" && ingredient.etat === "entier") {
            ingredient.etat = "coupé";  // Change l'état de l'ingrédient en coupé
            console.log(`${this.nom} a coupé ${ingredient.nom} avec ${outil.nom}.`);
        } else {
            console.log(`${this.nom} ne peut pas couper ${ingredient.nom}.`);
        }
    }
}

class Lieu {
    constructor(nom) {
        this.nom = nom;  // Nom du lieu
        this.personnes = [];  // Liste des personnes présentes dans ce lieu
    }
}

class Outil {
    constructor(nom, action) {
        this.nom = nom;  // Nom de l'outil
        this.action = action;  // Action que l'outil peut réaliser
    }
}

class Ingredient {
    constructor(nom, etat, prix) {
        this.nom = nom;  // Nom de l'ingrédient
        this.etat = etat;  // État de l'ingrédient (entier, coupé, etc.)
        this.prix = prix;  // Prix de l'ingrédient
    }
}

class Poele {
    constructor(nom) {
        this.nom = nom;  // Nom de la poêle
        this.contenu = [];  // Contenu de la poêle (les aliments à cuire)
    }

    cuire() {
        if (this.contenu.length > 0) {
            console.log(`Cuisson en cours de ${this.contenu[0].nom}...`);
            setTimeout(() => {
                this.contenu[0].etat = "cuit";  // L'état de l'ingrédient change à "cuit"
                console.log(`${this.contenu[0].nom} est maintenant cuit !`);
                this.contenu = [{ nom: "omelette", etat: "cuit" }];  // La poêle contient une omelette cuite
            }, 4000);
        } else {
            console.log("Il n'y a rien dans la poêle à cuire.");
        }
    }
}

class Bol {
    constructor() {
        this.contenu = [];  // Contenu du bol
    }

    melanger(nomDuMelange) {
        if (this.contenu.length > 0) {
            console.log(`Mélange des ingrédients ${nomDuMelange}...`);
            this.contenu = [{  // Crée un mélange d'ingrédients
                nom: nomDuMelange,
                etat: "cru",
                prix: 0
            }];
            console.log(`Le mélange est prêt : ${nomDuMelange} (état : cru, prix : 0€).`);
        } else {
            console.log("Le bol est vide, rien à mélanger !");
        }
    }
}

// Création des objets : lieux, outils, ingrédients, et personnage
let maison = new Lieu("maison");
let epicerie = new Lieu("épicerie");
let couteau = new Outil("couteau", "couper");
let mouleur = new Outil("mouleur", "moudre");
let poele = new Poele("poêle");
let bol = new Bol();

let oignon = new Ingredient("oignon", "entier", 2);
let oeuf = new Ingredient("oeuf", "entier", 4);
let epice = new Ingredient("epice", "moulu", 3.25);
let fromage = new Ingredient("fromage", "coupé", 1.6);

let rayan = new Personnage("Rayan", maison, 20);  // Création de Rayan
maison.personnes.push(rayan);  // Rayan est dans la maison

// Ajout des ingrédients à l'épicerie
epicerie.ingredients = [oignon, oeuf, epice, fromage];
// Création des paniers à l'épicerie
epicerie.paniers = [
    { type: "panier", contenu: [] },
    { type: "panier", contenu: [] }
];

epicerie.personnes.push(rayan);  // Rayan est aussi dans l'épicerie
maison.personnes.push(rayan);  // Il est aussi dans la maison

// Affiche où est Rayan
console.log(rayan.nom + " est actuellement à la " + rayan.lieu.nom + ".");

// **Rayan se déplace vers l'épicerie**
rayan.seDeplacer(epicerie);
console.log(rayan.nom + " est actuellement à la " + rayan.lieu.nom + ".");

// **Il prend les ingrédients de l'épicerie**
epicerie.ingredients.forEach(ingredient => {
    console.log(`${rayan.nom} prend un ${ingredient.nom} et le met dans le panier.`);
    rayan.mainDroite[0].contenu.push(ingredient);  // Met les ingrédients dans son panier
});

// **Passage en caisse**
console.log("\n--- Passage en caisse ---\n");
rayan.mainDroite[0].contenu.forEach(ingredient => {
    rayan.payerArticle(ingredient);  // Rayan paye chaque ingrédient
});

// **Retour à la maison**
rayan.seDeplacer(maison);
console.log(rayan.nom + " est rentré à la " + rayan.lieu.nom + ".");

// **Mettre les ingrédients dans le bol**
rayan.mainDroite[0].contenu.forEach(ingredient => {
    // Enlève l'ingrédient du panier à l'épicerie
    epicerie.paniers[0].contenu = epicerie.paniers[0].contenu.filter(item => item !== ingredient);

    bol.contenu.push(ingredient);  // Met l'ingrédient dans le bol
    console.log(`${rayan.nom} met ${ingredient.nom} dans le bol.`);
});

// Affiche ce qu'il reste dans le panier et ce qui est dans le bol
console.log("\nIngrédients restant dans le panier :", epicerie.paniers[0].contenu);
console.log("\nIngrédients dans le bol :", bol.contenu);

// **Retourner à l'épicerie pour rendre le panier**
rayan.seDeplacer(epicerie);
console.log(rayan.nom + " est actuellement à la " + rayan.lieu.nom + ".");

// **Retourner à la maison après avoir rendu le panier**
rayan.seDeplacer(maison);
console.log(rayan.nom + " est rentré à la " + rayan.lieu.nom + ".");


// Verifier les ingredient entier et les couper avec la methode 

// Vérifie chaque ingrédient dans le bol et le coupe seulement s'il est entier
bol.contenu.forEach(ingredient => {
    if (ingredient.etat === "entier") {
        rayan.couper(ingredient, couteau);  // Si l'ingrédient est entier, Rayan peut le couper
    } else {
        console.log(`${ingredient.nom} est déjà ${ingredient.etat}, il ne peut pas être coupé.`);  // Sinon, il ne peut pas être coupé
    }
});

// Affiche l'état des ingrédients après la coupe
console.log("Ingrédients après vérification et coupé : ", bol.contenu);

bol.melanger("omelette");  // Mélange les ingrédients et donne le nom "omelette"
console.log("Mélange effectué, l'omelette est prête à cuire.");

// Vider le bol dans la poêle, il ne doit plus rien avoir dans le bol
poele.contenu.push(bol.contenu[0]);  // Met le mélange (omelette) dans la poêle
bol.contenu = [];  // Vide le bol

console.log("Le contenu du bol a été mis dans la poêle.");

// Cuire l'omelette avec la méthode de la poêle
poele.cuire();  // La cuisson se fait ici, avec un message après un délai

// Affiche un message final une fois l'omelette cuite
setTimeout(() => {
    console.log("Notre omelette est cuite :)");
}, 5000);  // Attendre 5 secondes pour simuler la cuisson de l'omelette


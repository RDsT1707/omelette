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

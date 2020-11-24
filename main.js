// Création du contexte
let c = document.getElementById('idCanvas');
let contexte = c.getContext("2d");

// Taille d'un pixel
let resolution = 50;

// Récupération de la largeur et hauteur d'un pixel de la grille
let largeur = c.width/resolution;
let hauteur = c.height/resolution;

// Création de la grille
let tableau = new Array(largeur);// Je créer un tableau pour construire ma grille

for(var i = 0; i < tableau.length; i++){
    // Pour chaque index de mon tableau on créer un nouveau tableau
    tableau[i] = new Array(hauteur);
}

// Fonction création d'un rectangle blanc sur tout le canvas
function renitialiser() {

    contexte.beginPath();
    contexte.fillStyle = "white";
    contexte.rect(0, 0, c.width, c.height);
    contexte.fill();
}

// Objet serpent
function Serpent() {
    // position du serpent
    this.x = 0;
    this.y = 0;
    // vitesse du serpent
    this.xVitesse = 0;
    this.yVitesse = 0;

    // On dessine le serpent, pour ça on a besoin des coordonnées en largeur et en hauteur
    this.dessinerSerpent = function() {

        contexte.beginPath();

        contexte.rect(this.x, this.y, resolution, resolution);

        // Couleur du serpent
        contexte.fillStyle = "#f1c40f";
        contexte.fill();
    }

    // Fonction qui va mettre à jour la position du serpent
    this.miseAJour = function() {

        this.x += this.xVitesse;
        this.y += this.yVitesse;
    }

}

// J'instancie un nouvelle objet Serpent
let serpent = new Serpent();

// Fonction keyboard qui va prendre en entrer l'évènement, test de la valeur de la touche clavier tapée, on lui attache un écouteur d'évènement
document.addEventListener('keydown', keyboard);

function keyboard(evt) {

    switch(evt.keyCode) {
        case 37:
            // touche gauche
            serpent.xVitesse = -resolution;
            serpent.yVitesse = 0;
            console.log("gauche");
            break;
        case 38:
            // touche haut
            serpent.xVitesse = 0
            serpent.yVitesse = -resolution;
            console.log("haut");
            break;
        case 39:
            // touche droite
            serpent.xVitesse = resolution;
            serpent.yVitesse = 0;
            console.log("droite");
            break;
        case 40:
            // touche bas
            serpent.xVitesse = 0;
            serpent.yVitesse = resolution;
            console.log("bas");
            break;
        case 32:
            // touche espace
            serpent.xVitesse = 0;
            serpent.yVitesse = 0;
            console.log("espace");
            break;
    }
}

const SNAKE_SPEED = 4;

let lastRenderTime = 0;

window.requestAnimationFrame(main);

function main(currentTime) {

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    // J'appelle ma fonction qui créer un carré blanc
    renitialiser();

    // Met à jour la position du serpent sur le canvas
    serpent.miseAJour();

    // On dessine le serpent
    serpent.dessinerSerpent();

};

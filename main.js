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

    // On insère la valeur de x et de y dans le tableau, corps du serpent, le serpent doit avoir un corps, le corps du serpent correspondra à un tableau, il suffira à chaque fois d'insérer la dernière position et supprimer la plus ancienne via un push
    this.corps = [
        {x:0, y:0},//x position 0
        {x:50, y:0},//x position 1
        {x:100, y:0}//x position 2
    ];
    
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

// le joueur à la fin de la partie à son score qui revient à 0
function resetScore() {

    score = 0;
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

// Objet pomme
function Pomme() {

    // position de la pomme
    this.pommeX = 0;
    this.pommeY = 0;

    // modification coordonne pomme
    this.modificationCoordonnéePomme = function() {

        this.pommeX = Math.floor(Math.random() * (13 - 0)) + 0;
        this.pommeY = Math.floor(Math.random() * (13 - 0)) + 0;

        this.pommeX *= resolution;
        this.pommeY *= resolution;
    }

    // affichage de la pomme
    this.dessinerPomme = function() {

        contexte.beginPath();
        contexte.fillStyle = 'red';
        contexte.rect(this.pommeX, this.pommeY, resolution, resolution);
        contexte.fill();
    }
}

// J'instancie un nouvelle objet Pomme
let pomme = new Pomme();

// Détection du serpent quand il sera sur la pomme
function detectionCollisionSerpentSurPomme() {

    // si le x de la pomme et égale au x du serpent et si le y du serpent est égale au y de la pomme
    if(serpent.x == pomme.pommeX && serpent.y == pomme.pommeY) {

        // je fais grossir le corps du serpent en ajoutant au tableau corps du serpent les coordonnées de la pomme
        serpent.corps.push({x:pomme.pommeX, y:pomme.pommeY});

        // j'appelle la méthode modificationCoordonnéePomme
        pomme.modificationCoordonnéePomme();

        // le score augmente de 1 à chaque fois que le serpent touche la pomme
        score++;

    }
}

// Rénitialiser la position initiale du serpent
function rénitialiserPositionSerpent() {

    // position du serpent à 0
    serpent.x = 0;
    serpent.y = 0;

    // vitesse du serpent à 0
    serpent.xVitesse = 0;
    serpent.yVitesse = 0;
}

// Détection du serpent quand il touchera les bord du caneva
function detectionCollisionSerpentSurCanvas() {

    // si la tête du serpent est supérieur ou égale à la longueur du caneva et si la tête du serpent est supérieur ou égale à la hauteur du caneva
    if(serpent.x >= largeur*resolution || serpent.y < 0 ||  serpent.x < 0 || serpent.y >= hauteur*resolution) {

        // alors on appelle la position initiale du serpent
        rénitialiserPositionSerpent();
        
        // on reset le score du joueur à 0
        resetScore();
        
    }

}

// variable du score
let score = 0;

// Vitesse du jeu
const SNAKE_SPEED = 10;

let lastRenderTime = 0;

window.requestAnimationFrame(main);

// Boucle du jeu
function main(currentTime) {

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    // J'appelle ma fonction qui créer un carré blanc
    renitialiser();

    // Affichage du score en haut au milieu du canvas
    contexte.fillStyle = "black";
    contexte.font = "50px serif";
    contexte.fillText(score, 350, 50);

    // Met à jour la position du serpent sur le canvas
    serpent.miseAJour();

    // On dessine le serpent
    serpent.dessinerSerpent();

    // Détection collision entre le serpent et le canva
    detectionCollisionSerpentSurCanvas();

    // Détection collision entre le serpent et la pomme
    detectionCollisionSerpentSurPomme()

    // On dessine la pomme
    pomme.dessinerPomme();

};

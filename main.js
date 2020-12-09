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
    //this.x = 0;
    //this.y = 0;

    // vitesse du serpent
    this.xVitesse = resolution;
    this.yVitesse = 0;

    // On insère la valeur de x et de y dans le tableau, corps du serpent, le serpent doit avoir un corps, le corps du serpent correspondra à un tableau, il suffira à chaque fois d'insérer la dernière position et supprimer la plus ancienne via un push
    this.corps = [
        {x:50, y:50},//x position 0
        {x:100, y:50},// x position 1
        {x:150, y:50}//x position 2
    ];
    
    // On dessine le serpent, pour ça on a besoin des coordonnées en largeur et en hauteur
    this.dessinerSerpent = function() {

        contexte.beginPath();

        for(var i = 0; i < this.corps.length; i++) {

            // Couleur du serpent
            contexte.fillStyle = "#f1c40f";
            contexte.rect(this.corps[i].x, this.corps[i].y, resolution, resolution);
            contexte.fill();
            
        }

    }

    // Fonction qui va mettre à jour la position du serpent
    this.miseAJour = function() {

       for(var i = 0; i < this.corps.length-1; i++) {

          this.corps[i].x = this.corps[i+1].x;
          this.corps[i].y = this.corps[i+1].y;
       }

        this.corps[this.corps.length-1].x += this.xVitesse;
        this.corps[this.corps.length-1].y += this.yVitesse;

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
            break;
        case 38:
            // touche haut
            serpent.xVitesse = 0
            serpent.yVitesse = -resolution;
            break;
        case 39:
            // touche droite
            serpent.xVitesse = resolution;
            serpent.yVitesse = 0;
            break;
        case 40:
            // touche bas
            serpent.xVitesse = 0;
            serpent.yVitesse = resolution;
            break;
        case 32:
            // touche espace
            serpent.xVitesse = 0;
            serpent.yVitesse = 0;
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

pomme.modificationCoordonnéePomme();

// Détection du serpent quand il sera sur la pomme
function detectionCollisionSerpentSurPomme() {

    // si le x de la pomme et égale au x du serpent et si le y du serpent est égale au y de la pomme
    if(serpent.corps[serpent.corps.length -1].x == pomme.pommeX && serpent.corps[serpent.corps.length -1].y == pomme.pommeY) {

        // je fais grossir le corps du serpent en ajoutant au corps du serpent les coordonnées de la pomme
        serpent.corps.push({x:pomme.pommeX, y:pomme.pommeY});

        // j'appelle la méthode modificationCoordonnéePomme
        pomme.modificationCoordonnéePomme();

        // le score augmente de 1 à chaque fois que le serpent touche la pomme
        score++;

    }
}

// Rénitialiser la position initiale du serpent
function rénitialiserPositionSerpent() {

    // position corps du serpent revenu à l'initial
    serpent.corps = [
        {x:50, y:50},
        {x:100, y:50},
        {x:150, y:50}
    ];

    // vitesse du serpent à 0
    serpent.xVitesse = 0;
    serpent.yVitesse = 0;
}

// Détection du serpent quand il touchera les 4 bord du caneva, ainsi que le serpent lui-même
function detectionCollisionSerpentSurCanvas() {

    // si la tête du serpent est supérieur ou égal au bord à droite du caneva
    if(serpent.corps[serpent.corps.length-1].x >= largeur*resolution) {

        console.log("Droite");
        // alors on appelle la position initiale du serpent
        rénitialiserPositionSerpent();

        // on reset le score du joueur à 0
        resetScore();
    }

    // si la tête du serpent est inférieur à 0 au bord gauche du caneva
    else if(serpent.corps[serpent.corps.length-1].x < 0) {

        console.log("Gauche");
        // alors on appelle la position initiale du serpent
        rénitialiserPositionSerpent();

        // on reset le score du joueur à 0
        resetScore();
    }

    // si la tête du serpent est supérieur ou égal au bord en bas du caneva
    else if(serpent.corps[serpent.corps.length-1].y >= hauteur*resolution) {

        console.log("Bas")
        // alors on appelle la position initiale du serpent
        rénitialiserPositionSerpent();

        // on reset le score du joueur à 0
        resetScore();
    }

    // si la tête du serpent est inférieur à 0 au bord haut du caneva
    else if(serpent.corps[serpent.corps.length-1].y < 0) {

        console.log("Haut");
        // alors on appelle la position initiale du serpent
        rénitialiserPositionSerpent();

        // on reset le score du joueur à 0
        resetScore();
    }

    // On parcours le corps du serpent
    for(var i = 0; i < serpent.corps.length -1; i++) {
        // Si à chaque indice la tête du serpent est égal à l'indice du corps ou le serpent est passé
        if(serpent.corps[serpent.corps.length -1].x === serpent.corps[i].x && serpent.corps[serpent.corps.length -1].y === serpent.corps[i].y) {

            // alors on appelle la position initiale du serpent
            rénitialiserPositionSerpent();

            // on reset le score du joueur à 0
            resetScore();
        }
    }
        
       
}


// variable du score
let score = 0;

// le joueur à la fin de la partie à son score qui revient à 0
function resetScore() {

    score = 0;
}

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

    // Détection collision entre le serpent et le canvas
    detectionCollisionSerpentSurCanvas();

    // Détection collision entre le serpent et la pomme
    detectionCollisionSerpentSurPomme();

    // On dessine la pomme
    pomme.dessinerPomme();

};

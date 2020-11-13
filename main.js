// Création du contexte
var c = document.getElementById('idCanvas');
var contexte = c.getContext("2d");

// Taille d'un pixel
var resolution = 50;

// Récupération de la largeur et hauteur d'un pixel de la grille
var largeur = c.width/resolution;
var hauteur = c.height/resolution;

// Création de la grille
var tableau = new Array(largeur);// Je créer un tableau pour construire ma grille

for(var i = 0; i < tableau.length; i++){
    // Pour chaque index de mon tableau on créer un nouveau tableau
    tableau[i] = new Array(hauteur);
}

// Je parcours tout mon tableau en largeur
for(var i = 0; i < tableau.length; i++) {
    // Je parcours mon tableau en hauteur
    for(var j = 0; j < tableau[i].length; j++) {

        contexte.beginPath();
        // Création du rectangle largeur*50, hauteur*50
        contexte.rect(i*resolution, j*resolution, resolution, resolution);
        contexte.fillStyle = "#fff";
        contexte.fill();
        contexte.stroke();
    }
}
// +++++++++++++++++++EXO1+++++++++++++++++++


// recupere les elements html

const square = document.getElementById("carre");
const style = window.getComputedStyle(square);
// rajoute la detection du clic sur l'element voulu
square.addEventListener("click", infosCarre);

// affiche les proptiétées CSS du carré
function infosCarre() {
  alert(`class : carre
    - background color : ${style.backgroundColor}
    - color : ${style.color}
    - height : ${style.height}
    - width : ${style.width}
    - display : ${style.display}`);
}

// +++++++++++++++++++++EXO2+++++++++++++++++++++++
// recupere les elements html
const vassal1 = document.getElementById("carreUn");
const vassal2 = document.getElementById("carreDeux");
const vassal3 = document.getElementById("carreTrois");
const vassal4 = document.getElementById("carreQuatre");

const boss = document.getElementById("carreBoss");
const rgb = document.getElementById("infoBoss");

// rajoute la detection du clic sur les elements recupérés
vassal1.addEventListener("click", function () {
  changeColor(vassal1);
});

vassal2.addEventListener("click", function () {
  changeColor(vassal2);
});

vassal3.addEventListener("click", function () {
  changeColor(vassal3);
});

vassal4.addEventListener("click", function () {
  changeColor(vassal4);
});

// change la couleur du carré Boss en fonction du carré cliqué
function changeColor(vassal) {
  let styleVassal = getComputedStyle(vassal);
  boss.style.backgroundColor = styleVassal.backgroundColor;
  rgb.innerHTML = `${styleVassal.backgroundColor}`;
  // console.log(`${styleVassal.backgroundColor}`)
}

// +++++++++++++++++++EXO3++++++++++++++++++++

// recuperation des carrés dans l'html
const carres = document.querySelectorAll(".carre");

// ajout de la detection de clic sur chaque carré
carres.forEach((carre) => {
  carre.addEventListener("click", interact);
});

// une fois cliqué, le carré verra sa classe CSS echangée par une autre
function interact() {
  this.classList.toggle("carreTransformed");
}

// ++++++++++++++++++EXO4++++++++++++++++++++++++++

// recuperation des elements HTML
const socials = document.querySelectorAll(".social");
const wrap = document.getElementById("wrapper");

// ajout de la detection des clics sur tous les socials
socials.forEach((social) => {
  social.addEventListener("click", select);
});

// l'element cliqué verra sa classe etre intervertie par une autre et donnera sa couleur de fond au wrapper, un seconc clic inversera l'action
function select() {
  this.classList.toggle("socialInterracted");
  let paint = getComputedStyle(this);

  if (this.classList.contains("socialInterracted")) {
    wrap.style.backgroundColor = paint.backgroundColor;
  } else {
    wrap.style.backgroundColor = "rgb(64 126 217)";
  }
}

// ++++++++++++++++++++EXO5++++++++++++++++++++++++++++++

// Charge les citations depuis le localStorage ou utilise les valeurs par défaut
const storedQuotes =
  JSON.parse(localStorage.getItem("favoriteQuotes")) || quotes;

//   recupere mon tableau de quotes
import quotes from "./quotes.js";

// recuperation des elements html
const quoteCards = document.querySelector("#quoteCards");
const quoteCard = document.querySelector(".quoteCard");

// affichage des citations
function displayQuotes(array) {

  // creation d'une card par quote
  // Object.keys() renvoie un tableau contenant les noms des propriétés propres à un objet
  Object.keys(array).forEach((key) => {

    const newCard = quoteCard.cloneNode(true);
    const newArticle = newCard.querySelector("#quote");
    const newFav = newCard.querySelector(".fav i");

    // mise en forme de la citation
    newArticle.innerText = `"${array[key].quote}" 
    
    - ${key}`;

    // if (array[key].favorite) {
    //   newFav.classList.add("active");
    // }

    // ajout de la possibilité de la fav ou défav
    newCard.addEventListener("click", () => {
      console.log("Clic sur le bouton de favoris");
      array[key].favorite = !array[key].favorite;

      // juste pour verifier que le clic agit bien sur l'etat de la quote
      // console.log("État actuel des favoris :", array[key].favorite);

      newFav.classList.toggle("active", array[key].favorite);
      // stockage de la quote dans le localstorage
      localStorage.setItem("favoriteQuotes", JSON.stringify(array));
    });

    // ajout de la card fraichement créée dans la div parente
    quoteCards.appendChild(newCard);
  });
}

// displayQuotes(quotes);
// localStorage.clear();
displayQuotes(storedQuotes);

// ++++++++++++++++++++++++EXO6+++++++++++++++++++++++++++++

// initialisation des deux joueurs et declaration des combinaisons gagnantes (utilisées pour la fonction checkwin() )
const PLAYER_X_CLASS = "croix";
const PLAYER_O_CLASS = "rond";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// recuperation des elements html
const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const restartButton = document.getElementById("restartButton");

// declaration du tour, ici c'est les X qui commencent
let isPlayer_O_Turn = false;

startGame();

// quand le bouton restart est cliqué, ça demarre une nouvelle partie
restartButton.addEventListener("click", startGame);

// demarrage du jeu/remise à zéro de la grille
function startGame() {
  isPlayer_O_Turn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);
    cell.innerHTML = "";

    // possibilité de cliquer sur les cellules pour interagir et placer sa croix/son rond
    cell.addEventListener("click", gestionCellules, { once: true });
  });
  setBoardHoverClass();
}

// gère le clic sur une cellule, place le symbole du joueur, vérifie s'il y a une victoire ou un match nul, puis met à jour le tour et la classe de survol.
function gestionCellules(e) {
  const cell = e.target;

  // attribution de la classe du joueur actuel à la constante currentclass
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass);

  // verifie à chaque tour si le jeu doit se finir grâce aux fonctions checkwin() isDraw() et endgame()
  if (checkWin(currentClass)) {
    endGame(false);
    // cell.removeEventListener('click', gestionCellules)
  } else if (isDraw()) {
    endGame(true);
  } else {
    changerTour();
    afficherTour();
    setBoardHoverClass();
  }
}

// affiche une alerte indiquant si le jeu s'est terminé par un match nul ou une victoire
function endGame(draw) {
  if (draw) {
    alert("Egalité !");
  } else {
    alert(`Les ${isPlayer_O_Turn ? "RONDS" : "CROIX"} ont gagnés !`);
  }
}

// renvoie true si toutes les cellules sont remplies sans gagnant, sinon false
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(PLAYER_X_CLASS) ||
      cell.classList.contains(PLAYER_O_CLASS)
    );
  });
}

//   gestion de ce qui sera injecté dans la cellule, à savoir la couleur du joueur et son symbole ( X / O )
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerHTML = `<span style="font-size: 50px;">${
    isPlayer_O_Turn ? "O" : "X"
  }</span>`;
}

// ajoute la classe de hover correspondante au joueur actuel sur le tableau.
function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  if (isPlayer_O_Turn) {
    boardElement.classList.add(PLAYER_O_CLASS);
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
  }
}

// verification de si il y a un gagnant parmis nos deux joueurs
function checkWin(currentClass) {
  // some() teste si au moins un element du tableau passe le test implementé
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// alterne entre PLAYER_O_CLASS et PLAYER_X_CLASS
function changerTour() {
  isPlayer_O_Turn = !isPlayer_O_Turn;
}

// function afficherTour() {
//   if (isPlayer_O_Turn) {
//     alert("c'est au tour des RONDS");
//   } else {
//     alert("c'est au tour des CROIX");
//   }
// }

// ++++++++++++++++++++++++++EXO7+++++++++++++++++++++++++++++++


// recuperation de la grille dans l'html
const gridPixels = document.querySelector("#grid");

// ajout de la detection d'input du clavier
document.addEventListener('keydown', gestionPixels);

function gestionPixels(e) {
  // console.log(e.key);
  
  // creation d'une div et attribution de la classe pixel
  const newPixel = document.createElement("div");
  newPixel.classList.add("pixel");
  
  // attribution d'une couleur de fond prédéfinie (ici le noir)
  function toBlack() {
    newPixel.style.backgroundColor = "rgb(0 0 0)";
  }
  
  // attribution d'une couleur de fond random
  const setBg = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    newPixel.style.backgroundColor = "#" + randomColor;
  }
  
  // si fleche du haut, ajout de la div de couleur aleatoire dans la grille et si fleche du bas suppression de la div
  if (e.keyCode == '38' && gridPixels.childElementCount < 225) {
    e.preventDefault();
    gridPixels.appendChild(newPixel);
    setBg(newPixel);
  } 
  else if (e.keyCode == '40' && gridPixels.childElementCount > 0) {
    e.preventDefault();
    gridPixels.lastElementChild.remove();
  }

  // Ajout de la détection du clic sur chaque pixel
  newPixel.addEventListener("click", toBlack);

  // console.log(gridPixels.childElementCount);
}


// +++++++++++++++++++++++++EXO8+++++++++++++++++++++++++++++++++

var valeurAConvertir = document.getElementById("valeurEuro");
valeurAConvertir.addEventListener('input', getValue);

function getValue() {
  var valeur = parseFloat(valeurAConvertir.value);
  if (!isNaN(valeur)) {
    document.getElementById('converted').innerHTML = (`${(valeur * 6.55957).toFixed(2)} francs`);
  } else {
    document.getElementById('converted').innerHTML = "Entrée invalide";
  }
}

console.log(valeurAConvertir.value);


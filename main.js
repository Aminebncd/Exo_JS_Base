// +++++++++++++++++++EXO1+++++++++++++++++++

const square = document.getElementById("carre");
const style = window.getComputedStyle(square);

square.addEventListener("click", infosCarre);

function infosCarre() {
  alert(`class : carre
    - background color : ${style.backgroundColor}
    - color : ${style.color}
    - height : ${style.height}
    - width : ${style.width}
    - display : ${style.display}`);
}

// +++++++++++++++++++++EXO2+++++++++++++++++++++++

const vassal1 = document.getElementById("carreUn");
const vassal2 = document.getElementById("carreDeux");
const vassal3 = document.getElementById("carreTrois");
const vassal4 = document.getElementById("carreQuatre");

const boss = document.getElementById("carreBoss");
const rgb = document.getElementById("infoBoss");

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

function changeColor(vassal) {
  let styleVassal = getComputedStyle(vassal);
  boss.style.backgroundColor = styleVassal.backgroundColor;
  rgb.innerHTML = `${styleVassal.backgroundColor}`;
  // console.log(`${styleVassal.backgroundColor}`)
}

// +++++++++++++++++++EXO3++++++++++++++++++++

const carres = document.querySelectorAll(".carre");

carres.forEach((carre) => {
  carre.addEventListener("click", interact);
});

function interact() {
  this.classList.toggle("carreTransformed");
}

// ++++++++++++++++++EXO4++++++++++++++++++++++++++

const socials = document.querySelectorAll(".social");
const wrap = document.getElementById("wrapper");

socials.forEach((social) => {
  social.addEventListener("click", select);
});

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
  // creatien d'une card par quote
  Object.keys(array).forEach((key) => {
    const newCard = quoteCard.cloneNode(true);
    const newArticle = newCard.querySelector("#quote");
    const newFav = newCard.querySelector(".fav i");
    // mise en forme de la citation
    newArticle.innerText = `"${array[key].quote}" 
    
    - ${key}`;

    if (array[key].favorite) {
      newFav.classList.add("active");
    }

    // ajout de la possibilité de la fav ou défav
    newCard.addEventListener("click", () => {
      console.log("Clic sur le bouton de favoris");
      array[key].favorite = !array[key].favorite;
      console.log("État actuel des favoris :", array[key].favorite);

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

// initialisation des deux joueurs ainsi que des combinaisons gagnantes
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

  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
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

//   gestion de ce qui sera injecté dans la cellule
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
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function changerTour() {
  isPlayer_O_Turn = !isPlayer_O_Turn;
}

function afficherTour() {
  if (isPlayer_O_Turn) {
    alert("c'est au tour des RONDS");
  } else {
    alert("c'est au tour des CROIX");
  }
}

// ++++++++++++++++++++++++++EXO7+++++++++++++++++++++++++++++++

const grilleCases = document.querySelector("#cases");
const cases = document.querySelectorAll(".cases");

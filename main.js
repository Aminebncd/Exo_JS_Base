const square = document.getElementById('carre');
const style =  window.getComputedStyle(square);

square.addEventListener('click', infosCarre);

function infosCarre(){
alert (`class : carre
- background color : ${style.backgroundColor}
- color : ${style.color}
- height : ${style.height}
- width : ${style.width}
- display : ${style.display}`)

}

const vassal1 = document.getElementById("carreUn");
const vassal2 = document.getElementById("carreDeux");
const vassal3 = document.getElementById("carreTrois");
const vassal4 = document.getElementById("carreQuatre");

const boss = document.getElementById("carreBoss");

vassal1.addEventListener('click', changeColor(vassal1));
vassal2.addEventListener('click', changeColor(vassal2));
vassal3.addEventListener('click', changeColor(vassal3));
vassal4.addEventListener('click', changeColor(vassal4));

changeColor(vassal){
    boss.style.backgroundColor = vassal.style.backgroundColor;
}


// boss.style.backgroundColor = 
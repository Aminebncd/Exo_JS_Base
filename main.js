const square = document.getElementById('carre');
const style =  window.getComputedStyle(square);
const rgb = document.getElementById('infoBoss');

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


vassal1.addEventListener('click', function() {
    changeColor(vassal1)
});

vassal2.addEventListener('click', function() {
    changeColor(vassal2)
});

vassal3.addEventListener('click', function() {
    changeColor(vassal3)
});

vassal4.addEventListener('click', function() {
    changeColor(vassal4)
});

function changeColor(vassal){
   styleVassal = getComputedStyle(vassal)
    boss.style.backgroundColor = styleVassal.backgroundColor;
    rgb.value = styleVassal.Color

}

// boss.style.backgroundColor = vassal1.getComputedStyle();

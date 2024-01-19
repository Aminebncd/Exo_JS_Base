
// +++++++++++++++++++EXO1+++++++++++++++++++

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




// +++++++++++++++++++++EXO2+++++++++++++++++++++++

const vassal1 = document.getElementById("carreUn");
const vassal2 = document.getElementById("carreDeux");
const vassal3 = document.getElementById("carreTrois");
const vassal4 = document.getElementById("carreQuatre");

const boss = document.getElementById("carreBoss");
const rgb = document.getElementById('infoBoss');


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
    rgb.innerHTML = (`${styleVassal.backgroundColor}`)
    // console.log(`${styleVassal.backgroundColor}`)
}




// +++++++++++++++++++EXO3++++++++++++++++++++

const carres = document.querySelectorAll(".carre");


carres.forEach((carre) => {
    carre.addEventListener("click", interact)
})

function interact(){
    this.classList.toggle('carreTransformed')
}





// ++++++++++++++++++EXO4++++++++++++++++++++++++++

const socials = document.querySelectorAll(".social");
const wrap = document.getElementById('wrapper');


socials.forEach((social) => {
    social.addEventListener("click", select)
})


function select(){

    this.classList.toggle('socialInterracted')
    paint = getComputedStyle(this)

    if (this.classList.contains('socialInterracted')){
        wrap.style.backgroundColor = paint.backgroundColor
    } else{
        wrap.style.backgroundColor = ('rgb(17, 25, 37)')
    }

}


// ++++++++++++++++++++EXO5++++++++++++++++++++++++++++++
// import {quotes} from quotes.js



// const quoteCards = document.querySelector(".quoteCards")
// const quoteCard = document.querySelector(".quoteCard")
    



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

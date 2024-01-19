


var quotes = {
    "Ibn Battuta":"Traveling - it leaves you speechless, then turns you into a storyteller.",

    'Ibn Rushd':'Ignorance leads to fear, fear leads to hate, and hate leads to violence. This is the equation.',

    "Ibn Arabi":"The ignorant one does not see his ignorance as he basks in its darkness; nor does the knowledgeable one see his own knowledge, for he basks in its light"
};


const quoteCards = document.querySelector("#quoteCards")
const quoteCard = document.querySelector(".quoteCard")

Object.keys(quotes).forEach(key => {
    console.log(`"${quotes[key]}" -${key}`)
});

displayQuotes(quotes)

function displayQuotes(array) {
    
    Object.keys(array).forEach(key => {
        
        const newCard = quoteCard.cloneNode(true)
        const newArticle = newCard.querySelector("#quote")
        
        newArticle.innerText = (`"${array[key]}" - ${key}`) 

        quoteCards.appendChild(newCard)
        console.log(newArticle)
        
      });
    }


    

// const tasksContainer = document.querySelector("#todoCards");
// const taskCard = document.querySelector(".todoCard");

//     function addTask() {
//         const newTask = taskCard.cloneNode(true);
//         const newTextArea = newTask.querySelector(".task");
      
//         newTextArea.value = "Nouvelle tâche";

//         tasksContainer.appendChild(newTask);
//       }
      
    
   
 // Array Of Words
 /*
 const words = [
    "Hello",
     "Programming",
    "Code",
     "Javascript",
     "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
  ];
*/
const easyMode = [
    "Hello",
    "Code",
     "Town",
    "Github",
    "Python",
    "Scala",
    "Funny",
    "Task",
    "Test",
    "Rust",
  ];
const hardMode = [
    "Destructuring",
    "Documentation",
    "Internet",
    "Dependencies",
    "Paradigm",
    "Cascade",
    "Programming",
    "Javascript",
    "Youtube",
];
const normalMode =[
    "Roles",
    "Playing",
    "Runner",
    "Working",
    "Leetcode",
    "Linkedin",
    "Twitter",
    "Country",
    "Styling",
    "Coding",
    "Testing",
];
const lvls ={
    'Easy' : 5,
    'Normal' : 3,
    'Hard' : 2,
};
let defaultLevelName;


function SelectLevel(){
    defaultLevelNameWelcomePage =JSON.parse(sessionStorage.getItem('array'))[0].Level ;
        if(defaultLevelNameWelcomePage == '0'){
            defaultLevelName = 'Hard'
        }
        else if (defaultLevelNameWelcomePage == '1'){
            defaultLevelName = 'Normal'
        }
        else {
            defaultLevelName = 'Easy'
        }

    console.log(defaultLevelName);  
}
SelectLevel()
// Default Level 
// let defaultLevelName = 'Normal'; // change level from here 
let words = defaultLevelNameWelcomePage == 0 ? hardMode :defaultLevelNameWelcomePage == 1 ? normalMode : defaultLevelNameWelcomePage == 2 ? easyMode : false ;

let defaultLevelSeconds= lvls[defaultLevelName];
// Catch Selectors 
let startButton  =document.querySelector('.start');
let  lvlNameSpan =document.querySelector('.message .lvl');
let  secondsSpan =document.querySelector('.message .seconds');
let  theWord =document.querySelector('.the-word ');
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");


let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");

let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML =defaultLevelName;

if (scoreGot.innerHTML == 0){
    let f= defaultLevelSeconds + 3 ;
    timeLeftSpan.innerHTML = f;
    secondsSpan.innerHTML = f;
}
else{
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    secondsSpan.innerHTML = defaultLevelSeconds;
}
scoreTotal.innerHTML = words.length

scoreTotal.innerHTML = words.length;
//Disable past event
input.onpast = function(){
    return false
}

input.onpaste = function () {
    return false;
  }
if(words == hardMode){
    input.style.cssText='text-transform: none;'
}
//Start Game
startButton.addEventListener('click',function(){
    this.remove();
    input.focus()
    //Generate Word Function 
    genWords()
});

function genWords(){
    if (scoreGot.innerHTML == 0){
        let f= defaultLevelSeconds + 3 ;
        timeLeftSpan.innerHTML = f;
        secondsSpan.innerHTML = f;
    }
    else{
        timeLeftSpan.innerHTML = defaultLevelSeconds;
        secondsSpan.innerHTML = defaultLevelSeconds;
    }    //Get Random Words From Array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //Get word Index
    let wordIndex= words.indexOf(randomWord);
    //Remove Word From Array
    words.splice(wordIndex,1);
     //Show the random word
     console.log(randomWord)
     theWord.innerHTML = randomWord

    //Empty upcoming words
    upcomingWords.innerHTML = '';
    //Generate Upcoming Words
    for (let i = 0 ; i< words.length ; i++){
        //Create Div element
        let div = document.createElement('div');
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div)
    }
    //call Start Play Function
    startPlay();
}
 

function startPlay(){
    let start = setInterval(()=>{
  
         timeLeftSpan.innerHTML--;
   
        if (timeLeftSpan.innerHTML == 0 ){
            clearInterval(start);
            //Compare Words
            if(theWord.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()){
                //Empty Input filed
                input.value = '';
                //Increase Score 
                scoreGot.innerHTML ++;
                if(words.length > 0){
                    // Call Generate Word Function
                    genWords();
                }
                else{
                let span =document.createElement('span');
                span.className ='good';
                let spanText = document.createTextNode('Good Job');
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                //remove upcoming 
                upcomingWords.remove();
                setInLocalStorege(scoreGot.innerHTML);
                let winPop =`
                <div class="popWin">
                <h5>
                  Gj
                </h5>
                <button class="restGame">Restart</button>
                </div> 
                `
               
                document.querySelector('.container').innerHTML= winPop;
                document.querySelector('.restGame').addEventListener('click',()=>{
                    location.reload();
                })
                }
            }else{
                let span =document.createElement('span');
                // span.className ='bad';
                // let spanText = document.createTextNode('Game Over');
                // span.appendChild(spanText);
                // finishMessage.appendChild(span);
                setInLocalStorege(scoreGot.innerHTML);
                let overPop =`
                <div class="popOver">
                <h5>
                  Game Over
                </h5>
                <button class="restGame">Restart</button>
                </div>
                `;
                document.querySelector('.container').innerHTML= overPop;
                document.querySelector('.restGame').addEventListener('click',()=>{
                    location.reload();
                })
            }
        }
    },1000);
    
}

function setInLocalStorege(score){
    let myContainer  ;
    if(localStorage.score != null){
        myContainer = JSON.parse(localStorage.score)
    }
    else{
     dataPro = []
    }
   currentDate  =  new Date(Date.now());
    let MyObject ={
        Score: score , 
        date : currentDate.toString()
    }
    myContainer.push(MyObject);
    console.log(myContainer)
    localStorage.setItem('score',JSON.stringify(myContainer))
    myContainer = JSON.parse(localStorage.getItem('score'))

}


/* To do 
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date 'Done'
  ---- [02] Choose Levels From Select Box Done
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level Done
  ---- [05] Write Game Instruction With Dynamic Values Done
  ---- [06] Add 3 Seconds For The First Word Done 
*/

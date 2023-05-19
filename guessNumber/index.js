let computerGuess;
let userGuess=[];
let maxGuess;
let audio=new Audio('./audio/music.wav');
const intit=()=>{
    computerGuess=Math.floor(Math.random()*100);
    document.getElementById("newGameButton").style.display='none';
    document.getElementById("gameArea").style.display='none';
};
const newGameBegin=()=>{
    audio.play();
    window.location.reload();
}
const startGame=()=>{
    document.getElementById("welcomeScreen").style.display='none';
    document.getElementById("gameArea").style.display='block';
}
const startNewGame=()=>{
    document.getElementById("newGameButton").style.display='inline';
    document.getElementById("inputBox").style.display='none';
    // document.getElementById("inputBox").setAttribute("disabled",true);
}
const compareGuess=()=>{
    audio.play();
    const userNumber=Number(document.getElementById("inputBox").value);
    userGuess=[...userGuess,userNumber];
    document.getElementById('guesses').innerHTML=userGuess;

    if(userGuess.length<maxGuess){
        if(userNumber>computerGuess){
            document.getElementById("textOutput").innerHTML="Your guess is high";
            document.getElementById("inputBox").value="";
        }
        else if(userNumber<computerGuess){
            document.getElementById("textOutput").innerHTML="Your guess is low";
            document.getElementById("inputBox").value="";
        }
        else{
            document.getElementById("textOutput").innerHTML="Awesome Correct Guess";
            document.getElementById("inputBox").value="";
            startNewGame();
        }
    }
    else{
        if(userNumber>computerGuess){
            document.getElementById("textOutput").innerHTML=`You Loose!! correct number was ${computerGuess}`;
            startNewGame();
        }
        else if(userNumber<computerGuess){
            document.getElementById("textOutput").innerHTML=`You Loose!! correct number was ${computerGuess}`;
            startNewGame();
        }
        else{
            document.getElementById("textOutput").innerHTML="Awesome Correct Guess";
            
            startNewGame();
        }
    }

    document.getElementById('attempts').innerHTML=userGuess.length;
}
const easyMode=()=>{
    audio.play();
    maxGuess=10;
    startGame();
};

const hardMode=()=>{
    audio.play();
    maxGuess=5;
    startGame();
};
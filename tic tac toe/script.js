let turn="X";
let gameOver=false;
let bete=new Audio("betemoj.mp3");
let bruh=new Audio("bruh.mp3");
const changeTurn=()=>{
    return turn==="X"?"0":"X";
}
const checkWin=()=>{
    let boxtext=document.getElementsByClassName("boxtext");
    let wins=[[0,1,2,0,4,0],[3,4,5,0,14,0],[6,7,8,0,24,0],[0,3,6,15,10,90],[1,4,7,15,0,90],[2,5,8,15,-10,90],[0,4,8,10,10,45],[2,4,6,-10,10,-45]];
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText) && (boxtext[e[2]].innerText===boxtext[e[0]].innerText) && boxtext[e[0]].innerText!==""){
            bete.play();
            document.querySelector('.info').innerText=boxtext[e[0]].innerText+" Won";
            gameOver=true;
            document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width="23rem";
            document.querySelector(".line").style.transform=`rotate(${e[5]}deg) translate(${e[3]}vw , ${e[4]}vw)`;
            document.querySelector(".line").style.width="30vw";
        }
    })
}

let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext=element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(boxtext.innerText===""){
            boxtext.innerText=turn;
            turn=changeTurn();
            //audio
            bruh.play();
            checkWin();
            if(!gameOver){
                document.getElementsByClassName('info')[0].innerText="Turn for "+turn;
            }
        }
    })
})
reset.addEventListener('click',()=>{
    let boxtext=document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element=>{
        element.innerText="";
    })
    turn="X";
    gameOver=false;
    document.querySelector(".line").style.width="0vw";
    document.getElementsByClassName('info')[0].innerText="Turn for "+turn;
    document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width="0rem";
})
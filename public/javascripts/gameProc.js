//const canvas = document.querySelector('#')
const startBtn = document.querySelector("#startBtn");
const clearBtn = document.querySelector("#clear")
const inputAnswer = document.getElementById("answer");
const result = document.getElementById('result');
let realAnswer = '';

startBtn.addEventListener('click', () => {
    console.log('game start!');
    const main_answer = inputAnswer.value;
    socket.emit('game-start', roomName, main_answer);
});

inputAnswer.addEventListener('keyup', ()=>{
    console.log("answer:",realAnswer," inputAnswer:",inputAnswer.value);
    
    if(realAnswer != inputAnswer.value){
        result.style.color = 'red';
        result.innerHTML = "정답자 없음";
    } else {
        /* db 점수 획득 구현*/
        result.style.color = 'blue';
        result.innerHTML = "정답자가 나왔습니다"
       
    }
});

socket.on('game-finish', () => {
    document.querySelector("#canvas").style['pointer-events']= "none";
    startBtn.setAttribute('disabled', false);
    clearBtn.setAttribute('disabled', false);
})



socket.on('send-answer', _answer => {
    realAnswer = _answer;
    console.log('###answer###',_answer);
});

socket.on('prevent-pointer', () => {
    console.log('canvas cannot be pointed');  
    document.querySelector("#canvas").style['pointer-events']= "";
    startBtn.setAttribute('disabled', true);
    clearBtn.setAttribute('disabled', true);
});

socket.on('reset-canvas', () => {
    console.log('clear all images');
    
    if (false) {        
        clearBtn.fireEvent("onclick");
    } else {
        const event = document.createEvent('MouseEvent');
        event.initEvent('click', false, true);
        clearBtn.dispatchEvent(event);
    }
})
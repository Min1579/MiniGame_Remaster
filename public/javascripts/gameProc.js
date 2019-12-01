//const canvas = document.querySelector('#')
const startBtn = document.querySelector("#startBtn");
const clearBtn = document.querySelector("#clear")
const inputAnswer = document.getElementById("answer");
const result = document.getElementById('result');
let ANSWER = '';

startBtn.addEventListener('click', () => {
    if (inputAnswer.value.length < 1) {
        alert('정답 설정을 해주세요!');
    } else {
        console.log('game start!');
        const answer = inputAnswer.value;
        socket.emit('send-clear-all', roomName, canvas.width, canvas.height);
        socket.emit('game-start', roomName, answer);
    }
});

inputAnswer.addEventListener('keyup', () => {
    console.log("answer:", ANSWER, " inputAnswer:", inputAnswer.value);
    const inputAnswerVal = inputAnswer.value;
    if (inputAnswerVal.length > 0) {
        if (ANSWER != inputAnswer.value) {
            result.style.color = 'red';
            result.innerHTML = "게임진행 전";
        } else {
            /* db 점수 획득 구현*/
            result.style.color = 'blue';
            result.innerHTML = "정답자가 나왔습니다"
            socket.emit('get-answer', roomName, name);
        }
    }
});

socket.on('game-finish', name => {
    alert(`${name}님이 정답을 맞추었습니다\n정답공개:${ANSWER}`)
    document.querySelector("#canvas").style['pointer-events'] = "";
    startBtn.setAttribute('disabled', false);
    clearBtn.setAttribute('disabled', false);
});

socket.on('send-answer', _answer => {
    ANSWER = _answer;
    console.log('###answer###', _answer);
});

socket.on('prevent-pointer', () => {
    console.log('canvas cannot be pointed');
    document.querySelector("#canvas").style['pointer-events'] = "none";
    startBtn.setAttribute('disabled', true);
    clearBtn.setAttribute('disabled', true);
});



const startBtn = document.querySelector("#startBtn");
const clearBtn = document.querySelector("#clear")

startBtn.addEventListener('click',() => {
    console.log('game start!');
    socket.emit('game-start', roomName);
});

socket.on('prevent-pointer', () => {
    canvas.style.pointerEvents="none";
});

socket.on('reset-canvas', () => {
    clearBtn.emit('click');
})
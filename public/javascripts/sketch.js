/////////////////////////////////////////////////////////////////
const canvas = document.getElementById("canvas");
let ctx;
ctx = canvas.getContext("2d");
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 1140, 600);
ctx.lineCap = "round";
let x;
let y;
let drawing = false;
canvas.addEventListener('mousedown', function (e) {
  console.log('mousedown');
  e.preventDefault();
  x = canvasX(e.clientX);
  y = canvasY(e.clientY);
  drawing = true;
  socket.emit('send-mousedown', roomName, x, y)
})

// 현재 위치에서 새로 이동한 곳까지 선을 그린다.
canvas.addEventListener('mousemove', function (e) {
  console.log('mousemove');
  if (drawing) {
    e.preventDefault();
    ctx.beginPath();
    ctx.moveTo(x, y);
    x = canvasX(e.clientX);
    y = canvasY(e.clientY);
    ctx.lineTo(x, y);
    ctx.stroke();
    socket.emit('send-mousemove', roomName, x, y);
    console.log('event occured');
  }
})

socket.on('receive-mousemove',(_x,_y) => {
  ctx.beginPath();
    ctx.moveTo(x, y);
    x = _x;
    y = _y;
    ctx.lineTo(x, y);
    ctx.stroke();
})

// 그리기를 종료한다.
canvas.addEventListener('mouseup', function (e) {
  console.log('mouseup');
  drawing = false;
  socket.emit('send-mouseup', {
    bool: false
  });
})



// 선 색상 변경
const selcolor = document.getElementById("selcolor");
selcolor.addEventListener('change', function (e) {
  ctx.strokeStyle = selcolor.value;
  socket.emit('send-color',roomName, selcolor.value);
})

socket.on('receive-color', color => {
  ctx.strokeStyle =  color;
})

// 선 굵기 변경
const selwidth = document.getElementById("selwidth");
selwidth.addEventListener('change', function (e) {
  ctx.lineWidth = selwidth.value;
  socket.emit('send-width', roomName, ctx.lineWidth);
})

socket.on('receive-width', width => {
  ctx.lineWidth = width;
})

// 모두 지우기
const btnclear = document.getElementById("clear");
btnclear.addEventListener('click', function (e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit('send-clear',roomName, canvas.width, canvas.height);
})

socket.on('receive-clear', (w,h) => {
  ctx.clearRect(0,0,w,h);
})



function canvasX(clientX) {
  const bound = canvas.getBoundingClientRect();
  const bw = 5;
  return (clientX - bound.left - bw) * (canvas.width / (bound.width - bw * 2));
}

function canvasY(clientY) {
  const bound = canvas.getBoundingClientRect();
  const bw = 5;
  return (clientY - bound.top - bw) * (canvas.height / (bound.height - bw * 2));
}
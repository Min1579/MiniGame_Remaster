const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 1140, 600);
ctx.lineCap = "round";
let drawing = false;
let x, y;
// 현재 위치를 저장한다.
canvas.addEventListener('mousedown', function (e) {
  console.log('mousedown');
  e.preventDefault();
  x = canvasX(e.clientX);
  y = canvasY(e.clientY);
  drawing = true;
  socket.emit('send-mousedown', roomName, x, y, drawing);
});

socket.on('receive-mousedown', (_x, _y, _drawing) => {
  x = _x;
  y = _y;
  drawing = _drawing; 
  console.log('receive-mousedown');
  
});

// 현재 위치에서 새로 이동한 곳까지 선을 그린다.
canvas.addEventListener('mousemove', function (e) {
  console.log('mousemove');
  socket.emit('send-mousemove', roomName, x, y);
  if (drawing) {
    e.preventDefault();
    ctx.beginPath();
    ctx.moveTo(x, y);
    x = canvasX(e.clientX);
    y = canvasY(e.clientY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
})

socket.on('receive-mousemove', (_x, _y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  x = _x
  y = _y
  ctx.lineTo(_x, _y);
  ctx.stroke();
  console.log('mouse move');
  console.log(`(${_x},${_y})`);
  
})

// 그리기를 종료한다.
canvas.addEventListener('mouseup', function (e) {
  console.log('mouseup');
  drawing = false;
  socket.emit('send-mouseup', roomName);
})

socket.on('receive-mouseup', ()=> {
  drawing = false;
})

// 선 색상 변경
const selcolor = document.getElementById("selcolor");
selcolor.addEventListener('change', function (e) {
  ctx.strokeStyle = selcolor.value;
  socket.emit('send-color', roomName, ctx.strokeStyle);
})

socket.on('receive-color', color => {
  ctx.strokeStyle = color;
})

// 선 굵기 변경
const selwidth = document.getElementById("selwidth");
selwidth.addEventListener('change', function (e) {
  ctx.lineWidth = selwidth.value;
  socket.emit('send-width',roomName, ctx.lineWidth);
})

socket.on('receive-width', width => {
  ctx.lineWidth = width;
})

// 모두 지우기
const btnclear = document.getElementById("clear");
btnclear.addEventListener('click', function (e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit('send-clear', roomName, canvas.width, canvas.height);
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
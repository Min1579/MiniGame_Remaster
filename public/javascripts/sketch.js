const socket = io('http://localhost:3000')
const selcolor = document.getElementById("selcolor");
const canvas = document.getElementById("canvas");
const selwidth = document.getElementById("selwidth");
const btnclear = document.getElementById("clear");

let canvas;
let ctx;
let sx, sy;					// 현재 위치
let drawing = false;			// 현재 그리는 중인가?

if (canvas == null || canvas.getContext == null) return;
const ctx = canvas.getContext("2d");
ctx.lineCap = "round";

// 현재 위치를 저장한다.
socket.on('mousedown', (x,y,drawing_t) => {
  canvas.addEventListener('mousedown', function(e) {
    e.preventDefault();
    sx = x;
    sy = y
    drawing = drawing_t;
  })
})

// 현재 위치에서 새로 이동한 곳까지 선을 그린다.
socket.on('mousemove', (x,y) => {
  canvas.addEventListener('mousemove', function(e) {
    if (drawing) {
      e.preventDefault();
      ctx.beginPath();
      ctx.moveTo(x, y);
      sx = canvasX(e.clientX);
      sy = canvasY(e.clientY);
      ctx.lineTo(sx, sy);
      ctx.stroke();
    }
  })
})

// 그리기를 종료한다.
socket.on('mouseup', () => {
  canvas.addEventListener('mouseup', function(e) {
    drawing = false;
  })  
})


// 선 색상 변경
selcolor.addEventListener('change', function(e) {
  ctx.strokeStyle = selcolor.value;
})

// 선 굵기 변경
selwidth.addEventListener('change', function(e){
  ctx.lineWidth = selwidth.value;
})

// 모두 지우기
btnclear.addEventListener('click', function(e){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

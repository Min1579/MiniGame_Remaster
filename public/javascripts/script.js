const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
  const name = prompt('your name?')
  appendMessage(`${name} 님이 입장`)
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`${name}: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
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
  socket.emit('send-mousedown',roomName,x,y)
})

socket.on('get-mousedown', (_x,_y,_drawing) => {
    console.log('mousedown');
    e.preventDefault();
    x = _x;
    y = _y;
    drawing = _drawing;
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
    socket.emit('send-mousemove', roomName,x,y,e);
    console.log('event occured');
  }
})
socket.on('receive-mousemove', (_x,_y,e) => {
  e.preventDefault();
  ctx.beginPath();
  ctx.moveTo(x,y);
  x = canvasX(_x);
  y = canvasY(_y);
  ctx.lineTo(x,y);
  ctx.stroke();
})

function draw(evnet, data) {
  event.preventDefault();
  ctx.beginPath();
  ctx.moveTo(data.x, data.y);
  x = canvasX(data.eX);
  y = canvasY(data.eY);
  ctx.lineTo(x, y);
  ctx.stroke();
}


// 그리기를 종료한다.
canvas.addEventListener('mouseup', function (e) {
  console.log('mouseup');
  drawing = false;
  socket.emit('send-mouseup', {
    bool: false
  });
})

socket.on('receive-mousedown', data => {
  canvas.emitter('mouseup', function (e) {
    console.log('mouseup');
    drawing = d.bool;
  })
})

// 선 색상 변경
const selcolor = document.getElementById("selcolor");
selcolor.addEventListener('change', function (e) {
  ctx.strokeStyle = selcolor.value;
  socket.emit('send-color', {
    color: ctx.strokeStyle
  });
})

socket.on('receive-color', data => {
  selcolor.addEventListener('change', function (e) {
    console.log('color', data.color);

    ctx.strokeStyle = data.color;
  })
})

// 선 굵기 변경
const selwidth = document.getElementById("selwidth");
selwidth.addEventListener('change', function (e) {
  ctx.lineWidth = selwidth.value;
  socket.emit('send-width', {
    width: ctx.lineWidth
  });
})

socket.on('receive-width', data => {
  selwidth.addEventListener('change', function (e) {
    ctx.lineWidth = data.width;
  })
})

// 모두 지우기
const btnclear = document.getElementById("clear");
btnclear.addEventListener('click', function (e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit('send-clear', {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
  });
})

socket.on('receive-clear', data => {
  ctx.clearRect(data.x, data.y, data.width, data.height);
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
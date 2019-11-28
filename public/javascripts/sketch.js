window.onload = function () {
  let ctx;
  let sx;
  let sy;



  const socket = io('http://localhost:3000')
  const canvas = document.getElementById("canvas");
  if (canvas == null || canvas.getContext == null) return;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1140, 600);
  ctx.lineCap = "round";

  // 현재 위치를 저장한다.
  canvas.addEventListener('mousedown', function (e) {
    console.log('mousedown');
    e.preventDefault();
    sx = canvasX(e.clientX);
    sy = canvasY(e.clientY);
    drawing = true;
    socket.emit('send-mousedown', {
      eX: e.clientX,
      eY: e.clientY
    })

  })

  socket.on('receive-mousedown', data => {
      console.log('mousedown');
      e.preventDefault();
      sx = canvasX(data.eX);
      sy = canvasY(data.eY);
      drawing = true;
    })
  


  // 현재 위치에서 새로 이동한 곳까지 선을 그린다.
  canvas.addEventListener('mousemove', function (e) {
    console.log('mousemove');
    if (drawing) {

      e.preventDefault();
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      sx = canvasX(e.clientX);
      sy = canvasY(e.clientY);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      console.log({
        x: sx,
        y: sy,
        eX: e.clientX,
        eY: e.clientY
      });
      socket.emit('send-mousemove', {
        x: sx,
        y: sy,
        eX: e.clientX,
        eY: e.clientY
      });
      console.log('event occured');

    }
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
  socket.on('receive-mousemove', data => {
    
    console.log(data);
    const event = canvas.trigger('mousemove');
    draw(evnet, data)
  })

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



}
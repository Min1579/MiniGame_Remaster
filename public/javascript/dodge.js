

function init(){
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillRect(0,0,600,400);
  var game = new Game();
}

function Game(){
  var canvas = document.getElementById('canvas');
  var ballcnt = 1;
  var score = 0;
  var plane = new Plane(canvas);
  drawPlane(canvas,plane);
  setInterval(function () {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,600,400);
    score +=10;
    output = "score : " + score +"<br>";
    document.getElementById('score').innerHTML = output;
    var level = ((ballArr.length/10)+1);
    document.getElementById('ball').innerHTML = "level : " + parseInt(level);
    ctx.fillRect(0,0,600,400);
  },50);

  var ballArr = [new drawBall(canvas,plane)];
  setInterval(function () {
    ballArr.push(new drawBall(canvas,plane));
  },1000);
}


function drawBall(canvas,plane){
  var imgBall = new Image();
  imgBall.src="../image/dodge/ball.png"
  var x = Math.random()*250;
  var y = Math.random()*150;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var xcnt = Math.random()*1+0.5;
    var ycnt = Math.random()*1+0.5;
    this.move = setInterval(function(){
      x += xcnt;
      y += ycnt;
      if (x < 1 || x>590){
        xcnt = -xcnt
      }
      if (y < 1 || y>390){
        ycnt = -ycnt
      }
      if (Math.abs(plane.x-x)<10 && Math.abs(plane.y-y)<10){
          const xPos = plane.x;
          const yPos = plane.y;
          plane.imgPlane.src = "../image/dodge/boom.gif";
          window.clearInterval(1);
          window.clearInterval(2);
          setInterval(function(){
            ctx.clearRect(0,0,600,400);
            ctx.fillRect(0,0,600,400);
            ctx.drawImage(plane.imgPlane, xPos-20, yPos-20,40, 40);
          },1);
          setTimeout(function(){
            for (var i =0; i < 500; i ++){
              clearInterval(i);
            }
            const overImg = new Image();
            overImg.src = "../image/dodge/over.png";
            canvas.addEventListener("click",function(){
              for (var i =0; i < 500; i ++){
                clearInterval(i);
              }
              delete overImg;
              delete game;
              ctx.fillRect(0,0,600,400);
              game = new Game();
            });
            var over = setInterval(function(){
              ctx.drawImage(overImg,150,100,300,200);
            },1);
            

          },500);
      }
      ctx.drawImage(imgBall, x-5, y-5, 5, 5);
    },1)
  }
}
function Plane(){
  this.imgPlane = new Image();
  this.imgPlane.src = "../image/dodge/plane.png"
  this.x = 300;
  this.y = 200;
  this.xcnt = 0;
  this.ycnt = 0;
}

function drawPlane(canvas,plane){
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  function keyDownHandler(e) {
    if(e.keyCode == 39) {
      plane.xcnt = 1;
    }
    else if(e.keyCode == 37) {
      plane.xcnt = -1;
    }
    else if(e.keyCode == 40) {
      plane.ycnt = 1.5;
    }
    else if(e.keyCode == 38) {
      plane.ycnt = -1.5;
    }
  }

  function keyUpHandler(e) {
    if(e.keyCode == 39) {
      plane.xcnt = 0;
    }
    else if(e.keyCode == 37) {
      plane.xcnt = 0;
    }
    else if(e.keyCode == 40) {
      plane.ycnt = 0;
    }
    else if(e.keyCode == 38) {
      plane.ycnt = 0;
    }
  }
  if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  setInterval(function () {
    plane.x < 1 ? plane.x=2 : (plane.x > 580 ? plane.x = 579 : plane.x = plane.x + plane.xcnt);
    plane.y < 1 ? plane.y=2 : (plane.y > 380 ? plane.y = 379 : plane.y = plane.y + plane.ycnt);
    ctx.drawImage(plane.imgPlane, plane.x-15, plane.y-15,30, 30);
  },1)
}
}
window.onload = function(){
  document.querySelector("#win-cvs")
}

function init(){
  var ctx = document.querySelector('#canvas').getContext('2d');  
  document.querySelector('button').outerHTML = '';
  for (var i =0; i < 500; i ++){
    clearInterval(i);
  }
  var cnt3 = new Image();
  cnt3.src = "../images/dodge/3-128.png";
  var cnt2 = new Image();
  cnt2.src = "../images/dodge/2-128.png";
  var cnt1 = new Image();
  cnt1.src = "../images/dodge/1-128.png";
  
  setTimeout(function(){
    ctx.fillRect(0,0,600,400);
    ctx.drawImage(cnt3,225,125,150,150);
    setTimeout(function(){
      ctx.clearRect(0,0,600,400);
      ctx.fillRect(0,0,600,400);
      ctx.drawImage(cnt2,225,125,150,150);
      setTimeout(function(){
        ctx.fillRect(0,0,600,400);
        ctx.drawImage(cnt1,225,125,150,150);
        setTimeout(function(){
          ctx.fillRect(0,0,600,400);
          var game = new Game();
        },750)
      },750)
    },750)
  },100)

  
}

function Game(){
  var canvas = document.querySelector('#canvas')
  var ballcnt = 1;
  var score = 0;
  var plane = new Plane(canvas);
  drawPlane(canvas,plane);
  setInterval(function () {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,600,400);
    score +=10;
    output = score;
    document.getElementById('score').innerHTML = output;
    var level = ((ballArr.length/10)+1);
    document.getElementById('ball').innerHTML = parseInt(level);
    ctx.fillRect(0,0,600,400);
  },50);

  var ballArr = [new drawBall(canvas,plane)];
  setInterval(function () {
    ballArr.push(new drawBall(canvas,plane));
  },1000);
}


function drawBall(canvas,plane){
  var imgBall = new Image();
  imgBall.src="../images/dodge/ball.png"
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
          plane.imgPlane.src = "../images/dodge/boom.gif";
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
            overImg.onload = function(){
              ctx.drawImage(overImg,150,100,300,200);
            }
            overImg.src = "../images/dodge/over.png";
            var btn = document.createElement("button");
            document.body.appendChild(btn);
            document.querySelector('button').outerHTML = '<button style="top:55%;" onclick="init()">재시작</button>';

            
            const email = document.querySelector('#user').innerHTML;
            
            if (email ==="Guest"){
              document.querySelector('#msg').innerHTML = "Please Login";
            }
            else {
              const score = parseInt(document.querySelector('#score').innerText);
              sendAjax("http://localhost:3000/ajax/score",email,score);
            }


            function sendAjax(url,email,score){
              var data = JSON.stringify({'email':email , 'score':score});
              var xhr = new XMLHttpRequest();
              xhr.open('POST',url);
              xhr.setRequestHeader("Content-Type","application/json");
              xhr.send(data);

              xhr.addEventListener("load",function(){
                var getData = JSON.parse(xhr.responseText);
                document.querySelector('#msg').innerHTML = getData.msg;
              })

            }
            

          },500);
      }
      ctx.drawImage(imgBall, x-5, y-5, 5, 5);
    },1)
  }
}
function Plane(){
  this.imgPlane = new Image();
  this.imgPlane.src = "../images/dodge/plane.png"
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
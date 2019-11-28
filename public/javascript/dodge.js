// window.onload = function(){
//   document.querySelector("#win-cvs")
// }
const cnt3 = new Image();
cnt3.src = "../images/dodge/3-128.png";
const cnt2 = new Image();
cnt2.src = "../images/dodge/2-128.png";
const cnt1 = new Image();
cnt1.src = "../images/dodge/1-128.png";
var imgBall = new Image();
imgBall.src="../images/dodge/ball.png"
var imgPlane = new Image();
const overImg = new Image();
overImg.src = "../images/dodge/over.png";

function init(){
  imgPlane.src = "../images/dodge/plane.png"
  document.querySelector('#msg').innerHTML = 'Enjoy!'
  const ctx = document.querySelector('#canvas').getContext('2d');  
  ctx.clearRect(0,0,600,400);
  document.querySelector('button').outerHTML = '';
  for (var i =0; i < 500; i ++){
    clearInterval(i);
  }
  setTimeout(function(){
    ctx.drawImage(cnt3,225,125,150,150);
    setTimeout(function(){
      ctx.clearRect(0,0,600,400);
      ctx.drawImage(cnt2,225,125,150,150);
      setTimeout(function(){
        ctx.clearRect(0,0,600,400);
        ctx.drawImage(cnt1,225,125,150,150);
        setTimeout(function(){
          ctx.clearRect(0,0,600,400);
          var game = new Game();
        },750)
      },750)
    },750)
  },100)
}

function Game(){
  var canvas = document.querySelector('#canvas')
  var score = 0;
  var plane = new Plane();
  var ballArr = [new Ball()];
  setInterval(function(){
    drawPlane(canvas,plane,imgPlane);
    for(var i = 0; i<ballArr.length; i++){
      drawBall(canvas,plane,ballArr[i]);
    }
  },1);
  setInterval(function () {
    ballArr.push(new Ball());
  },1000);

  setInterval(function () {
    var ctx = canvas.getContext('2d');
    score +=10;
    output = score;
    document.getElementById('score').innerHTML = output;
    var level = ((ballArr.length/10)+1);
    document.getElementById('ball').innerHTML = parseInt(level);
    ctx.clearRect(0,0,600,400);
  },50);


}
function Ball(){
  this.x = Math.random()*250;;
  this.y = Math.random()*150;;
  this.xcnt = Math.random()*1+0.5;
  this.ycnt = Math.random()*1+0.5;
}

function drawBall(canvas,plane,ball){
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.drawImage(imgBall, ball.x-5, ball.y-5, 5, 5);
      ball.x += ball.xcnt;
      ball.y += ball.ycnt;
      if (ball.x < 1 || ball.x>590){
        ball.xcnt = -ball.xcnt
      }
      if (ball.y < 1 || ball.y>390){
        ball.ycnt = -ball.ycnt
      }
      if (Math.abs(plane.x-ball.x)<10 && Math.abs(plane.y-ball.y)<10){
          imgPlane.src = "../images/dodge/boom.gif";
          setTimeout(function(){
            for (var i =0; i < 500; i ++){
              clearInterval(i);
            }
            ctx.drawImage(overImg,150,100,300,200);
            var btn = document.createElement("button");
            document.querySelector('.btn-wrapper').appendChild(btn);
            document.querySelector('button').outerHTML = '<button onclick="init()" class="game">Restart?</button>';
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
  }
}

function Plane(){
  this.x = 300;
  this.y = 200;
  this.xcnt = 0;
  this.ycnt = 0;
}

function drawPlane(canvas,plane,img){
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, plane.x-15, plane.y-15, 30, 30);
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  if (canvas.getContext){
      plane.x < 1 ? plane.x=2 : (plane.x > 580 ? plane.x = 579 : plane.x = plane.x + plane.xcnt);
      plane.y < 1 ? plane.y=2 : (plane.y > 380 ? plane.y = 379 : plane.y = plane.y + plane.ycnt);
  }
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
}
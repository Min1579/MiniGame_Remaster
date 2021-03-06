// window.onload = function(){
//   document.querySelector("#win-cvs")
// }
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const cnt3 = new Image();
const cnt2 = new Image();
const cnt1 = new Image();
cnt3.src = "../images/dodge/3-128.png";
cnt2.src = "../images/dodge/2-128.png";
cnt1.src = "../images/dodge/1-128.png";

const imgPlane = new Image();
const imgBall = new Image();
const overImg = new Image();
const boomImg = new Image();
imgBall.src = "../images/dodge/ball.png";
overImg.src = "../images/dodge/over.png";
boomImg.src = "../images/dodge/boom.gif";

const bgm = new Audio('../images/dodge/sounds/dodgebgm.mp3');
const explosion = new Audio('../images/dodge/sounds/explosion.mp3');
bgm.pause();
bgm.loop=true;
bgm.play();

var ballArr = [];

function init() {

  const name = document.querySelector('#user').innerHTML;
  getScore(`http://${window.location.hostname}:${window.location.port}/dodge/getScore`,name);
  imgPlane.src = "../images/dodge/plane.png"
  document.querySelector('#msg').innerHTML = 'Enjoy!'
  ctx.clearRect(0, 0, 600, 400);
  document.querySelector('button').outerHTML = '';
  for (var i = 0; i < 500; i++) {
    clearInterval(i);
  }
  setTimeout(function () {
    ctx.drawImage(cnt3, 225, 125, 150, 150);
    setTimeout(function () {
      ctx.clearRect(0, 0, 600, 400);
      ctx.drawImage(cnt2, 225, 125, 150, 150);
      setTimeout(function () {
        ctx.clearRect(0, 0, 600, 400);
        ctx.drawImage(cnt1, 225, 125, 150, 150);
        setTimeout(function () {
          ctx.clearRect(0, 0, 600, 400);
          Game();
        }, 750)
      }, 750)
    }, 750)
  }, 100)
}

function Game() {
  var score = 0;
  var plane = new Plane();
  ballArr = [new Ball()];
  setInterval(function () {
    ballArr.push(new Ball());
  }, 1000);

  setInterval(function () {
    score += 1;
    output = score;
    document.getElementById('score').innerHTML = output;
    var level = ((ballArr.length / 10) + 1);
    document.getElementById('ball').innerHTML = parseInt(level);
    ctx.clearRect(0, 0, 600, 400);
    drawPlane(plane);
    for (var i = 0; i < ballArr.length; i++) {
      drawBall(plane, ballArr[i]);
    }
  }, 20);
}

function Plane() {
  this.x = 300;
  this.y = 200;
  this.xcnt = 0;
  this.ycnt = 0;
}

function drawPlane(plane) {
  const speed = 8;
  ctx.drawImage(imgPlane, plane.x - 20, plane.y - 20, 40, 40);
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  if (canvas.getContext) {
    plane.x < 20 ? plane.x = 20 : (plane.x > 580 ? plane.x = 580 : plane.x = plane.x + plane.xcnt);
    plane.y < 20 ? plane.y = 20 : (plane.y > 380 ? plane.y = 380 : plane.y = plane.y + plane.ycnt);
  }

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      plane.xcnt = speed;
    }
    else if (e.keyCode == 37) {
      plane.xcnt = -speed;
    }
    if (e.keyCode == 40) {
      plane.ycnt = speed;
    }
    else if (e.keyCode == 38) {
      plane.ycnt = -speed;
    }
  }


  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      plane.xcnt = 0;
    }
    else if (e.keyCode == 37) {
      plane.xcnt = 0;
    }
    if (e.keyCode == 40) {
      plane.ycnt = 0;
    }
    else if (e.keyCode == 38) {
      plane.ycnt = 0;
    }
  }
}

function Ball() {
  this.x = Math.random() * 250;;
  this.y = Math.random() * 150;;
  this.xcnt = Math.random() * 1 + 5;
  this.ycnt = Math.random() * 1 + 5;
}

function drawBall(plane, ball) {
  if (canvas.getContext) {
    ctx.drawImage(imgBall, ball.x - 10, ball.y - 10, 10, 10);
    ball.x += ball.xcnt;
    ball.y += ball.ycnt;
    if (ball.x < 1 || ball.x > 590) {
      ball.xcnt = -ball.xcnt
    }
    if (ball.y < 1 || ball.y > 390) {
      ball.ycnt = -ball.ycnt
    }
    if (Math.abs(plane.x - ball.x) < 10 && Math.abs(plane.y - ball.y) < 10) {
      explosion.play();
      const bx = plane.x;
      const by = plane.y;
      imgPlane.src = '';
      setInterval(() => {
        var i = 4
        ctx.drawImage(boomImg, bx - 20 + i, by - 20, 40 + i, 40);
        ctx.drawImage(boomImg, bx - 20, by - 20 + i, 40, 40 + i);
        ctx.drawImage(boomImg, bx - 20 - i, by - 20, 40 - i, 40);
        ctx.drawImage(boomImg, bx - 20, by - 20 + i, 40, 40 + i);

      }, 10);
      setTimeout(function () {
        for (var i = 0; i < 500; i++) {
          clearInterval(i);
        }
        ctx.drawImage(overImg, 150, 100, 300, 200);

        //버튼 중복생성 버그 수정
        if (document.querySelector("button") == null){
          var btn = document.createElement("button");
          document.querySelector('.btn-wrapper').appendChild(btn);
          document.querySelector('button').outerHTML = '<button onclick="init()" class="game">Restart?</button>';

        }
        const name = document.querySelector('#user').innerHTML;
        const highScore = parseInt(document.querySelector('#highScore').innerText);
        const score = parseInt(document.querySelector('#score').innerText);
        const email = document.querySelector("#email").innerText;

        if (name === "Guest") {
          document.querySelector('#msg').innerHTML = "Please Login";
        }
        else {
          if (highScore == 0){
            insertScore(`http://${window.location.hostname}:${window.location.port}/dodge/insertScore`,email, name, score);
          }
          else if (highScore < score){
            updateScore(`http://${window.location.hostname}:${window.location.port}/dodge/updateScore`,email, score);
          }
          else{
            document.querySelector('#msg').innerHTML = "Try again";
          }
        }


      }, 500);
    }
  }
}

function getScore(url,name){
  var data = JSON.stringify({'name':name});
  var xhr = new XMLHttpRequest(); 
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);

  xhr.addEventListener("load", function () {
    var getData = JSON.parse(xhr.responseText);
    document.querySelector('#email').innerHTML = getData.email;
    document.querySelector('#highScore').innerHTML = getData.score;
  })
}

function insertScore(url, email, name, score) {
  var data = JSON.stringify({'email':email, 'name': name, 'score': score});
  var xhr = new XMLHttpRequest(); 
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);

  xhr.addEventListener("load", function () {
    var getData = JSON.parse(xhr.responseText);
    document.querySelector('#msg').innerHTML = getData.msg;
    document.querySelector('#highScore').innerHTML = score;
  })
}

function updateScore(url, email, score) {
  var data = JSON.stringify({'email':email, 'score': score});
  var xhr = new XMLHttpRequest(); 
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);

  xhr.addEventListener("load", function () {
    var getData = JSON.parse(xhr.responseText);
    document.querySelector('#msg').innerHTML = getData.msg;
    document.querySelector('#highScore').innerHTML = score;
  })
}


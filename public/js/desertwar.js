var backImg = new Image();
backImg.src = "../images/desertwar/background.png";
var pilotImg2 = new Image();
pilotImg2.src = "../images/desertwar/pilot2.png";
var explode = new Image();
explode.src = "../images/desertwar/explosion.png"
var enemyImg1 = new Image();
var enemyImg2 = new Image();
enemyImg1.src = "../images/desertwar/enemy.png";
enemyImg2.src = "../images/desertwar/enemy2.png";
var gamefinish = new Image();
gamefinish.src = "../images/desertwar/gameover.png";

var bgm = new Audio("../images/desertwar/desertbgm.mp3");
var missileSound = new Audio("../images/desertwar/missile.mp3");
var gameoversound = new Audio("../images/desertwar/gameover.mp3");
var enemyDieSound = new Audio("../images/desertwar/enemydie.mp3");
var pilotDieSound = new Audio("../images/desertwar/pilotdie.mp3");

var enemyImgs = [enemyImg2, enemyImg1];
var enemyList = [];
var enemycount = 0;
var count = 0;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var attackPressed = false;

var missileImg = new Image();
missileImg.src = "../images/desertwar/missile.png";
var missileList = [];

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//var gameover = 0;

var score = 0;
var level = 1;
var lvlsec = 0;
var enemySpeed = 5;

var back1X = 0;
var back2X = -1000;
var unitX = 50;
var unitY = 350;

var mvp;
var levelup;
// init functions
function desert_init() {
    back1X = 0;
    back2X = -1000;
    ctx.drawImage(backImg, back1X, 0, 1000, 700);
    ctx.drawImage(backImg, back2X, 0, 1000, 700);
}
function pilot_init() {
    unitX = 50;
    unitY = 350;
    ctx.drawImage(pilotImg2, unitX, unitY, 100, 100);
}
function enemy_init() {
    enemyList = [];
    for (var i = 0; i < enemyList.length; i++) {
        var tmp = enemyList[i];
        ctx.drawImage(enemyImgs[tmp.type], tmp.x - 50, tmp.y - 50, 100, 100);
    }
    var ranNum = Math.random() * 50;

    var result = Math.floor(ranNum);
    if (enemycount == 100) {
        var enemyY = [500, 450, 350, 250, 150, 50];
        for (var i = 0; i < 5; i++) {
            var j = Math.floor(Math.random() * 6)
            var temp = enemyY[i]
            enemyY[i] = enemyY[j]
            enemyY[j] = temp;
        }
        for (var i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
            enemyY.pop();
        }
        for (var i = 0; i < 5; i++) {
            obj = {};
            obj.x = 1000;
            obj.y = enemyY[i];
            var result = Math.floor(Math.random() * 2);
            obj.type = result;
            if (result == 0) {
                obj.energy = 50;
            } else if (result == 1) {
                obj.energy = 100;
            }
            obj.isDead = false;
            enemyList.push(obj);
            enemycount = 0;
        }
    }
}
function init_LVL(){
    level = 1;
    lvlsec = 0;
    enemySpeed = 5;
}
function enemy_speed() {
    for (var j = 0; j < enemyList.length; j++) {
        var tmp2 = enemyList[j];
        tmp2.x = tmp2.x - 5;
    }
}

function init() {
    const name = document.querySelector('#user').innerHTML;
    getScore(`http://${window.location.hostname}:${window.location.port}/desertwar/getScore`,name);
    bgm.play();
    desert_init();
    pilot_init();
    enemy_init();
    enemy_speed();
    init_LVL();
    levelup = setInterval(LVLUP,500);
    mvp = setInterval(movePlane, 10);
    score = 0;
    document.getElementById('play_btn').outerHTML = '<button id="play_btn" onclick="Game()" >Play!</button>';
    Game();
}

function restart() {
    var btn = document.createElement('button');
    document.querySelector('#overlay').appendChild(btn);
    document.querySelector('button').outerHTML = '<button class="btn btn-default" id="play_btn" onclick="init()">Restart!</button>';
    bgm.currentTime = 0;
}
// Game() start
function Game() {
    document.querySelector("#play_btn").outerHTML = ''
        var ID2 = setInterval(() => {
            count++;
            ctx.drawImage(backImg, back1X, 0, 1000, 700);
            ctx.drawImage(backImg, back2X, 0, 1000, 700);
            ctx.drawImage(pilotImg2, unitX - 50, unitY - 50, 100, 100);

            document.getElementById('score').innerHTML = score;
            document.getElementById('level').innerHTML = level;
            // 배경 스크롤
            back1X -= 5;
            back2X -= 5;
            if (back1X <= -1000) {
                back1X = 0;
                back2X = -1000;
            }
            if (back2X <= -1000) {
                back2X = 1000;
                back1X = 0;
            }
            // 적기 생성
            enemycount++;
            for (var i = 0; i < enemyList.length; i++) {
                var tmp = enemyList[i];
                ctx.drawImage(enemyImgs[tmp.type], tmp.x - 50, tmp.y - 50, 100, 100);
            }
            var ranNum = Math.random() * 50;
            var result = Math.floor(ranNum);
            if (enemycount == 100) {
                var enemyY = [600,500,400, 300,200,100,50];
                for (var i = 0; i < 6; i++) {
                    var j = Math.floor(Math.random() * 6)
                    var temp = enemyY[i]
                    enemyY[i] = enemyY[j]
                    enemyY[j] = temp;
                }
                for (var i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
                    enemyY.pop();
                }
                for (var i = 0; i < 6; i++) {
                    obj = {};
                    obj.x = 1000;
                    obj.y = enemyY[i];
                    var result = Math.floor(Math.random() * 2);
                    obj.type = result;
                    if (result == 0) {
                        obj.energy = 50;
                    } else if (result == 1) {
                        obj.energy = 100;
                    }
                    obj.isDead = false;
                    enemyList.push(obj);
                    enemycount = 0;
                }
            }
            //적기 제거
            for (var i = enemyList.length - 1; i >= 0; i--) {
                var tmp = enemyList[i];
                if (tmp.isDead) {
                    enemyList.splice(i, 1);
                }
            }
            //미사일 생성
            for (var i = 0; i < missileList.length; i++) {
                var tmp = missileList[i];
                ctx.drawImage(missileImg, tmp.x - 40, tmp.y - 40, 50, 50)
            }
            // 적기 속도 제어
            for (var i = 0; i < enemyList.length; i++) {
                var tmp = enemyList[i];
                tmp.x = tmp.x - enemySpeed;
                if (tmp.x <= -50) {
                    tmp.isDead = true;
                }
            }
            moveMissile();
            checkMissile();
            fire();
            checkMissHit();
            // 파일럿 충돌
            for (var i = 0; i < enemyList.length; i++) {
                var tmp = enemyList[i];
                var isPilotDie = unitX > tmp.x - 50 && unitX < tmp.x + 50 && unitY > tmp.y - 50 && unitY < tmp.y + 50;
                if (isPilotDie) {
                    restart();
                    clearInterval(ID2);
                    clearInterval(mvp);
                    clearInterval(levelup);
                    ctx.drawImage(explode, unitX - 50, unitY - 50, 100, 100);
                    ctx.drawImage(gamefinish,250,100,500,300);
                    //gameover = 1;
                    bgm.pause();
                    pilotDieSound.play();
                    gameoversound.play();
                    //데이터베이스
                    const name = document.querySelector('#user').innerHTML;
                    const highScore = parseInt(document.querySelector('#highScore').innerText);
                    const email = document.querySelector("#email").innerText;
                    if (name === "Guest") {}
                    else {
                      if (highScore == 0){
                        insertScore(`http://${window.location.hostname}:${window.location.port}/desertwar/insertScore`,email, name, score);
                      }
                      else if (highScore < score){
                        updateScore(`http://${window.location.hostname}:${window.location.port}/desertwar/updateScore`,email, score);
                      }
                    }
                }
            }
        }, 20)
        //적기속도
        // var enemv = setInterval(() => {
        //     if (gameover == 1) {
        //         clearInterval(enemv);
        //         gameover = 0;
        //     }
            //else {}
       // }, 20)
} //Game(); end

function makeMissile() {
    if (count % 8 != 0) {
        return;
    }
    var obj = {};
    obj.x = unitX;
    obj.y = unitY + 15;
    obj.isDead = false;
    missileList.push(obj);
    for (var i = 0; i < missileList.length; i++) {
        var tmp = missileList[i];
        tmp.x = tmp.x + 100;
        if (tmp.x >= 1000) {
            tmp.isDead = true;
        }
    }
}
function moveMissile() {
    for (var i = 0; i < missileList.length; i++) {
        var tmp = missileList[i];
        tmp.x = tmp.x + 100;
        if (tmp.x >= 1000) {
            tmp.isDead = true;
        }
    }
}
function checkMissile() {
    for (var i = missileList.length - 1; i >= 0; i--) {
        var tmp = missileList[i];
        if (tmp.isDead) {
            missileList.splice(i, 1);
        }
    }
}
function checkMissHit() {
    for (var i = 0; i < missileList.length; i++) {
        var miss = missileList[i];
        for (var j = 0; j < enemyList.length; j++) {
            var enemy = enemyList[j];
            var isShooted = miss.x > enemy.x - 50 && miss.x < enemy.x + 50 && miss.y > enemy.y - 50 && miss.y < enemy.y + 50;
            if (isShooted) {
                miss.isDead = true;
                enemy.energy -= 50;
                if (enemy.energy <= 0) {
                    enemy.isDead = true;
                    if (enemy.isDead) {
                        ctx.drawImage(explode, enemy.x - 50, enemy.y - 50, 100, 100)
                        enemyDieSound.play();
                    }
                    if (enemy.type == 0) {
                        score += 10;
                    } else if (enemy.type == 1) {
                        score += 20;
                    }
                }
            }
        }
    }
}
function LVLUP(){
    lvlsec++;
    if (lvlsec >= 10) {
        level++;
        lvlsec = 0;
    }
    if (level < 5) {
    enemySpeed += 0.2;
    } else if (level >=5 && level <10) {
        enemySpeed = Math.random() * 20 + 5;    
    } else if (level >= 10) {
        enemySpeed = Math.random() * 20 + 20; 
    }
}
function fire() {
    if (attackPressed) {
        makeMissile();
        missileSound.play();
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
      document.querySelector('#highScore').innerHTML = score;
    })
  }
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 38) {
        upPressed = true;
    }
    if (e.keyCode == 40) {
        downPressed = true;
    }
    if (e.keyCode == 65) {
        attackPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    if (e.keyCode == 37) {
        leftPressed = false;
    }
    if (e.keyCode == 38) {
        upPressed = false;
    }
    if (e.keyCode == 40) {
        downPressed = false;
    }
    if (e.keyCode == 65) {
        attackPressed = false;
    }
}

function movePlane() {

    if (rightPressed) {
        unitX += 7;
    }
    if (leftPressed) {
        unitX -= 7;
        if (unitX <= 50) {
            leftPressed = false;
            unitX = 50;
        }
    }
    if (upPressed) {
        unitY -= 7;
        if (unitY <= 50) {
            upPressed = false;
            unitY = 50;
        }
    }
    if (downPressed) {
        unitY += 7;
        if (unitY >= 650) {
            downPressed = false;
            unitY = 650;
        }
    }
}


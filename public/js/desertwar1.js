        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var count =0;
        var stopMove = 0;
        var enemyDie = false;
        var pilotDie = false;
        var gameover = 0;
        var enemycount = 0;
        // 배경 이미지의 x 좌표
        var back1X=0;
        var back2X =-1500;
        
        // 죽는 이미지 로딩
        var dieImg = new Image();
        dieImg.src = "../images/desertwar/explosion.png";

        // 배경 이미지 로딩
        var backImg = new Image();
        backImg.src = "../images/desertwar/background.png";
        // 비행기 이미지 로딩
        var pilotImg1 = new Image();
        var pilotImg2 = new Image();
        pilotImg1.src="../images/desertwar/pilot.png";
        pilotImg2.src="../images/desertwar/pilot2.png";
        // 비행기 이미지의 참조값을 배열에 넣음
        var pilotImgs=[pilotImg1,pilotImg2,dieImg];
        // 출력할 비행기의 이미지 인덱스
        var pilotIndex=1;
        
        // 비행기의 좌표
        var unitX = 100;
        var unitY = 350;

        // 적 이미지 로딩
        var enemyImg1 = new Image();
        var enemyImg2 = new Image();
        enemyImg1.src="../images/desertwar/enemy.png";
        enemyImg2.src="../images/desertwar/enemy2.png";
        // 적 이미지 객체를 배열에 저장
        var enemyImgs=[enemyImg2,enemyImg1,dieImg];
        // 적 객체를 저장할 배열
        var enemyList = [];

        var score = 0;

        // 미사일 이미지 로딩
        var missileImg = new Image();
        missileImg.src="../images/desertwar/missile.png";
        // 미사일 객체 저장할 배열
        var missileList=[];
        var missileTime1 = 0;
        var missileTime2 = 0;
        // 비행기 방향키 이동 이벤트 핸들러
        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;
        var attackPressed = false;

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        if(e.keyCode == 37) {
            leftPressed = true;
        }
        if(e.keyCode == 38){
         upPressed = true;   
        }
        if(e.keyCode == 40){
            downPressed = true;
        }
        if(e.keyCode == 65){
            attackPressed = true;
        }
    }
        function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        if(e.keyCode == 37) {
            leftPressed = false;
        }
        if(e.keyCode == 38){
            upPressed = false;
        }
        if(e.keyCode == 40){
            downPressed = false;
        }
        if(e.keyCode == 65) {
            attackPressed = false;
        }
    }
   
    function init(){
        //document.querySelector("play_btn")
        document.querySelector("#play_btn").outerHTML = ''
        var intervalID = setInterval(function(){
            count++;
            enemycount ++;
            missileTime1 += 50;
            // 배경 이미지 그리기
            ctx.drawImage(backImg,back1X,0,1500,700);
            ctx.drawImage(backImg,back2X,0,1500,700);
            ctx.fillText("SCORE : "+score,5,20);
             // 적 이미지 그리기
             for(var i=0; i<enemyList.length;i++){
                var tmp = enemyList[i];
                ctx.drawImage(enemyImgs[tmp.type],tmp.x-50,tmp.y-50,100,100);
            }
            // 미사일 이미지 그리기
            for(var i=0;i<missileList.length;i++){
                var tmp = missileList[i];
                ctx.drawImage(missileImg,tmp.x-40,tmp.y-40,50,50)
            }
            backScroll();
            if(missileTime1 >= 100){
            fire();
            missileTime1 = 0;
        }
            drawPilot();
            moveMissile();
            checkMissile();
            makeEnemy();
            moveEnemy();
            checkEnemy();
            checkMissHit();
            checkPilotHit();
        },20);

        function makeEnemy(){
            
            // 0~200 사이의 랜덤 실수 발생
            var ranNum = Math.random()*50;
            // 실수를 내림 연산하여 정수로 만듬
            var result = Math.floor(ranNum);
            if(enemycount == 100){// 10이 아니면
                var enemyY = [500,450,350,250,150,50];
            for (var i =0 ; i < 5 ; i ++){
                var j = Math.floor(Math.random()*6)
                var temp = enemyY[i] 
                enemyY[i] = enemyY[j]
                enemyY[j] = temp; 
            }
            for (var i =0 ; i < Math.floor(Math.random()*3)+3 ; i ++){
                enemyY.pop();
            }
            // for문 5번
            for(var i=0; i<5; i++){
                obj={};
                obj.x=1500;    
                obj.y=enemyY[i];
                // type에 0 혹은 1을 랜덤하게 부여
                var result = Math.floor(Math.random()*2);
                obj.type = result;
                if(result == 0){
                    obj.energy = 50;
                } else if(result == 1) {
                    obj.energy = 100;
                }
                obj.isDead = false;
                enemyList.push(obj);
                enemycount = 0;
            }
        } else{
            return; // 함수끝내기(적기 안만듬)
            }
    }
        function moveEnemy(){
            var enemySpeed = Math.floor((Math.random()*20)+1);
            for(var i=0; i<enemyList.length;i++){
                var tmp = enemyList[i];
                tmp.x = tmp.x-enemySpeed;
                if(tmp.x <=-50 ){
                    tmp.isDead=true;
                }
            }
        }
        function checkEnemy(){
            for(var i=enemyList.length-1; i>=0;i--){
                var tmp = enemyList[i];
                if(tmp.isDead){
                    enemyList.splice(i,1);
                    enemyDie = ture;
                }
            }
        }
        
        function backScroll(){
            back1X -= 5;
            back2X -= 5;
            if(back1X <= -1500){
                back1X = 1500;
                back2X = 0;
            }
            if(back2X <= -1500){
                back2X = 1500;
                back1X =0;
            }
        }

        function fire(){
            if (attackPressed) {
            makeMissile();
        }
    }

        function makeMissile(){
            if(count%3 != 0){
                return;
            }
            var obj = {};
            obj.x = unitX;
            obj.y = unitY+15;
            obj.isDead = false;
            missileList.push(obj);
        }
        function moveMissile(){
            for(var i=0; i<missileList.length;i++){
                var tmp=missileList[i];
                tmp.x=tmp.x+100;
                if(tmp.x >= 1500){
                    tmp.isDead=true;
                }
            }
        }
        function checkMissile(){
            for(var i=missileList.length-1;i>=0;i--){
                var tmp = missileList[i];
                if(tmp.isDead){
                    missileList.splice(i,1);
                }
            }
        }

        function drawPilot(){
             // 비행기 이미지 그리기
             ctx.drawImage(pilotImgs[pilotIndex],unitX-50,unitY-50,100,100);
        }
       function movePlane(){
        // drawPilot();
        
        if(rightPressed) {
            unitX += 7;
           
        } 
        if(leftPressed) {
            unitX -= 7;
            if(unitX <= 50){
                leftPressed = false;
                unitX = 50;
            }
            
        }
        if(upPressed){
            unitY -= 7;
            if(unitY <= 50){
                upPressed = false;
                unitY = 50;
            }
            
        }
        if(downPressed){
            unitY += 7;
            if(unitY >= 650){
                downPressed = false;
                unitY = 650;
            }
            
        }
        if(stopMove == 1){
            clearInterval(movePlane);
        }
    }
        setInterval(movePlane,10);

        function checkPilotHit(){
            for(var i=0; i<enemyList.length;i++){
                var tmp = enemyList[i];
                var isPilotDie = unitX > tmp.x-50&&unitX<tmp.x+50&&unitY>tmp.y-50&&unitY<tmp.y+50;
                if(isPilotDie){
                    clearInterval(intervalID);
                    stopMove = 1;
                    gameover = 1;
                    pilotDie = true;
                    ctx.drawImage(pilotImgs[2],unitX-50,unitY-50,100,100);
                    sendScore("http://localhost:3000/desertwar/sendScore",score);
                    restart();
                    }
            }
        }
        function checkMissHit(){
            for(var i=0; i<missileList.length;i++){
                var miss = missileList[i];
                for(var j=0; j<enemyList.length;j++){
                    var enemy = enemyList[j];
                    var isShooted = miss.x>enemy.x-50&&miss.x<enemy.x+50&&miss.y>enemy.y-50&&miss.y<enemy.y+50;
                    if(isShooted){
                        miss.isDead=true;
                        enemy.energy -= 50;
                        if(enemy.energy <= 0){
                            enemy.isDead = true;
                            ctx.drawImage(pilotImgs[2],enemy.x-50,enemy.y-50,100,100);
                            if(enemy.type ==0 ){
                                score += 10;
                            } else if(enemy.type == 1){
                                score+=20;
                            }
                        }
                    }
                }
            }
        }
    }

    function restart(){
        var btn = document.createElement('button');
            document.querySelector('#overlay').appendChild(btn);
            document.querySelector('button').outerHTML = '<button id="play_btn" onclick="init()" >Restart!</button>';
            
    }
    // function firstPage(){
    //     var firstpage = document.querySelector('canvas');
    //     document.querySelector('#container').appendChild(firstpage); 
    //     document.querySelector('canvas').outerHTML = '<canvas id="myCanvas" width="1500" height="700" >'
    //     init();
        //rebtninit();
    //     var rebtn = document.createElement('button');
    //     document.querySelector('#overlay').appendChild(rebtn);
    //     document.querySelector('button').outerHTML = '<button id="play_btn" onclick="init()" >Play!</button>'
    //}
    // function rebtninit(){
    //     var rebtn = document.createElement('button');
    //     document.querySelector('#container').appendChild(rebtn);
    //     document.querySelector('button').outerHTML = '<button id="play_btn" onclick="init()" >Play!</button>'
        
    
    // }   
    
    function sendScore(url,score){
        var data = JSON.stringify({'score':score});
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);

        xhr.addEventListener("load", function(){
            var getData = JSON.parse(xhr.responseText);
            alert("game over");
        })
    }
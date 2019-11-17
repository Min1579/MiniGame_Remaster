const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

const path = require('path');
const bodyParser = require('body-parser');

const userList = [];
io.on('connection', function(socket) {
    
  
    // 접속한 클라이언트의 정보가 수신되면
    socket.on('login', function(data) {
      console.log('Client logged-in:\n name:' + data.name + 
      '\n userid: ' + data.userid);
      userList.push(data.name)
      console.log(userList);
      
      // socket에 클라이언트 정보를 저장한다
      socket.name = data.name;
      socket.userid = data.userid;
      socket.list = userList;
      // 접속된 모든 클라이언트에게 메시지를 전송한다
      io.emit('login', {name:data.name, list: userList} );
    });
  
    // 클라이언트로부터의 메시지가 수신되면
    socket.on('chat', function(data) {
      console.log('Message from %s: %s', socket.name, data.msg);
  
      var msg = {
        from: {
          name: socket.name,
          userid: socket.userid
        },
        msg: data.msg
      };
  
      // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
      socket.broadcast.emit('chat', msg);
  
      // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
      // socket.emit('s2c chat', msg);
  
      // 접속된 모든 클라이언트에게 메시지를 전송한다
     io.emit('s2c chat', msg);
  
      // 특정 클라이언트에게만 메시지를 전송한다
      // io.to(id).emit('s2c chat', data);
    });
  
    // force client disconnect from server
    socket.on('forceDisconnect', function() {
      socket.disconnect();
    })
  
    socket.on('disconnect', function() {
      console.log('user disconnected: ' + socket.name);
        for (name in userList) {
          if (name == socket.name) delete name;
        } 
    });

    socket.on('update', () =>{
      const list = JSON.stringify(userList);
      console.log(list)
      io.emit('update', list);
    })
  });

  //room 설정
  const chat = io.of('/chat').on('connection', function(socket) {
    socket.on('chat message', function(data){
      console.log('message from client: ', data);
  
      var name = socket.name = data.name;
      var room = socket.room = data.room;
  
      // room에 join한다
      socket.join(room);
      // room에 join되어 있는 클라이언트에게 메시지를 전송한다
      chat.to(room).emit('chat message', data.msg);
    });
  });
  

//routing
const indexRouter = require('./router/index');
const gameRouter = require('./router/game');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use('/game', gameRouter);
app.use('/',indexRouter);

server.listen(3000, () => {
    console.log('server started!');
});
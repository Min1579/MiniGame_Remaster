const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require('path');
const bodyParser = require('body-parser');


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
 

const users = {}
const userList = [];

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    userList.push(name);
    console.log(userList);
    
    io.emit('user-connected', {name:name, userList:userList});
    
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    userList.forEach(name => {
      if (name === users[socket.id])  delete name;
    });
    socket.broadcast.emit('user-disconnected',{name:users[socket.id], userList:userList} );
    
    socket.broadcast.emit()
    delete users[socket.id]
  })
})

server.listen(3000, () => {
    console.log('server started!');
});

module.exports = io;

const ajaxRouter = require('./router/ajax')
const indexRouter = require('./router/index');
const catchMyMindRouter = require('./router/catchMyMind/catchMyMind');
const dodgeRouter = require('./router/dodge/dodge');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/check',ajaxRouter)
app.use('/catchMyMind', catchMyMindRouter);
app.use('/dodge',dodgeRouter);
app.use('/',indexRouter);

module.exports = server;
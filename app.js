const http = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const rankBoardRouter = require('./routes/rankBoard');
const userBoardRouter = require('./routes/board');
const mypageRouter = require('./routes/mypage');
const dodgeRouter = require('./routes/dodge/dodge');


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server); 


server.listen(3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//세션 설정
app.use(session({
  secret: 'fdasfdsfdsfdsafsadf!@#@#&8',
  resave: false,
  saveUninitialized: false
}));

//passport 초기화
app.use(passport.initialize());
app.use(passport.session());
//connect-flash 메세지전달 쉽게하기 위해 사용
app.use(flash());
//Logger
app.use(logger('dev'));
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cookie-parser
app.use(cookieParser());
//public folder 고정
app.use(express.static(path.join(__dirname, 'public')));



//routing
app.use('/mypage', mypageRouter);
app.use('/users', usersRouter);
app.use('/board', userBoardRouter);
app.use('/rank', rankBoardRouter)
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/dodge',dodgeRouter);
app.use('/', indexRouter);


// socket control (Dont touch)
const rooms = { }

app.get('/cmm', (req, res) => {
  res.render('catchMind/main', { rooms: rooms })
})

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/cmm')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/cmm')
  }
  res.render('catchMind/room', { roomName: req.params.room })
})

io.on('connection', socket => {

  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
  socket.on('mousedown', (x,y,drawingt) => {
    socket.to(room).broadcast.emit('mousedown', x,y,drawing);
  })
  socket.on('mousemove', (x,y) => {
    socket.to(room).broadcast.emit('mousemove', x,y);
  })
  socket.on('mouseup', () => {

  })
  //socket.on('change', () => {  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}
/**    Socket end  */
//dodge



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)  => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

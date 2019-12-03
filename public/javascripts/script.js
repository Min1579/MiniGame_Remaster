//const socket = io('http://localhost:3000')
const socket = io(`https://${window.location.hostname}:${window.location.port}`);
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const userList = document.querySelector('ul.list-group');

if (messageForm != null) {
  const name = prompt('이름을 입력하세요') //getUserName();
  appendMessage(`${name} 님이 입장`)
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`${name}: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

socket.on('update-userlist', nameList => {
  output = ""
  nameList.forEach(name => {
    output += `<li class="list-group-item">${name}</li>`
  })
  userList.innerHTML = output;
})


socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', (name => {
  appendMessage(`${name} connected`)
}))

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
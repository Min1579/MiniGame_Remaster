const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if (messageForm != null) {
<<<<<<< HEAD
  const name = prompt('your name?') 
=======
  const name = prompt('your name?')
>>>>>>> 0b62fabfcbd752c363ce80f847230b11e7e3b16c
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

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
<<<<<<< HEAD
  roomLink.href = `/${room}`
=======
  roomLink.href = `${room}`
>>>>>>> 0b62fabfcbd752c363ce80f847230b11e7e3b16c
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
<<<<<<< HEAD

=======
>>>>>>> 0b62fabfcbd752c363ce80f847230b11e7e3b16c

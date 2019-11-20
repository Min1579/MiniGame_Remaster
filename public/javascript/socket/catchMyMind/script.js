const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', data => {
  appendMessage(`${data.name} connected`)
  
  const list = document.querySelector('#user-group');
  updateUserList(data.userList);
});

socket.on('user-disconnected', data => {
  appendMessage(`${data.name} disconnected`);
  updateUserList(data.userList);
})

function updateUserList(users) {
    const list = document.querySelector('#user-group');
  let result = ''  
  users.forEach(element => {
      result +=  `<li class="list-group-item">${element}</li>`;
    })
    list.innerHTML = result;
}

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}





const { nanoid } = require('nanoid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db/messages.json')
const db = low(adapter)

db.defaults({
  messages: [
    {
      messageId: '1',
      userId: 1,
      senderName: 'Admin',
      messageText: 'Message from initial messages db state. Welcome to chat!',
      createdAt: '2021-01-14',
    },
  ],
}).write()

module.exports = (io, socket) => {
  const getMessages = () => {
    const messages = db.get('messages').value()
    io.in(socket.roomId).emit('messages', messages)
  }

  const addMessage = (message) => {
    db.get('messages')
      .push({
        messageId: nanoid(8),
        createdAt: new Date(),
        ...message,
      })
      .write()
    getMessages()
  }

  const removeMessage = (messageId) => {
    db.get('messages').remove({ messageId }).write()
    getMessages()
  }

  socket.on('message:get', getMessages)
  socket.on('message:add', addMessage)
  socket.on('message:remove', removeMessage)
}

const app = require('express')()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})

const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')

const onConnection = (socket) => {
  console.log('User connected')
  const { roomId } = socket.handshake.query
  socket.roomId = roomId
  socket.join(roomId)

  registerMessageHandlers(io, socket)
  registerUserHandlers(io, socket)

  socket.on('disconnect', () => {
    console.log('User disconnected')
    socket.leave(roomId)
  })
}

io.on('connection', onConnection)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})

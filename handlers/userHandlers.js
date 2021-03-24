const users = {
  1: { username: 'Admin', online: false },
}

module.exports = (io, socket) => {
  const getUsers = () => {
    io.in(socket.roomId).emit('users', users)
  }

  const addUser = ({ username, userId }) => {
    users[userId] = { username, online: true }
    getUsers()
  }

  const removeUser = (userId) => {
    users[userId].online = false
    getUsers()
  }

  socket.on('user:get', getUsers)
  socket.on('user:add', addUser)
  socket.on('user:leave', removeUser)
}

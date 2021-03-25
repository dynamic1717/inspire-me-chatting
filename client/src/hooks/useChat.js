import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useBeforeUnload } from './useBeforeUnload'

const SERVER_URL = window.location.href

export const useChat = (userId, username, roomId) => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: roomId,
    })

    socketRef.current.onAny((event, ...args) => {
      console.log(event, args)
    })

    if (userId) {
      socketRef.current.emit('user:add', { username, userId })
    }

    socketRef.current.on('users', (users) => {
      setUsers(users)
    })

    socketRef.current.emit('message:get')

    socketRef.current.on('messages', (messages) => {
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      )
      setMessages(newMessages)
    })

    return () => socketRef.current.disconnect()
  }, [roomId, userId, username])

  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit('message:add', { userId, messageText, senderName })
  }

  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })

  return { users, messages, sendMessage, removeMessage }
}

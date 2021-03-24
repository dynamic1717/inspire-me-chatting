import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useChat } from '../hooks/useChat'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Messages from './Messages'

const NewChat = () => {
  const [name, setName] = useState('')
  const [userData, setUserData] = useLocalStorage('inspire-me-userData')
  const [roomId, setRoomId] = useState('general')
  const { users, messages, sendMessage, removeMessage } = useChat(
    userData?.userId,
    userData?.username,
    roomId
  )
  const [text, setText] = useState('')

  const activeUsers = Object.values(users).filter((u) => u.online).length

  console.log(users)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleSetUsername = () => {
    setUserData({ username: name, userId: nanoid(8) })
  }

  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed) {
      sendMessage({ messageText: text, senderName: userData.username })
      setText('')
    }
  }

  return (
    <div className='chat'>
      <div className='chat__wrapper'>
        {!userData && (
          <div className='chat__login text-center'>
            <p>Enter your name and start chatting!</p>
            <InputGroup>
              <Form.Control
                type='text'
                name='username'
                id='username'
                value={name}
                onChange={handleChangeName}
              />
              <InputGroup.Append>
                <Button variant='info' onClick={handleSetUsername}>
                  Start Chatting
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        )}

        <div className='chat__header'>
          <p className='m-0'>Users online: {activeUsers}</p>
          <h4 className='text-center'>Real-Time Chat</h4>
          <p className='m-0'>You: {userData?.username}</p>
        </div>

        <Messages
          userData={userData}
          messages={messages}
          removeMessage={removeMessage}
        />

        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                as='textarea'
                rows={1}
                name='text'
                id='text'
                value={text}
                onChange={handleChangeText}
                disabled={!userData}
                style={{ resize: 'none' }}
              />
              <InputGroup.Append>
                <Button
                  type='submit'
                  onClick={handleSendMessage}
                  disabled={!userData}
                  variant='info'
                >
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default NewChat

import React, { useEffect, useRef } from 'react'
import { ListGroup } from 'react-bootstrap'
import TimeAgo from 'react-timeago'

const Messages = ({ userData, messages, removeMessage }) => {
  const messagesEndRef = useRef()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <div className='chat__messages overflow-auto'>
      <ListGroup variant='flush'>
        {messages.map((msg) => (
          <ListGroup.Item
            key={msg.messageId}
            className='chat__message-item d-flex justify-content-between p-2'
          >
            <p>
              <strong>{msg.senderName}</strong>: {msg.messageText}
            </p>
            {userData?.userId === msg.userId && (
              <button
                className='chat__message-del'
                onClick={() => removeMessage(msg.messageId)}
              >
                &times;
              </button>
            )}
            <TimeAgo date={msg.createdAt} className='text-muted' />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <span ref={messagesEndRef}></span>
    </div>
  )
}

export default Messages

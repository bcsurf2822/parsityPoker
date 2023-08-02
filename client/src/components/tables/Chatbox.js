import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, ListGroup } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import {addMessage} from '../../rtk/slices/chatSlice';

export default function Chatbox({ gameId}) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const chatMessages = useSelector((state) => state.chat.messages);

  // Use a ref to persist the socket value across renders.
  const socket = useRef();

  useEffect(() => {
    // Initialize socket only once.
    socket.current = socketIOClient("http://localhost:4000");

    socket.current.on('chat message', (msg) => {
      console.log(`Received message: ${msg.message}`);  // <-- add this line
      if (msg.gameId === gameId) {
        dispatch(addMessage(msg));
      }
    });
    

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    if (message !== '') {
      console.log(`Sending message: ${message}`);  // <-- add this line
      socket.current.emit('chat message', { user: user.username, message, gameId });
      setMessage('');
    }
  };

  return (
    <div>
   <div className="chatArea">
  <ListGroup variant="flush">
    {chatMessages.filter(msg => msg.gameId === gameId).map((msg, index) => 
      <ListGroup.Item key={index}><strong>{msg.user}</strong>: {msg.message}</ListGroup.Item>
    )}
  </ListGroup>
</div>
<Form.Control type="text" placeholder="Type your message" value={message} onChange={handleMessageChange} />
<Button onClick={handleMessageSend}>Send</Button>
    </div>
  );
};
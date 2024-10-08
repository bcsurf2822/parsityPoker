import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, ListGroup } from "react-bootstrap";
import { addMessage } from "../../rtk/slices/chatSlice";

export default function Chatbox({ gameId }) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const chatMessages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    function onChatMessage(msg) {
      console.log(`Received message: ${msg.message}`);
      if (msg.gameId === gameId) {
        dispatch(addMessage(msg));
      }
    }
  }, [gameId, dispatch]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    if (message !== "") {
      console.log(`Sending message: ${message}`);
    }
  };

  return (
    <div className="containerBox">
      <div className="chatArea">
        <ListGroup variant="flush">
          {chatMessages
            .filter((msg) => msg.gameId === gameId)
            .map((msg, index) => (
              <ListGroup.Item key={index}>
                <strong>{msg.user}</strong>: {msg.message}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
      <div className="chatText">
         <Form.Control
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={handleMessageChange}
      />
      </div>
     
      <Button onClick={handleMessageSend}>Send</Button>
    </div>
  );
}

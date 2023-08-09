import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, ListGroup } from "react-bootstrap";
import { socket } from "../../socket";
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

    socket.on("chat message", onChatMessage);

    return () => {
      socket.off("chat message", onChatMessage);
    };
  }, [gameId, dispatch]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    if (message !== "") {
      console.log(`Sending message: ${message}`);
      socket.emit("chat message", { user: user.username, message, gameId });
      setMessage("");
    }
  };

  return (
    <div>
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
      <Form.Control
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={handleMessageChange}
      />
      <Button onClick={handleMessageSend}>Send</Button>
    </div>
  );
}

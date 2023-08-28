import React, { useState, useRef, useEffect, useContext } from 'react';
import { Paper, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import UserContext from '../../components/UserContext';

const chatAreaStyle = {
  maxHeight: '85vh',
  overflowY: 'auto',
  padding: '16px',
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};


const messageBubbleStyle = {
  backgroundColor: '#e0e0e0',
  padding: '5px 15px 5px 15px',
  borderRadius: '25px',
  marginBottom: '8px',
  display: 'inline-block',
  wordWrap: 'break-word', // Allow long words to break
};

const senderMessageBubbleStyle = {
  ...messageBubbleStyle,
  backgroundColor: '#007bff',
  color: '#fff'
};

const senderNameStyle = {
  fontSize: '0.8rem',
  marginBottom: '4px',
};

const ChatArea = () => {
  // Fetch current authenticated user
  const currentUser = useContext(UserContext).currentUser;
  const currentUserID = currentUser.userid;

  const testMessages = [
    {userid: '401', sender: "me", message: 'I am fine'}, 
    {userid: '402', sender: "test", message: 'Goodbye'},
    {userid: '403', sender: "test", message: 'lorem ipsum It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'}];
  const [messages, setMessages] = useState(testMessages);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null); // Ref for the bottom of the chat area

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, {userid: currentUserID, sender: "me", message: newMessage}]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Paper elevation={3} style={chatAreaStyle}>
      <List>
        {messages.map((message, index) => (
            <ListItem key={index}>
              <div>
                <div style={senderNameStyle}>
                    <Typography variant="caption">{message.sender}</Typography>
                </div>
                <div style={message.userid === currentUserID ? senderMessageBubbleStyle : messageBubbleStyle}>
                  <ListItemText primary={message.message} />
                </div>
            </div>
            </ListItem>
        ))}
      </List>
      <div style={{ flexGrow: 1 }} ref={chatEndRef}></div>
      <div style={{ display: 'flex' }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default ChatArea;

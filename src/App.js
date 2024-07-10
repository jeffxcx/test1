import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    const response = await API.post('ChatAPI', '/send', {
      body: { message },
    });
    setMessages([...messages, response]);
    setMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Chat
        message={message}
        setMessage={setMessage}
        messages={messages}
        setMessages={setMessages}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

function Chat({ message, setMessage, messages, setMessages, handleSendMessage }) {
  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;

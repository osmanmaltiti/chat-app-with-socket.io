import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import Protected from '../component/protected-route';

const App = () => {
  const [socket, setSocket] = useState();
  const [input, setInput] = useState();
  const [user, setUser] = useState();
  const [chat, setChat] = useState([]);
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const connect = io('http://localhost:5000');
    setUser(JSON.parse(currentUser));
    setSocket(connect);
  },[]);

  if(typeof socket !== 'undefined'){
    socket.on('connect', () => {
      console.log(socket.id)
    });

    socket.on("recieved message", (value) => {
      setChat([...chat, value])
    });
  }

  const SendChat = () => {
    const new_chat = {
      id: user.id,
      name: user.name,
      message: input
    }
    socket.emit("chat message", new_chat);
  }

  return (
    <div className='main-home'>
      <div className='chat-area'>
        {
          chat
            .map(item => <div className='texts'>
                          
                          { item.id === user.id ? 
                              <h3 className='user-message'>{item.name}</h3>:
                              <h3>{item.name}</h3>
                          }
                          { item.id === user.id ? 
                              <p className='user-message'>{item.message}</p>:
                              <p>{item.message}</p>
                          }
                        </div>)
        }
      </div>
      <div className='text-area'>
        <input value={input} className='input' onChange={(e) => setInput(e.target.value)}/>
        <button className='send-button' onClick={() => SendChat()}>Send</button>
      </div>
    </div>
  )
}

export default Protected(App);
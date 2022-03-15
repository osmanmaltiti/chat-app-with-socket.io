import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const connect = io('http://localhost:5000');
    setSocket(connect);
  },[]);

  if(typeof socket !== 'undefined'){
    socket.on('connect', () => {
      console.log(socket.id)
    })
  }

  return (
    <div className='main-home'>
      <div className='chat-area'>
        {
          Array(10)
            .fill('Dolor aute ut sit excepteur.')
            .map(item => <div className='texts'>
                          <h3>Name</h3>
                          <p>{item}</p>
                        </div>)
        }
      </div>
      <div className='text-area'>
        <input className='input'/>
        <button className='send-button'>Send</button>
      </div>
    </div>
  )
}

export default App
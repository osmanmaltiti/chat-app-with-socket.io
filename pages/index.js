import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  
  useEffect(() => {
    const connect = io('http://localhost:5000');
    setSocket(connect);
  },[]);

  if(typeof socket !== 'undefined'){
    socket.on('connect', () => {
      console.log(socket.id)
    });

    socket.on("feedback", (value) => {
      console.log(value)
    });

    socket.on("game", (game) => {
      console.log(game)
    });
  }

  const createRoom = () => {
    socket.emit("create-room", {room: id});
  }

  const joinRoom = () => {
    socket.emit("join-room", {room: id}, message => {
      console.log(message)
    });
  }

  return (
    <div className='form'>
      <input value={name} className='input' onChange={(e) => setName(e.target.value)} placeholder='User Name'/>
      <input value={id} className='input' onChange={(e) => setId(e.target.value)} placeholder='Room Id'/>
      <button className='btn' onClick={() => createRoom()}>Create Room</button>
      <button className='btn' onClick={() => joinRoom()}>Join Room</button>
    </div>
  )
}

export default App;
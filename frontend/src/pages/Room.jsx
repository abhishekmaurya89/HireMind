import React, { useState } from 'react'
import CodeEditor from '../components.js/CodeEditor';
import Chats from '../components.js/Chats';
import Particpants from '../components.js/Particpants';

function Room() {
    const [code,setCode]=useState("");
    const [chats,setChats]=useState([]);
    const [participants,setParticipants]=useState([]);

  return (
    <div>
        <Particpants participants={participants}/>
        <Chats chats={chats} setChats={setChats}/>
        <CodeEditor code={code} setCode={setCode}/>
    </div>
  )
}

export default Room
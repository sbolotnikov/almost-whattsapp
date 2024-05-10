
import {createContext, useState} from 'react';
export const CallContext = createContext();

const CallProvider= ({ children }) => {
    const [audioOnly, setAudioOnly]=useState(false);
    const [newCall, setNewCall]=useState(false);
    const [callerName, setCallerName]=useState('');
    const [groupCall, setGroupCall]=useState(false);
    const [callerNameImg, setCallerImg]=useState('');
    const [room, setRoom]=useState('');
  return (
    <CallContext.Provider value={{ audioOnly, setAudioOnly, newCall, setNewCall,callerName, setCallerName,groupCall, setGroupCall,callerNameImg, setCallerImg, room, setRoom}}>
      {children}
    </CallContext.Provider>
  );
  };
  
  export default CallProvider;


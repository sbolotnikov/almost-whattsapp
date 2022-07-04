
import {createContext, useState} from 'react';
export const CallContext = createContext();

const CallProvider= ({ children }) => {
    const [audioOnly, setAudioOnly]=useState(false)
  return (
    <CallContext.Provider value={{ audioOnly, setAudioOnly}}>
      {children}
    </CallContext.Provider>
  );
  };
  
  export default CallProvider;


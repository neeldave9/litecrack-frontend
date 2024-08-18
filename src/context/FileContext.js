import { createContext, useState, useContext } from 'react';


const FileNameContext = createContext();
const FileNameProvider = ({ children }) => {
  const [fileName, setFileName] = useState('');
  return (
    <FileNameContext.Provider value={{fileName, setFileName}}>
      {children}
    </FileNameContext.Provider>
  );
};
export const useFileName = () => {
  return useContext(FileNameContext);
};
export default FileNameProvider;

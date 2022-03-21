import { createContext, useState } from 'react';

export type DarkModeContext = [boolean, (darkMode: boolean) => void];

export const DarkModeContext = createContext<DarkModeContext>([false, () => {}]);

export const DarkModeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  )
}

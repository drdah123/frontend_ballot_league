import { createContext, PropsWithChildren, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface GeneralContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isConnectedToTabs: boolean;
  setIsConnectedToTabs: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: GeneralContextProps = {
  theme: 'light',
  toggleTheme: () => {},
  isConnectedToTabs: false,
  setIsConnectedToTabs: () => {},
};

const GeneralContext = createContext<GeneralContextProps>(defaultContext);

const [isConnectedToTabs, setIsConnectedToTabs] = useState<boolean>(false);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <GeneralContext.Provider
      value={{ theme, toggleTheme, isConnectedToTabs, setIsConnectedToTabs }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = (): GeneralContextProps =>
  useContext(GeneralContext);

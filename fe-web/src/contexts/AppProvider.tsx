import React, { createContext, useMemo, useState } from 'react';
import { Elusiv } from '@elusiv/sdk';
import { noop } from 'lodash';

interface AppProviderProps {
  children?: React.ReactNode;
  wallet: {
    elusiv: Elusiv | undefined;
    setElusiv: (elusiv: Elusiv | undefined) => void;
  };
}

export const AppContext = createContext<AppProviderProps>({
  wallet: {
    elusiv: undefined,
    setElusiv: noop,
  },
});

export function AppContextProvider({ children }: AppProviderProps) {
  const [elusiv, setElusiv] = useState<Elusiv | undefined>();

  const memoizedValue = useMemo(
    () => ({
      wallet: {
        elusiv,
        setElusiv,
      },
    }),
    [elusiv, setElusiv]
  );

  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
}

import React, { createContext, useContext, useState, useCallback } from 'react';
import UserCardModal from '../components/shared/UserCardModal';

interface UserCardModalContextType {
  showUserCard: (userId: string) => void;
}

const UserCardModalContext = createContext<UserCardModalContextType | null>(
  null
);

interface UserCardModalProviderProps {
  children: React.ReactNode;
}

const showUserCard = useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  const hideUserCard = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  const contextValue = { showUserCard };

  return (
    <UserCardModalContext.Provider value={contextValue}>
      {children}
      <UserCardModal userId={selectedUserId} onClose={hideUserCard} />
    </UserCardModalContext.Provider>
  );
};

export const useUserCardModal = (): UserCardModalContextType => {
  const context = useContext(UserCardModalContext);

  if (!context) {
    throw new Error(
      'useUserCardModal must be used within UserCardModalProvider'
    );
  }

  return context;
};

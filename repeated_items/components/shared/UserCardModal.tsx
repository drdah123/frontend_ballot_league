import React from 'react';
import UserCard from './UserCard';

interface UserCardModalProps {
  userId: string | null;
  onClose: () => void;
}

const UserCardModal: React.FC<UserCardModalProps> = ({ userId, onClose }) => {
  if (!userId) {
    return null;
  }

  return <UserCard userId={userId} back={onClose} />;
};

export default UserCardModal;

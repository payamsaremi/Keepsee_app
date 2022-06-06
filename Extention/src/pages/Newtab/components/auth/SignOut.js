import { Button } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../hooks/Auth';
import useSetState from '../../hooks/useSetState';
import useBackupData from '../../hooks/useBackupData';
import { useNavigate } from 'react-router-dom';
export default function SignOut({ setToggleSideMenu, data, setState }) {
  const { signOut, user } = useAuth();

  const getBackup = useBackupData(user, data);
  const navigate = useNavigate();

  const signUserOutWithBackup = () => {
    console.log('signing off');
    getBackup();
    signOut();
    window.localStorage.clear();
    setState(); //just set to initial state
    setToggleSideMenu(false);
    navigate('/tabManager', { replace: true });
  };
  return (
    <>
      <Button
        onClick={() => signUserOutWithBackup()}
        variant={'ghost'}
        colorScheme={'red'}
      >
        Sign out
      </Button>
    </>
  );
}

import React, { useState } from 'react';
import BasicModal from '../modal/BasicModal';
import { BiCog } from 'react-icons/bi';
import BasicIconButton from '../utils/BasicIconButton';
import { useAuth } from '../../hooks/Auth';
import SignOut from '../auth/SignOut';
import SignIn from '../auth/SignIn';
import { Text } from '@chakra-ui/react';
export default function SettingsMenuButton({ data, setState }) {
  const { user, profile, signOut, signIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <BasicIconButton onClick={ToggleMenu} icon={<BiCog size="18" />} />
      <BasicModal
        title={'Settings'}
        buttonTitle={'Done'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => saveSettings()}
        // dataUnready={profile ? false : true}
        // isSaving={isSaving}
      >
        {user ? (
          <SignOut setToggle={ToggleMenu} data={data} setState={setState} />
        ) : (
          <Text fontSize={'md'} color={'red.600'}>
            <SignIn setToggle={ToggleMenu} data={data} setState={setState} />
          </Text>
        )}
      </BasicModal>
    </>
  );
}

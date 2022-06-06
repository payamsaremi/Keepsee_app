import {
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { supabase } from '../../../../supabaseClient';
import { useAuth } from '../../hooks/Auth';
import BasicModal from '../modal/BasicModal';
function SignIn({ setToggleSideMenu, data, setState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { user, signUp, signIn, loading } = useAuth();
  const toast = useToast();

  //Restore userDataBackup from DB if any
  const setUserBackupData = async (newUser) => {
    console.log('set userBackupData', newUser);

    let { data: userDataBackup, error } = await supabase
      .from('userDataBackup')
      .select('*')

      .eq('user', newUser?.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (userDataBackup) {
      const state = userDataBackup.data;
      setState(state);
    }
    if (error) {
      console.log(error);
    }
  };

  const toaster = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: true,
      variant: 'solid',
      position: 'top',
    });
  };

  const signInUser = async () => {
    setIsLoading(true);
    const { user: newUser, error } = await signIn({
      email: email,
      password: password,
    });
    if (newUser) {
      toaster('You have logged in successfully.', '', 'success');
      setEmail('');
      setPassword('');
      setToggleSideMenu(false);
      setIsOpen(false);
      setUserBackupData(newUser);
      setIsLoading(false);
    }
    if (error) {
      toaster(error.message, '', 'error');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        _focus={{ boxShadow: 'none' }}
        colorScheme={'orange'}
        bgColor={'orange.500'}
        color={'orange.50'}
        variant={'solid'}
        size={'sm'}
        onClick={() => setIsOpen(true)}
      >
        <Text fontWeight={'bold'}>Sign in</Text>
      </Button>
      <BasicModal
        title={'Sign in'}
        buttonTitle={'Sign in'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => signInUser()}
        isSaving={isLoading}
      >
        <VStack spacing={'2'}>
          <FormControl>
            <FormLabel color={'gray.600'}>Email</FormLabel>
            <Input
              variant="filled"
              placeholder={'name@example.com'}
              value={email}
              type={'email'}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  signInUser();
                }
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={'gray.600'}>Password</FormLabel>
            <Input
              variant="filled"
              placeholder={'password'}
              value={password}
              type={'password'}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  signInUser();
                }
              }}
            />
          </FormControl>
        </VStack>
      </BasicModal>
    </>
  );
}

export default SignIn;

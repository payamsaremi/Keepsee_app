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
import { useAuth } from '../../hooks/Auth';
import { supabase } from '../../../../supabaseClient';
import useBackupData from '../../hooks/useBackupData';
import BasicModal from '../modal/BasicModal';
function SignUp({ data, setState }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { signUp } = useAuth();

  const toast = useToast();
  const toaster = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      variant: 'solid',
      position: 'top',
    });
  };

  // make a backup of current state of localStorage send to DB
  const getBackup = useBackupData();

  const makeBackUpCurrentState = (user) => {
    console.log('Making an image of current state of localStorage');
    getBackup(user, data);
  };

  const signUpUser = async () => {
    setIsLoading(true);
    const { user: newUser, error } = await signUp({
      email: email,
      password: password,
    });
    //check if user alredy exist
    const { data: userWithEmail } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userWithEmail) {
      setIsLoading(false);
      setError({ message: 'User with this email exists' });
      toaster('User with this email exists', '', 'error');
      throw new Error('User with this email exists');
    }
    if (error) {
      setIsLoading(false);
      setError(error);
      toaster(error.message, '', 'error');
      throw new Error(error.message);
    }
    if (newUser) {
      //make a backup of current localState
      makeBackUpCurrentState(newUser);
      //Create a userProfile when an auth user is created.
      const { data: userProfile, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            email: newUser.email,
            id: newUser.id,
          },
        ]);
      if (insertError) {
        setError(insertError.message);
        console.log(insertError.message);
        throw new Error(insertError);
      }
      console.log('userProfile', userProfile);
    }
    console.log('user is in', newUser);
    toaster(
      'Success! Activation link has been sent to your email',
      `Please check your inbox ${newUser.email}`,
      'success'
    );
    setError('');
    setIsLoading(false);
    setIsOpen(false);
    setEmail('');
    setPassword('');
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
        <Text fontWeight={'bold'}>Become a member</Text>
      </Button>
      <BasicModal
        title={'Sign up'}
        buttonTitle={'Confirm'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => signUpUser()}
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
                  signUpUser();
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
                  signUpUser();
                }
              }}
            />
          </FormControl>
        </VStack>
      </BasicModal>
    </>
  );
}

export default SignUp;

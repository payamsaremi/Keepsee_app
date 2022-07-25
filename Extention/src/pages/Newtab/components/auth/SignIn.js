import {
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { supabase } from '../../../../supabaseClient';
import { useAuth } from '../../hooks/Auth';
import BasicModal from '../modal/BasicModal';
import Google from '../../../../compponents/icons/Google';
function SignIn({ setToggle, data, setState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { user, signIn, loading } = useAuth();
  const toast = useToast();

  const toaster = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: true,
      variant: 'solid',
      position: 'top'
    });
  };

  const signInUser = async () => {
    setIsLoading(true);
    const { user: newUser, error } = await signIn({
      email: email,
      password: password
    });
    if (newUser) {
      // setUserBackupData(newUser);
      toaster('You have logged in successfully.', '', 'success');
      setEmail('');
      setPassword('');
      setToggle(false);
      setIsOpen(false);
      setIsLoading(false);
    }
    if (error) {
      toaster(error.message, '', 'error');
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setIsLoading(true);
    const { data: newUser, session, error } = await signIn({ provider });
    if (newUser) {
      console.log('newUser', newUser);
      console.log('session', session);

      toaster('You have logged in successfully.', '', 'success');
      setEmail('');
      setIsLoading(false);
    }
    if (error) {
      toaster('Error', error.message, 'error');
    }
    setIsLoading(false);
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
        <Box>
          <Button
            rounded={'2xl'}
            colorScheme={useColorModeValue('cyan', 'gray')}
            variant={useColorModeValue('outline', 'solid')}
            size={'lg'}
            type="submit"
            leftIcon={<Google />}
            // isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleOAuthSignIn('google')}
          >
            Continue with Google
          </Button>
        </Box>
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

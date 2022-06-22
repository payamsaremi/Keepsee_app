import {
  Button,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Checkbox,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../../Newtab/hooks/Auth';
import { supabase } from '../../../supabaseClient';
import Logo from '../../../compponents/Logo';
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
      //make a backup of current localState
      console.log('Making an image of current state of localStorage');

      const makeDataBackup = async (data, user) => {
        const { data: userDataBackup, error } = await supabase
          .from('userDataBackup')
          .insert({ data: data, user: user.id });
        if (error) {
          console.log(error);
        }
        if (userDataBackup) console.log('made a backup');
        return userDataBackup;
      };
      makeDataBackup(data, newUser);
    }

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
      <Box
        h={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bgGradient="linear(to-r, cyan.50, cyan.100, blue.50)"
      >
        <Box
          display={'flex'}
          flexDir={'column'}
          w={'60vw'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            w={'50%'}
            bgColor={'white'}
            p={'5'}
            rounded={'2xl'}
            boxShadow={'md'}
            display={'flex'}
            flexDir={'column'}
            justifyContent={'start'}
          >
            <Box bg={'gray.100'} p={'5'} w={'100%'}>
              Google{' '}
            </Box>
            <Box>
              <VStack spacing={'4'}>
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
                <Box w={'100%'}>
                  <Checkbox colorScheme={'cyan'} _focus={{ boxShadow: 'none' }}>
                    <Text fontSize={'sm'} color="gray.600">
                      I can provide feedback to improve Kip.
                    </Text>
                  </Checkbox>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  w={'100%'}
                >
                  <Button
                    variant={'ghost'}
                    rounded={'2xl'}
                    bg={`cyan.50`}
                    colorScheme={'cyan'}
                    //   onClick={onSave}
                    isLoading={isLoading}
                  >
                    <Text fontSize={'lg'}>Sign up</Text>
                  </Button>
                </Box>
                <Text>Alredy a member? click here to Log In.</Text>
              </VStack>
            </Box>
          </Box>
        </Box>
        {/* <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            h={'100vh'}
            w={'40vw'}
            bgColor={'inherit'}
          >
            <Box
              p={'4'}
              bgColor={'white'}
              h={'90vh'}
              w={'100%'}
              mx={'5'}
              rounded={'2xl'}
            ></Box>
          </Box> */}
      </Box>
    </>
  );
}

export default SignUp;

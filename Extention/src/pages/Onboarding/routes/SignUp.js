import React, { useState } from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
  Input,
  HStack,
  Divider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { supabase } from '../../../supabaseClient';
import { useToast } from '@chakra-ui/react';
import Google from '../../../compponents/icons/Google';
import { useAuth } from '../../Newtab/hooks/Auth';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    content: '',
  });
  const { signUp, user } = useAuth();
  const { signIn } = useAuth();

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

  const handleSignup = async () => {
    setLoading(true);
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
      setLoading(false);
      setMessage({ message: 'User with this email exists' });
      toaster('User with this email exists', '', 'error');
      throw new Error('User with this email exists');
    }
    if (error) {
      setLoading(false);
      setMessage('error', error.message);
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
        setMessage('error', insertError.message);
        console.log(insertError.message);
        throw new Error(insertError);
      }
      console.log('userProfile', userProfile);
      //   navigate('/');
    }

    toaster(
      'Success! Activation link has been sent to your email',
      `Please check your inbox ${newUser.email}`,
      'success'
    );

    console.log(message);

    setMessage('');
    setLoading(false);
    setEmail('');
    setPassword('');
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: 'error', content: error.message });
      toaster('Error', error.message, 'error');
    }
    setLoading(false);
  };

  return (
    <Box
      display={'flex'}
      flexDir={'column'}
      bgColor={'white'}
      w={'md'}
      p={'5'}
      rounded={'2xl'}
    >
      <Button
        rounded={'2xl'}
        colorScheme={useColorModeValue('cyan', 'gray')}
        variant={useColorModeValue('outline', 'solid')}
        size={'lg'}
        type="submit"
        leftIcon={<Google />}
        disabled={loading}
        onClick={() => handleOAuthSignIn('google')}
      >
        Continue with Google
      </Button>

      <HStack my={6}>
        <Divider />
        <Text fontSize="md" whiteSpace="nowrap" color="muted">
          or
        </Text>
        <Divider />
      </HStack>
      <Box>
        <Box display={'flex'} justifyContent={'center'} w={'100%'}>
          <Text textColor={'gray.600'} fontSize={'xl'} fontWeight={'semibold'}>
            Sign up
          </Text>
        </Box>
        <VStack spacing={'3'}>
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
                  handleSignup();
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
                  handleSignup();
                }
              }}
            />
          </FormControl>
          <Box w={'100%'}>
            <Checkbox colorScheme={'cyan'} _focus={{ boxShadow: 'none' }}>
              <Text fontSize={'sm'} color="gray.600">
                I'm willing to provide feedback to improve Kip.
              </Text>
            </Checkbox>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'end'}
            alignItems={'center'}
            w={'100%'}
          >
            <Button
              variant={'ghost'}
              rounded={'2xl'}
              border={'1px'}
              borderColor={'cyan.400'}
              bg={`cyan.50`}
              colorScheme={'cyan'}
              onClick={() => handleSignup()}
              isLoading={loading}
              isDisabled={loading || !email.length || !password.length}
            >
              <Text fontSize={'lg'}>Sign up</Text>
            </Button>
          </Box>
          <Text fontSize={'md'}>
            Alredy a member? <a>click here to Log In.</a>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignUp;

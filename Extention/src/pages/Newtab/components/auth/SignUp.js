import {
  Button,
  Text,
  Box,
  FormControl,
  useColorModeValue,
  FormLabel,
  Input,
  VStack,
  Divider,
} from '@chakra-ui/react';
import Google from '../../../../compponents/icons/Google';
import React, { useState } from 'react';

function SignUp({
  data,
  setState,
  signUpUser,
  email,
  password,
  setEmail,
  setPassword,
  isLoading,
  handleOAuthSignIn,
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'start'}
        alignItems={'center'}
        mb={'8'}
      >
        <Button
          rounded={'2xl'}
          // colorScheme={useColorModeValue('cyan', 'gray')}
          variant={useColorModeValue('solid', 'solid')}
          border={'1px'}
          size={'lg'}
          w={'full'}
          type="submit"
          leftIcon={<Google size={'22px'} />}
          isLoading={isLoading}
          disabled={isLoading}
          onClick={() => handleOAuthSignIn('google')}
        >
          Continue with Google
        </Button>
      </Box>
      <Divider mb={'5'} />
      <Box>
        <VStack spacing={'2'}>
          <FormControl>
            <FormLabel color={useColorModeValue(`gray.600`, `gray.300`)}>
              Email
            </FormLabel>
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
            <FormLabel color={useColorModeValue(`gray.600`, `gray.300`)}>
              Password
            </FormLabel>
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
      </Box>
    </>
  );
}

export default SignUp;

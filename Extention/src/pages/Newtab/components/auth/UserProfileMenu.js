import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  Input,
  FormLabel,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/Auth';
import BasicModal from '../modal/BasicModal';
import { supabase } from '../../../../supabaseClient';
function UserProfileMenu() {
  const { profile, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setName(profile?.full_name);
    setEmail(profile?.email);
    setUsername(profile?.username);
  }, [profile, loading]);

  const saveSettings = async () => {
    try {
      setIsSaving(true);
      const { data, error, status } = await supabase
        .from('users')
        .update({ full_name: name, username: username })
        .eq('email', email);

      if (error && status !== 406) {
        throw error;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsOpen(false);
      setIsSaving(false);
    }
  };

  const labelColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <>
      <Box
        rounded={'xl'}
        h={'8'}
        w={'8'}
        p={'4'}
        bgColor={useColorModeValue('white', 'gray.800')}
        shadow={'sm'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        cursor={'pointer'}
        color={useColorModeValue('gray.600', 'gray.100')}
        onClick={() => setIsOpen(!isOpen)}
        _hover={useColorModeValue(
          { bgColor: 'gray.50' },
          { bgColor: 'gray.700' }
        )}
      >
        <Text
          fontSize={'sm'}
          fontWeight={'medium'}
          textAlign={'center'}
          textTransform={'capitalize'}
          textColor={useColorModeValue('gray.700', 'gray.300')}
        >
          {profile?.email.slice(0, 2)}
        </Text>
      </Box>

      <BasicModal
        title={'Profile Settings'}
        buttonTitle={'Save'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => saveSettings()}
        dataUnready={profile ? false : true}
        isSaving={isSaving}
      >
        {/* Profile Image selector */}
        <Box display={'flex'} mb={'5'} alignItems={'center'}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bg={'gray.200'}
            w={'20'}
            h={'20'}
            rounded={'2xl'}
          >
            <Text fontSize={'2xl'} color={'gray.400'}>
              +
            </Text>
          </Box>
          <Box display={'flex'} flexDir={'column'} mx={'2'} p={'2'}>
            {name && (
              <Box>
                <Text
                  fontSize={'xl'}
                  color={labelColor}
                  fontWeight={'medium'}
                  textTransform={'capitalize'}
                >
                  Hello, {name}
                </Text>
              </Box>
            )}

            {username && (
              <Box>
                <Text
                  fontSize={'medium'}
                  color={labelColor}
                  fontWeight={'semibold'}
                >
                  @{username}
                </Text>
              </Box>
            )}
            {email && (
              <Box>
                <Text fontSize={'sm'} color={labelColor} fontWeight={'light'}>
                  {email}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        <VStack spacing={'2'}>
          <FormControl>
            <FormLabel color={labelColor}>Email</FormLabel>
            <Input
              variant="filled"
              placeholder={'email'}
              value={email}
              type={'email'}
              isDisabled
            />
          </FormControl>
          <FormControl>
            <FormLabel color={labelColor}>Name</FormLabel>
            <Input
              variant="filled"
              placeholder={"What's your name?"}
              value={name ? name : ''}
              type={'text'}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  saveSettings();
                }
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={labelColor}>Username</FormLabel>
            <Input
              variant="filled"
              placeholder={'Choose a username.'}
              value={username}
              type={'text'}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  saveSettings();
                }
              }}
            />
          </FormControl>
        </VStack>
      </BasicModal>
    </>
  );
}

export default UserProfileMenu;

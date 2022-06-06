import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  FormControl,
  Input,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/Auth';
import BasicModal from '../modal/BasicModal';
import { supabase } from '../../../../supabaseClient';
function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { profile } = useAuth();

  useEffect(() => {
    setName(profile?.full_name);
    setEmail(profile?.email);
    setUsername(profile?.username);
  }, [profile]);

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

  return (
    <>
      <Box
        rounded={'xl'}
        h={'10'}
        w={'10'}
        p={'4'}
        bgColor={'white'}
        shadow={'sm'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        cursor={'pointer'}
        color={'gray.600'}
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ color: 'gray.700' }}
      >
        <Text
          fontSize={'lg'}
          fontWeight={'medium'}
          textAlign={'center'}
          textTransform={'capitalize'}
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
                  color={'gray.600'}
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
                  color={'gray.600'}
                  fontWeight={'semibold'}
                >
                  @{username}
                </Text>
              </Box>
            )}
            {email && (
              <Box>
                <Text fontSize={'sm'} color={'gray.500'} fontWeight={'light'}>
                  {email}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        <VStack spacing={'2'}>
          <FormControl>
            <FormLabel color={'gray.500'}>Email</FormLabel>
            <Input
              variant="filled"
              placeholder={'email'}
              value={email}
              type={'email'}
              isDisabled
            />
          </FormControl>
          <FormControl>
            <FormLabel color={'gray.500'}>Name</FormLabel>
            <Input
              variant="filled"
              placeholder={"What's your name?"}
              value={name}
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
            <FormLabel color={'gray.500'}>Username</FormLabel>
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

import React, { useEffect, useState } from 'react';
import SignUp from './SignUp';
import BasicModal from '../modal/BasicModal';
import SignIn from './SignIn';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/Auth';
import { supabase } from '../../../../supabaseClient';
function Auth({ data, setState }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      setIsOpen(true);
    }
  }, [isOpen, user]);

  const toaster = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      variant: 'solid',
      position: 'top'
    });
  };

  const signUpUser = async () => {
    setIsLoading(true);
    const { user: newUser, error } = await signUp({
      email: email,
      password: password
    });

    //check if user alredy exist
    const { data: userWithEmail } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userWithEmail) {
      //if user exist log the user in
      signInUser();
      setIsLoading(false);
    }
    if (newUser) {
      //Create a userProfile when an auth user is created.

      const { data: userProfile, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            email: newUser.email,
            id: newUser.id
          }
        ]);
      if (insertError) {
        console.log(insertError.message);
      }
      if (error) {
        if (userWithEmail) {
          return;
        }
        toaster(error.message, '', 'error');
        setIsLoading(false);
        throw new Error(error.message);
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

      toaster('🎉 You have registered succesfully!', `${email}`, 'success');
      setEmail('');
      setPassword('');
      setIsOpen(false);
    }
    if (error) {
      toaster(error.message, `${email}`, 'error');
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const signInUser = async () => {
    setIsLoading(true);
    const {
      user: newUser,
      session,
      error
    } = await signIn({
      email: email,
      password: password
    });
    if (newUser) {
      console.log('newUser', newUser);
      console.log('session', session);
      toaster('You have logged in successfully.', '', 'success');
      setEmail('');
      setPassword('');
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
      <BasicModal
        title={'Register or sign in to your account.'}
        buttonTitle={'Confirm'}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSave={() => signUpUser()}
        isSaving={isLoading}
      >
        <SignUp
          data={data}
          setState={setState}
          setIsOpen={setIsOpen}
          signUpUser={signUpUser}
          isLoading={isLoading}
          setEmail={setEmail}
          email={email}
          setPassword={setPassword}
          password={password}
          handleOAuthSignIn={handleOAuthSignIn}
        />
      </BasicModal>
    </>
  );
}

export default Auth;

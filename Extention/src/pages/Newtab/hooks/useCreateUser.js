import { supabase } from '../../../supabaseClient';
import React, { useEffect } from 'react';
import { useState } from 'react';

const createUser = async (user) => {
  console.log(user);
  //first check if the user already exist
  const { data: userWithEmail } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (userWithEmail) {
    throw new Error('User with that email exists');
  }

  const { user: userData, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (signUpError) {
    throw signUpError;
  }

  if (userData) {
    //Create a userProfile when an auth user is created.
    const { data: userProfile, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email: userData.email,
          id: userData.id,
        },
      ]);
  }

  return userData;
};

export default function useCreateUser() {
  return (data) => createUser(data);
}

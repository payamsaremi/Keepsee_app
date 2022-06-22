import React, { useContext, createContext, useState, useEffect } from 'react';

import { supabase } from '../../../supabaseClient';
import useSetState from './useSetState';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const { data, setState } = useSetState();
  const session = supabase.auth.session();

  useEffect(() => {
    setUserBackupData(user);
  }, [session?.user.id]);

  useEffect(() => {
    setUser(session?.user ?? null);
    getUserProfile(session?.user ?? null);
    setLoading(false);
    console.log('session', session);
    //listen to changes for auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        getUserProfile(session?.user ?? null);

        setLoading(false);
      }
    );

    //Clean up useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  //Restore userDataBackup from DB if any
  const setUserBackupData = async (newUser) => {
    if (newUser) {
      let { data: userDataBackup, error } = await supabase
        .from('userDataBackup')
        .select('*')
        .eq('user', newUser?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (userDataBackup) {
        const state = userDataBackup.data;
        console.log('state', state);
        setState(state);
      }
      if (error) {
        console.log(error);
      }
    }
  };

  //get User's Profile
  const getUserProfile = async (user) => {
    if (user) {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();
      if (userProfile) {
        setProfile(userProfile);
      }
      if (error) {
        console.log(error);
      }
    }
  };

  //Create signUp,signIn, signOut functions
  const value = {
    setState,
    data,
    signUp: async (data) => supabase.auth.signUp(data),
    signIn: async (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
    loading,
    profile,
  };

  //use aprovider to pass down value

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

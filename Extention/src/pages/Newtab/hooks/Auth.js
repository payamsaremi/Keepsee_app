import React, { useContext, createContext, useState, useEffect } from 'react';

import { supabase } from '../../../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const session = supabase.auth.session();
  useEffect(() => {
    setUser(session?.user ?? null);
    setLoading(false);

    //listen to changes for auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    //Clean up useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, []);

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
        setError(error);
      }
    }
  };
  useEffect(() => {
    getUserProfile(user);
  }, [session]);

  //Create signUp,signIn, signOut functions
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
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
};

export const useAuth = () => {
  return useContext(AuthContext);
};

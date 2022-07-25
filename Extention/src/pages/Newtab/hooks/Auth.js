import React, { useContext, createContext, useState, useEffect } from 'react';

import { supabase } from '../../../supabaseClient';
import useSetState from './useSetState';
import { v4 as uuidv4 } from 'uuid';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [spaceData, setSpaceData] = useState();
  const session = supabase.auth.session();
  const {
    data,
    setState,
    unManagedTabs,
    managedTabs,
    setManagedTabs,
    setUnmanagedTabs
  } = useSetState();

  useEffect(() => {
    setUserBackupData(user);
  }, [session?.user.id]);

  useEffect(() => {
    setUser(session?.user ?? null);
    getUserProfile(session?.user ?? null);
    setLoading(false);

    //listen to changes for auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event == 'SIGNED_OUT') {
          setUser(null);
          getUserProfile(null);
          setLoading(false);
          console.log('SIGNED_OUT :((((((((', session);
        }
        if (event == 'TOKEN_REFRESHED') console.log('TOKEN_REFRESHED', session);
        if (event == 'SIGNED_IN') {
          // console.log('SIGNED_IN', session);
          getOrCreateProfile(session.user);
          setUser(session?.user ?? null);
          getUserProfile(session?.user ?? null);
          setLoading(false);
          return;
        }
      }
    );

    //Clean up useEffect hook
    return () => {
      listener?.unsubscribe();
    };
  }, [session?.user.id]);

  //check if Loggedin user has userProfile or not if not, create profile
  const getOrCreateProfile = async (newUser) => {
    if (newUser) {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', newUser?.id)
        .single();
      if (!userProfile || error) {
        //create userProfile
        const { data: userProfile, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              email: newUser.email,
              id: newUser.id,
              username: newUser.email.split('@', 1)[0]
            }
          ]);
        if (userProfile) {
          // console.log('userProfile', userProfile);
          return;
        }
        if (insertError) {
          throw new Error(insertError.message);
        }
      }
      if (userProfile) {
        // console.log('userProfile', userProfile);
        return;
      }
    }
    return;
  };

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
        console.log('userDataBackup', userDataBackup);

        const backupData = userDataBackup.data;
        modifyData(backupData);

        //Change the shape of data into spaces
        console.log('backupData.spaces', backupData.spaces);
        if (backupData.spaces) {
          //! if its already with spaces dont do any modification on data
          const state = { ...backupData };
          setState(state);
          return;
        }

        const id = 'space-' + uuidv4();
        const newState = {
          backupData: backupData.backUpCount,
          spaces: {
            [id]: {
              id: id,
              title: 'Untitled',
              ...backupData
            }
          }
        };
        setState(newState);
        console.log(newState, 'newState');
      }
      if (error) {
        console.log(error);
      }
    }
  };

  //! This function modifyData() must be removed when all datas are propery adjusted for all users.
  const modifyData = (backupData) => {
    //Turns columns.TaskIds Keys to Urls instead of their ids
    const columnsClone = Object.assign({}, backupData.columns);
    Object.values(columnsClone).map((tab) => {
      const newTabIds = tab.taskIds.reduce((a, x) => {
        a.push(backupData.tasks[x].url);
        return a;
      }, []);
      tab.taskIds = newTabIds;
    });

    //Change the Key of all tasks to their urls for more uniqueness
    const tasksClone = Object.assign({}, backupData.tasks);
    console.log('tasksClone', tasksClone);
    Object.keys(tasksClone).map((key) => {
      if (key === undefined) return;
      if (tasksClone[key].url === key) return;
      tasksClone[tasksClone[key].url] = tasksClone[key];
      delete tasksClone[key];
    });
    console.log('tasksClone', tasksClone);
    backupData.tasks = tasksClone;
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
    signUp: async (data) => supabase.auth.signUp(data),
    signIn: async (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
    loading,
    profile,
    data,
    setState,
    unManagedTabs,
    managedTabs,
    setManagedTabs,
    setUnmanagedTabs
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

import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
function useBackupData(user, data) {
  // const { data } = useSetState();

  if (user) {
    return () => {
      const backedUpData = makeDataBackup(data, user);
      console.log('did a backup.', backedUpData);
    };
  }
  return () => console.log('no user');
}

export default useBackupData;

const makeDataBackup = async (data, user) => {
  const { data: userDataBackup, error } = await supabase
    .from('userDataBackup')
    .insert({ data: data, user: user.id });
  if (error) {
    console.log(error);
  }
  return userDataBackup;
};

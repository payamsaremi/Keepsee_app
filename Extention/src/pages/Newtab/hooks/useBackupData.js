import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
function useBackupData(user, data) {
  if (user) {
    return () => {
      // delete data.columns['column-1'];

      const backedUpData = makeDataBackup(data, user);
      console.log('did a backup.', backedUpData);
    };
  }
  return () => console.log('no user', user);
}

export default useBackupData;

const makeDataBackup = async (data, user) => {
  console.log('user', user);
  const { data: userDataBackup, error } = await supabase
    .from('userDataBackup')
    .insert({ data: data, user: user.id, email: user.email });
  if (error) {
    console.log(error);
  }
  return userDataBackup;
};

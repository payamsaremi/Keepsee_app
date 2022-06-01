import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

//TODO: To make a backup everyday with date and time and store it in database for each user.

export default function useBackupData(data) {
  const [backedupData, setBackedupData] = useState();
  useEffect(() => {
    //Todo:make a backup on firstUsage after 24 hours
    makeDataBackup();
  }, []);

  const makeDataBackup = async () => {
    //get the latest data and send it to Database
    try {
      const { data: stateDataBackup, error } = await supabase
        .from('stateDataBackup')
        .insert({ data: data });
      setBackedupData(stateDataBackup);
    } catch (err) {
      console.log(err);
    }
  };
  return backedupData;
}

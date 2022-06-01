import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';

export default function useQueryFromSupabase(from, select) {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let { data, error } = await supabase.from(from).select(select);
      setData(data);
      if (error) {
        setError(error);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { data: data, error: error };
}

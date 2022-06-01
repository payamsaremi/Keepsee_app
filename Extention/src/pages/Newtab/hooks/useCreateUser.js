import { supabase } from '../../../supabaseClient';
import { useMutation, useQueryClient } from 'react-query';

const createUser = async (user) => {
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

  return userData;
};
export default function useCreateUser(user) {
  return useMutation(() => createUser(user), {
    onSuccess: async (data) => {
      console.log(data);
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            email: user.email,
            id: data.id,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      return insertData;
    },
  });
}

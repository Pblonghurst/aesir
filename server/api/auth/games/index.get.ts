import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const { data, error } = await client.from('games').select('*').eq('user_id', user.id);

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }

  return data;
});

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

  const body = await readBody(event);
  const { name, image_url, rules_text, rules_file_url } = body;

  if (!name) {
    throw createError({
      statusCode: 400,
      message: 'Name is required',
    });
  }

  const { data, error } = await client
    .from('games')
    .insert({
      name,
      image_url,
      rules_text,
      rules_file_url,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }

  return data;
});

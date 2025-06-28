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

  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Game ID is required',
    });
  }

  const body = await readBody(event);
  const { name, image_url, rules_text, rules_file_url } = body;

  const { data, error } = await client
    .from('games')
    .update({
      name,
      image_url,
      rules_text,
      rules_file_url,
    })
    .eq('id', Number(id))
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Game not found',
    });
  }

  return data;
});

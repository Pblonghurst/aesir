// server/api/profiles/[id].put.ts
import { serverSupabaseClient } from '#supabase/server';
import { defineEventHandler, readBody, sendError, createError } from 'h3';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  // 2) Get the currently authenticated user (via the cookie/jwt)
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
  }

  // 3) Extract the dynamic [id] parameter from the URL
  const { id } = event.context.params as { id: string };

  // If you want to allow a user to update *any* profile, skip this check.
  if (user.id !== id) {
    // If the logged‐in user’s ID doesn’t match the :id in the path, forbid it
    return sendError(event, createError({ statusCode: 403, statusMessage: 'Forbidden' }));
  }

  // 4) Read JSON payload from the request body
  const payload = (await readBody(event)) as {
    username?: string;
    first_name?: string;
    last_name?: string;
  };

  // 5) Validate that username is provided
  if (payload.username === undefined || payload.username === null) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Username is required' }));
  }

  // 6) Validate username length (trim and check)
  const trimmedUsername = payload.username.trim();
  if (!trimmedUsername) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Username is required' }));
  }
  
  if (trimmedUsername.length < 3) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Username must be at least 3 characters' }));
  }

  // 7) Perform the update in the "profiles" table
  const { data: updatedProfile, error: updateError } = await supabase
    .from('profiles')
    .update({
      username: trimmedUsername,
      first_name: payload.first_name?.trim() || null,
      last_name: payload.last_name?.trim() || null,
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return sendError(event, createError({ statusCode: 500, statusMessage: updateError.message }));
  }

  // 8) Return the updated profile row
  return {
    success: true,
    profile: updatedProfile,
  };
});

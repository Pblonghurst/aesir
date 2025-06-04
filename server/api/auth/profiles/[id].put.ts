// server/api/profiles/[id].put.ts
import { serverSupabaseClient } from '#supabase/server';
import { defineEventHandler, readBody, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  // 1) Create a server‐side Supabase client with service_role key
  const supabase = await serverSupabaseClient(event);

  // 2) Get the currently authenticated user (via the cookie/jwt)
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    // If no valid session, return 401 Unauthorized
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
  }

  // 3) Extract the dynamic [id] parameter from the URL
  //    e.g. if the request was PUT /api/profiles/abc123, then id === "abc123"
  const { id } = event.context.params as { id: string };

  //    If you want to allow a user to update *any* profile, skip this check.
  if (user.id !== id) {
    // If the logged‐in user’s ID doesn’t match the :id in the path, forbid it
    return sendError(event, createError({ statusCode: 403, statusMessage: 'Forbidden' }));
  }

  // 4) Read JSON payload from the request body
  //    Expect something like: { username: "newName", bio?: "...", avatar_url?: "..." }
  const payload = (await readBody(event)) as {
    username?: string;
  };

  // 5) Validate that at least one updatable field is present
  if (payload.username === undefined) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Nothing to update' }));
  }

  // 6) Perform the update in the "profiles" table
  const { data: updatedProfile, error: updateError } = await supabase
    .from('profiles')
    .update({
      username: payload.username,
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return sendError(event, createError({ statusCode: 500, statusMessage: updateError.message }));
  }

  // 7) Return the updated profile row
  return {
    success: true,
    profile: updatedProfile,
  };
});

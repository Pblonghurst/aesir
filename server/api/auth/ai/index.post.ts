import 'dotenv/config';
import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';
import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const clientAi = new OpenAI();
  const {
    data: { user },
  } = await client.auth.getUser();

  //  check if user is authenticated
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  // get the question from the body
  const body = await readBody(event);
  const { question } = body;

  // create the response
  const response = await clientAi.responses.create({
    model: 'gpt-4o-mini',
    instructions: 'Talk like a pirate.',
    input: question,
  });

  return response.output_text;
});

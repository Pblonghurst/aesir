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
  const { question, game_name, game_rules } = body;

  // create the response
  const response = await clientAi.responses.create({
    model: 'gpt-4o-mini',
    instructions: `You are a helpful assistant that can only answer questions about the game ${game_name}. The game rules are: ${game_rules}. You are not allowed to answer questions that are not related to the game.`,
    input: question,
  });

  return response.output_text;
});

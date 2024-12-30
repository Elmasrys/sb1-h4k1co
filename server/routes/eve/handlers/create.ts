import { FastifyReply, FastifyRequest } from 'fastify';
import { EVEModelSchema } from '../../../models/eve';
import { createClient } from '@supabase/supabase-js';
import config from '../../../config';

export async function createEVEHandler(
  request: FastifyRequest<{
    Body: Omit<z.infer<typeof EVEModelSchema>, 'id' | 'created_at' | 'updated_at'>
  }>,
  reply: FastifyReply
) {
  const supabase = createClient(config.supabase.url, config.supabase.anonKey);

  try {
    const { data: eve, error } = await supabase
      .from('eves')
      .insert({
        ...request.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return reply.code(201).send(eve);
  } catch (err) {
    request.log.error(err, 'Failed to create EVE');
    return reply.code(500).send({ error: 'Failed to create EVE' });
  }
}
import { FastifyReply, FastifyRequest } from 'fastify';
import { createClient } from '@supabase/supabase-js';
import config from '../../../config';

export async function getEVEHandler(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply
) {
  const supabase = createClient(config.supabase.url, config.supabase.anonKey);

  try {
    const { data: eve, error } = await supabase
      .from('eves')
      .select()
      .eq('id', request.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return reply.code(404).send({ error: 'EVE not found' });
      }
      throw error;
    }

    return reply.send(eve);
  } catch (err) {
    request.log.error(err, 'Failed to get EVE');
    return reply.code(500).send({ error: 'Failed to get EVE' });
  }
}
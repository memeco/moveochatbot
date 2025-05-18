import type { NextApiRequest, NextApiResponse } from 'next';
import { getCalendarEvents } from '@/lib/calendar';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const content = await getCalendarEvents(email);

  return res.json({
    output: {
      live_instructions: {
        conteudo: `Eventos do usuário:\n${content}`
      }
    }
  });
}

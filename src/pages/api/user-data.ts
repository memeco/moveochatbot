import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserByPhone } from '@/lib/sheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone } = req.body;
  const data = await getUserByPhone(phone);
  if (!data) return res.status(404).json({ error: 'Usuário não encontrado' });

  return res.json({
    output: {
      live_instructions: {
        conteudo: `Dados do usuário:\n${JSON.stringify(data, null, 2)}`
      }
    }
  });
}

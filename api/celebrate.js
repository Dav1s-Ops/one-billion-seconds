import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  const key = 'celebrate_count';

  if (req.method === 'POST') {
    try {
      const count = await redis.incr(key);
      res.status(200).json({ count });
    } catch (error) {
      console.error('Redis Increment Error:', error);
      res.status(500).json({ error: 'Failed to increment count' });
    }
  } else if (req.method === 'GET') {
    try {
      const count = (await redis.get(key)) || 0;
      res.status(200).json({ count });
    } catch (error) {
      console.error('Redis Get Error:', error);
      res.status(500).json({ error: 'Failed to get count' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
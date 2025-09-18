import Fastify from 'fastify';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

// DB em memória (simples)
let seq = 1;
const db = new Map();
// seed opcional
db.set(String(seq), { id: String(seq++), name: 'Capacete F1', price: 199.9 });
db.set(String(seq), { id: String(seq++), name: 'Camiseta Equipe', price: 99.9 });

// Health
app.get('/health', async () => ({ status: 'ok' }));

// Listar
app.get('/items', async () => Array.from(db.values()));

// Detalhar
app.get('/items/:id', async (req, reply) => {
  const item = db.get(req.params.id);
  if (!item) return reply.code(404).send({ error: 'Not found' });
  return item;
});

// Criar
app.post('/items', async (req, reply) => {
  const { name, price } = req.body ?? {};
  if (!name || typeof price !== 'number') {
    return reply.code(400).send({ error: 'name (string) e price (number) são obrigatórios' });
  }
  const id = String(seq++);
  const item = { id, name, price };
  db.set(id, item);
  return reply.code(201).send(item);
});

// Atualizar
app.put('/items/:id', async (req, reply) => {
  const { id } = req.params;
  const current = db.get(id);
  if (!current) return reply.code(404).send({ error: 'Not found' });
  const { name, price } = req.body ?? {};
  if (name !== undefined) current.name = name;
  if (price !== undefined) {
    if (typeof price !== 'number') return reply.code(400).send({ error: 'price deve ser number' });
    current.price = price;
  }
  db.set(id, current);
  return current;
});

// Remover
app.delete('/items/:id', async (req, reply) => {
  const ok = db.delete(req.params.id);
  if (!ok) return reply.code(404).send({ error: 'Not found' });
  return reply.code(204).send();
});

// Start
const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;
try {
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🚀 Fastify CRUD API em http://localhost:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

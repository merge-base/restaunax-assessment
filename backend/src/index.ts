import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/orders', ordersRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Restaunax API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📋 Orders API available at http://localhost:${PORT}/api/orders`);
});

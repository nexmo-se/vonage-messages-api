import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
let app = express();
dotenv.config();
let port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
import { sendMessage } from './vonage.js';

app.get('/', (req: Request, res: Response) => {
  let resp = sendMessage();
  res.status(200).send(resp);
});

app.post('/webhooks/inbound', (req: Request, res: Response) => {
  console.log('/inbound req.body', req.body);
});

app.post('/webhooks/status', (req: Request, res: Response) => {
  console.log('/status req.body:', req.body);
  res.status(200).end();
});

app.post('/webhooks/event', (req: Request, res: Response) => {
  console.log('/event req.body:', req.body);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`🌏 Server running at http://localhost:${port}`);
});

import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
let app = express();
dotenv.config();
let port = process.env.PORT;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
import { sendText, sendTemplate, sendCustom } from './vonage.js';

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to Express!');
});

app.get('/sendText', (req: Request, res: Response) => {
  let resp = sendText();
  res.status(200).send(resp);
});

app.get('/sendTemplate', (req: Request, res: Response) => {
  let resp = sendTemplate();
  res.status(200).send(resp);
});

app.get('/sendCustom', (req: Request, res: Response) => {
  let resp = sendCustom();
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

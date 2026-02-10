import express, { type Request, type Response } from 'express';
const app = express();

app.use(express.json());
app.get('/hello', (req: Request, res: Response) => {
  res.send(`Hello bye, ${req.query.person}!`);
});

app.listen(3000);
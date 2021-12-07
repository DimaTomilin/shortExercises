import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!');
    }
    const bmi: string = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({ error: error.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

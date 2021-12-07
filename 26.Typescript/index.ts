import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { execriseCalculator } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daily_exercises: number[] = req.body.daily_exercises as number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target = Number(req.body.target as number);

  try {
    if (daily_exercises === undefined || target === undefined) {
      throw new Error('Parametrs missing!');
    }
    if (
      daily_exercises.find((element: unknown) => isNaN(Number(element))) ||
      isNaN(target)
    ) {
      throw new Error('Provided values were not numbers!');
    }
    res.send(execriseCalculator(daily_exercises, target));
  } catch (error) {
    if (error instanceof Error) {
      res.send({ error: error.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

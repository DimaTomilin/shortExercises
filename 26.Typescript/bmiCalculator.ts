function calculateBmi(heigth: number, weigth: number): string {
  const ibm: number = weigth / Math.pow(heigth / 100, 2);
  if (ibm < 18.5) return 'Underweight (Unhealthy)';

  if (ibm <= 22.9) return 'Normal range (Healthy)';

  if (ibm <= 24.9) return 'Overweight I (At risk)';

  if (ibm <= 29.9) return 'Overweight II (Moderately obese)';

  if (ibm >= 30) return 'Overweight III (Severely obese)';
}

try {
  const a: number = Number(process.argv[2]);
  const b: number = Number(process.argv[3]);

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Provided values were not numbers!');
  }

  console.log(calculateBmi(a, b));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

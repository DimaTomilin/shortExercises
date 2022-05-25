interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const bmiCalculator = (height: number, weight: number): string => {
  const bmiResult: number = weight / (height / 100) ** 2;
  if (bmiResult < 18.5) {
    return 'Underweight (Unhealthy)';
  } else if (bmiResult > 18.5 && bmiResult <= 23) {
    return 'Normal range (Healthy)';
  } else if (bmiResult > 23 && bmiResult <= 25) {
    return 'Overweight I (At risk)';
  } else if (bmiResult > 25 && bmiResult <= 30) {
    return 'Overweight II (Moderately obese)';
  } else {
    return 'Overweight III (Severely obese)';
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

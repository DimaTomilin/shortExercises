interface Statistic {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface RatingResult {
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

interface Arguments {
  arrOfHours: number[];
  target: number;
}

function parseArguments(args: string[]): Arguments {
  if (args.length < 4) throw new Error('Not enough arguments');

  let target: number = 0;
  let arrArguments: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (i === 2 && !isNaN(Number(args[2]))) {
      target = Number(args[2]);
    } else if (!isNaN(Number(args[i]))) {
      arrArguments.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return { arrOfHours: arrArguments, target };
}

function calculateRating(average: number, target: number): RatingResult {
  let rating: 1 | 2 | 3;
  let ratingDescription: string;
  const averageToTarget: number = average / target;
  if (averageToTarget < 0.75) {
    rating = 1;
    ratingDescription = 'It is really bad';
  } else if (averageToTarget < 1) {
    rating = 2;
    ratingDescription = 'It is not bad, but you can better';
  } else {
    rating = 3;
    ratingDescription = 'Really good work. My congratulations';
  }
  return { rating, ratingDescription };
}

function execriseCalculator(arrOfHours: number[], target: number): Statistic {
  let allTrainingTime: number = 0;
  let workedDays: number = 0;
  arrOfHours.map((time: number) => {
    if (time !== 0) {
      ++workedDays;
    }
    allTrainingTime += time;
  });

  const average: number = allTrainingTime / arrOfHours.length;
  const { rating, ratingDescription }: RatingResult = calculateRating(
    average,
    target
  );
  return {
    periodLength: arrOfHours.length,
    trainingDays: workedDays,
    success: target <= average,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { arrOfHours, target } = parseArguments(process.argv);
  console.log(execriseCalculator(arrOfHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

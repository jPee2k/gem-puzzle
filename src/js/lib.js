import _ from 'lodash';

const isSolved = (nums) => {
  let countInversions = 0;

  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[j] > nums[i]) {
        countInversions += 1;
      }
    }
  }

  return countInversions % 2 === 0;
};

const getNewField = () => {
  const numbers = Array.from(Array(15), (v, i) => i + 1);

  let shuffledNums;
  do {
    shuffledNums = _.shuffle(numbers);
  } while (!isSolved(shuffledNums));
  shuffledNums.push(null);

  return _.chunk(shuffledNums, 4);
};

export default getNewField;

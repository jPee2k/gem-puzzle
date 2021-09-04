import _ from 'lodash';

export const isSolved = (nums) => {
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

export const isWin = (state) => {
  const winCombination = state.puzzle.winCombination.flat();
  const currentField = state.puzzle.field.flat();
  return _.isEqual(winCombination, currentField);
};

export const pushRecord = (state, path, current, record) => {
  if (current < record || record === 0) {
    _.set(state, path, current);
  }
};

export const getNewField = () => {
  const numbers = Array.from(Array(15), (v, i) => i + 1);

  let shuffledNums;
  do {
    shuffledNums = _.shuffle(numbers);
  } while (!isSolved(shuffledNums));
  shuffledNums.push(null);

  return _.chunk(shuffledNums, 4);
};

export const findNull = (field) => [...field]
  .reduce((acc, row, i, srcArray) => {
    if (row.includes(null)) {
      const rowIndex = i;
      const dataIndex = row.indexOf(null);
      acc.push(rowIndex, dataIndex);
      srcArray.splice(1); // early eject
    }
    return acc;
  }, []);

export const findNearest = (field, rowIndex, dataIndex) => [
  { value: field[rowIndex - 1]?.[dataIndex], rowIndex: rowIndex - 1, dataIndex },
  { value: field[rowIndex + 1]?.[dataIndex], rowIndex: rowIndex + 1, dataIndex },
  { value: field[rowIndex][dataIndex - 1], rowIndex, dataIndex: dataIndex - 1 },
  { value: field[rowIndex][dataIndex + 1], rowIndex, dataIndex: dataIndex + 1 },
];

export const swapElements = (field, target) => {
  const value = parseInt(target.textContent, 10);
  const [rowIndex, dataIndex] = findNull(field);

  let operationState = false;
  findNearest(field, rowIndex, dataIndex)
    .forEach((data, i, arr) => {
      if (data.value === value) {
        // clicked index ---> [data.rowIndex][data.dataIndex]
        // null index ---> [rowIndex][dataIndex];
        field[data.rowIndex][data.dataIndex] = null;
        field[rowIndex][dataIndex] = data.value;
        operationState = true;
        arr.splice(1); // early eject
      }
    });
  return operationState;
};

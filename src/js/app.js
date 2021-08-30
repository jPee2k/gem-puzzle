import _ from 'lodash';
import { renderElements } from './view.js';
import getNewField from './lib.js';

const findNull = (field) => [...field]
  .reduce((acc, row, i, srcArray) => {
    if (row.includes(null)) {
      const rowIndex = i;
      const dataIndex = row.indexOf(null);
      acc.push(rowIndex, dataIndex);
      srcArray.splice(1); // early eject
    }
    return acc;
  }, []);

const findNearest = (field, rowIndex, dataIndex) => [
  { value: field[rowIndex - 1]?.[dataIndex], rowIndex: rowIndex - 1, dataIndex },
  { value: field[rowIndex + 1]?.[dataIndex], rowIndex: rowIndex + 1, dataIndex },
  { value: field[rowIndex][dataIndex - 1], rowIndex, dataIndex: dataIndex - 1 },
  { value: field[rowIndex][dataIndex + 1], rowIndex, dataIndex: dataIndex + 1 },
];

const swapElements = (field, target) => {
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

const isWin = (state) => {
  const winCombination = state.puzzle.winCombination.flat();
  const currentField = state.puzzle.field.flat();
  return _.isEqual(winCombination, currentField);
};

const app = (state, i18n, elements) => {
  renderElements(state, elements, i18n);
  state.puzzle.field = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null],
  ];

  const { container } = elements.puzzle;

  const onItemClick = (evt) => {
    evt.preventDefault();
    const { data } = state.puzzle;
    if (swapElements(state.puzzle.field, evt.target)) {
      data.steps += 1;
    }
    if (isWin(state)) {
      state.puzzle.field = [
        [null, null, null, null],
        ['Y', 'o', 'u', null],
        [null, 'W', 'i', 'n'],
        [null, null, null, null],
      ];
      if (data.steps < data.record || data.record === 0) {
        data.record = data.steps;
      }
      if (data.time < data.bestTime || data.bestTime === 0) {
        data.bestTime = data.time;
      }
      clearTimeout(state.puzzle.timerId);
      container.removeEventListener('click', onItemClick);
    }
  };

  const startButtonClick = (evt) => {
    evt.preventDefault();
    state.puzzle.processState = 'play';
    state.puzzle.data.time = 0;
    state.puzzle.data.steps = 0;
    state.puzzle.field = getNewField();
    if (state.puzzle.timerId) {
      clearTimeout(state.puzzle.timerId);
    }
    state.puzzle.timerId = setInterval(() => {
      state.puzzle.data.time += 1;
    }, 1000);
    container.addEventListener('click', onItemClick);
  };

  const pauseButtonClick = (evt) => {
    evt.preventDefault();
    if (state.puzzle.timerId) {
      state.puzzle.processState = 'pause';
      container.removeEventListener('click', onItemClick);
      clearTimeout(state.puzzle.timerId);
      state.puzzle.timerId = false;
    } else {
      state.puzzle.processState = 'play';
      container.addEventListener('click', onItemClick);
      state.puzzle.timerId = setInterval(() => {
        state.puzzle.data.time += 1;
      }, 1000);
    }
  };

  container.querySelector('button[data-role="start"]').addEventListener('click', startButtonClick);
  container.querySelector('button[data-role="restart"]').addEventListener('click', startButtonClick);
  container.querySelector('button[data-role="pause"]').addEventListener('click', pauseButtonClick);
};

export default app;

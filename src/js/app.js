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

  findNearest(field, rowIndex, dataIndex)
    .forEach((data) => {
      if (data.value === value) {
        // clicked index ---> [data.rowIndex][data.dataIndex]
        // null index ---> [rowIndex][dataIndex];
        field[data.rowIndex][data.dataIndex] = null;
        field[rowIndex][dataIndex] = data.value;
      } else {
        // TODO voice
      }
    });
};

const isWin = (state) => {
  const winCombination = state.puzzle.winCombination.flat();
  const currentField = state.puzzle.field.flat();
  return _.isEqual(winCombination, currentField);
};

const app = (state, i18n, elements) => {
  const handler = (evt) => {
    evt.preventDefault();
    swapElements(state.puzzle.field, evt.target);

    if (isWin(state)) {
      state.puzzle.field = [
        [null, null, null, null],
        ['Y', 'o', 'u', null],
        [null, 'W', 'i', 'n'],
        [null, null, null, null],
      ];
    }
  };

  state.puzzle.field = getNewField();
  elements.puzzle.container.addEventListener('click', handler);

  renderElements(state, elements, i18n);
};

export default app;

import { renderField } from './view.js';

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

const app = (state, i18n, elements) => {
  renderField(elements, state.puzzle.field);

  const items = elements.puzzle.container.querySelectorAll('td');
  items.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      swapElements(state.puzzle.field, evt.target);
    });
  });
};

export default app;

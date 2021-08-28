import onChange from 'on-change';
import getNewField from './lib.js';

export const renderField = (elements, field) => {
  const { container } = elements.puzzle;
  const oldTable = container.querySelector('table');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const children = field.map((items) => {
    const row = items.map((item) => {
      const td = document.createElement('td');
      if (item === null) {
        td.classList.add('null');
      }
      td.textContent = item;
      return td;
    });
    const tr = document.createElement('tr');
    tr.append(...row);
    return tr;
  });
  tbody.append(...children);
  table.append(tbody);

  if (oldTable) {
    container.replaceChild(table, oldTable);
  } else {
    container.append(table);
  }
};

export const renderElements = (state, elements, i18n) => {
  const resetBtn = document.createElement('button');
  resetBtn.setAttribute('type', 'button');
  resetBtn.textContent = i18n.t('puzzle.buttons.reset');
  resetBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    state.puzzle.field = getNewField();
  });
  elements.puzzle.container.append(resetBtn);
};

const renderChangedItem = (elements, path, value) => {
  const [rowIndex, dataIndex] = path
    .replace('puzzle.field.', '')
    .split('.')
    .map((index) => parseInt(index, 10));

  const table = elements.puzzle.container.querySelector('table tbody');
  const td = table.querySelector(`tr:nth-child(${rowIndex + 1}) td:nth-child(${dataIndex + 1})`);

  if (value === null) {
    td.classList.add('null');
  } else {
    td.classList.remove('null');
  }

  td.textContent = value;
};

const initView = (unwatchedState, i18n, elements) => onChange(unwatchedState, (path, value) => {
  if (path === 'puzzle.field') {
    renderField(elements, value);
  }

  if (path.startsWith('puzzle.field.')) {
    renderChangedItem(elements, path, value);
  }
});

export default initView;

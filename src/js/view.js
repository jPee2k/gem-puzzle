import onChange from 'on-change';

export const renderField = (elements, field) => {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const children = field.map((items) => {
    const row = items.map((item) => {
      const td = document.createElement('td');
      td.textContent = item;
      return td;
    });

    const tr = document.createElement('tr');
    tr.append(...row);
    return tr;
  });
  tbody.append(...children);
  table.append(tbody);
  elements.puzzle.container.replaceChildren(table);
};

const renderChangedItems = (elements, path, value) => {
  const [rowIndex, dataIndex] = path
    .replace('puzzle.field.', '')
    .split('.')
    .map((index) => parseInt(index, 10));

  const table = elements.puzzle.container.querySelector('table tbody');
  const td = table.querySelector(`tr:nth-child(${rowIndex + 1}) td:nth-child(${dataIndex + 1})`);
  td.textContent = value;
};

const initView = (unwatchedState, i18n, elements) => onChange(unwatchedState, (path, value) => {
  if (path === 'puzzle.field') {
    renderField(elements, value);
  }

  if (path.startsWith('puzzle.field.')) {
    renderChangedItems(elements, path, value);
  }
});

export default initView;

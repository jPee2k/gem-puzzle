import onChange from 'on-change';

const appendTable = (newTable, currentTable, infoSection) => {
  if (currentTable) {
    currentTable.replaceWith(newTable);
  } else {
    infoSection.after(newTable);
  }
};

export const renderField = (elements, field) => {
  const { container } = elements.puzzle;
  const infoSection = container.querySelector('.puzzle__info');
  const currentTable = container.querySelector('.puzzle__table');
  const newTable = document.createElement('table');
  const tbody = document.createElement('tbody');
  const children = field.map((items) => {
    const row = items.map((item) => {
      const td = document.createElement('td');
      if (item === null) {
        td.classList.add('puzzle__item--empty');
      }
      td.classList.add('puzzle__item');
      td.textContent = item;
      return td;
    });
    const tr = document.createElement('tr');
    tr.append(...row);
    return tr;
  });
  newTable.classList.add('puzzle__table');
  newTable.append(tbody);
  tbody.append(...children);

  appendTable(newTable, currentTable, infoSection);
};

const createTable = (state, i18n) => {
  const table = document.createElement('table');

  table.classList.add('puzzle__info');
  table.innerHTML = (
    `<thead>
        <th>${i18n.t('puzzle.infoSection.currentDataTitle')}</th>
        <th>${i18n.t('puzzle.infoSection.recordsTitle')}</th>
    </thead>
    <tbody>
      <tr>
        <td class="puzzle__counter">${i18n.t('puzzle.infoSection.counter.count', { count: state.puzzle.data.step })}</td>
        <td class="puzzle__step-record">${state.puzzle.data.stepRecord}</td>
      </tr>
      <tr>
        <td class="puzzle__timer">${i18n.t('puzzle.infoSection.timer', { count: state.puzzle.data.time })}</td>
        <td class="puzzle__time-record">${state.puzzle.data.timeRecord}</td>
      </tr>
    </tbody>`
  );

  return table;
};

const createNav = (state, i18n) => {
  const startBtn = document.createElement('button');
  startBtn.setAttribute('type', 'button');
  startBtn.dataset.role = 'start';
  startBtn.textContent = i18n.t('puzzle.buttons.start');

  const restartBtn = document.createElement('button');
  restartBtn.setAttribute('type', 'button');
  restartBtn.setAttribute('hidden', 'true');
  restartBtn.dataset.role = 'restart';
  restartBtn.textContent = i18n.t('puzzle.buttons.restart');

  const pauseBtn = document.createElement('button');
  pauseBtn.setAttribute('type', 'button');
  pauseBtn.setAttribute('hidden', 'true');
  pauseBtn.dataset.role = 'pause';
  pauseBtn.textContent = i18n.t('puzzle.buttons.pause.on');

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('puzzle__nav');
  buttonsContainer.append(startBtn, restartBtn, pauseBtn);

  return buttonsContainer;
};

const createInstruction = (state, i18n) => {
  const modal = document.createElement('div');
  const container = document.createElement('div');
  const btn = document.createElement('button');

  modal.classList.add('puzzle__modal');
  container.classList.add('modal__container');
  container.innerHTML = (
    `<h2>${i18n.t('puzzle.modal.title')}</h2>
     <p>${i18n.t('puzzle.modal.description.p1')}</p>
     <p>${i18n.t('puzzle.modal.description.p2')}</p>`
  );
  btn.textContent = i18n.t('puzzle.modal.btn');
  btn.setAttribute('type', 'button');
  btn.addEventListener('click', () => {
    modal.setAttribute('hidden', 'true');
  });

  container.append(btn);
  modal.append(container);

  return modal;
};

export const renderElements = (state, elements, i18n) => {
  const table = createTable(state, i18n);
  const nav = createNav(state, i18n);
  const modal = createInstruction(state, i18n);

  const puzzleWrapper = document.createElement('div');
  puzzleWrapper.classList.add('puzzle__wrapper');
  puzzleWrapper.append(table, nav, modal);

  elements.puzzle.container.append(puzzleWrapper);
};

const renderChangedItem = (elements, path, value) => {
  const [rowIndex, dataIndex] = path
    .replace('puzzle.field.', '')
    .split('.')
    .map((index) => parseInt(index, 10));
  const table = elements.puzzle.container.querySelector('.puzzle__table tbody');
  const td = table.querySelector(`tr:nth-child(${rowIndex + 1}) td:nth-child(${dataIndex + 1})`);
  if (value === null) {
    td.classList.add('puzzle__item--empty');
  } else {
    td.classList.remove('puzzle__item--empty');
  }
  td.textContent = value;
};

const stateHandler = (state, i18n, elements, processState) => {
  const { container } = elements.puzzle;
  const startBtn = container.querySelector('button[data-role="start"]');
  const restartBtn = container.querySelector('button[data-role="restart"]');
  const pauseBtn = container.querySelector('button[data-role="pause"]');

  switch (processState) {
    case 'play':
      startBtn.setAttribute('hidden', 'true');
      restartBtn.removeAttribute('hidden');
      pauseBtn.removeAttribute('hidden');
      pauseBtn.classList.remove('blinking');
      pauseBtn.textContent = i18n.t('puzzle.buttons.pause.on');
      break;
    case 'pause':
      pauseBtn.textContent = i18n.t('puzzle.buttons.pause.off');
      pauseBtn.classList.add('blinking');
      break;
    case 'win':
      pauseBtn.setAttribute('hidden', 'true');
      break;
    default:
      throw new Error(i18n.t('puzzle.errors.processState', { processState }));
  }
};

const initView = (unwatchedState, i18n, elements) => {
  const { container } = elements.puzzle;

  const state = onChange(unwatchedState, (path, value) => {
    switch (path) {
      case 'lang':
        document.querySelector('html')
          .setAttribute('lang', value);
        break;
      case 'puzzle.processState':
        stateHandler(state, i18n, elements, value);
        break;
      case 'puzzle.field':
        renderField(elements, value);
        break;
      case 'puzzle.data.step':
        container.querySelector('.puzzle__counter')
          .innerHTML = `${i18n.t('puzzle.infoSection.counter.count', { count: state.puzzle.data.step })}`;
        break;
      case 'puzzle.data.time':
        container.querySelector('.puzzle__timer')
          .innerHTML = `${i18n.t('puzzle.infoSection.timer', { count: state.puzzle.data.time })}`;
        break;
      case 'puzzle.data.stepRecord':
        container.querySelector('.puzzle__step-record')
          .textContent = String(state.puzzle.data.stepRecord);
        break;
      case 'puzzle.data.timeRecord':
        container.querySelector('.puzzle__time-record')
          .textContent = String(state.puzzle.data.timeRecord);
        break;
      default:
        if (path.startsWith('puzzle.field.')) {
          renderChangedItem(elements, path, value);
        }
        if (state.debug) {
          console.info(path);
        }
        break;
    }
  });

  return state;
};

export default initView;

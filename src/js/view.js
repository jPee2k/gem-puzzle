import onChange from 'on-change';

export const renderField = (elements, field) => {
  const { container } = elements.puzzle;
  const infoSection = container.querySelector('.info');
  const oldTable = container.querySelector('table');
  const table = document.createElement('table');
  table.classList.add('table');
  const tbody = document.createElement('tbody');
  const children = field.map((items) => {
    const row = items.map((item) => {
      const td = document.createElement('td');
      if (item === null) {
        td.classList.add('empty');
      }
      td.classList.add('item');
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
    infoSection.after(table);
  }
};

export const renderElements = (state, elements, i18n) => {
  const counter = document.createElement('p');
  counter.classList.add('counter');
  counter.textContent = i18n.t('puzzle.infoSection.counter.count', { count: state.puzzle.data.steps });

  const record = document.createElement('p');
  record.classList.add('record');
  record.innerHTML = `<span>${i18n.t('puzzle.infoSection.record')}</span>${state.puzzle.data.record}`;

  const timer = document.createElement('p');
  timer.classList.add('timer');
  timer.textContent = i18n.t('puzzle.infoSection.timer', { count: state.puzzle.data.time });

  const bestTime = document.createElement('p');
  bestTime.classList.add('best-time');
  bestTime.innerHTML = `<span>${i18n.t('puzzle.infoSection.bestTime')}</span>${state.puzzle.data.bestTime}`;

  const textContainer = document.createElement('div');
  textContainer.classList.add('info');
  textContainer.append(counter, record, timer, bestTime);

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
  buttonsContainer.classList.add('nav');
  buttonsContainer.append(startBtn, restartBtn, pauseBtn);

  elements.puzzle.container.append(textContainer, buttonsContainer);
};

const renderChangedItem = (elements, path, value) => {
  const [rowIndex, dataIndex] = path
    .replace('puzzle.field.', '')
    .split('.')
    .map((index) => parseInt(index, 10));
  const table = elements.puzzle.container.querySelector('table tbody');
  const td = table.querySelector(`tr:nth-child(${rowIndex + 1}) td:nth-child(${dataIndex + 1})`);
  if (value === null) {
    td.classList.add('empty');
  } else {
    td.classList.remove('empty');
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
    default:
      throw new Error(i18n.t('puzzle.errors.processState', { processState }));
  }
};

const initView = (unwatchedState, i18n, elements) => {
  const { container } = elements.puzzle;

  const state = onChange(unwatchedState, (path, value) => {
    switch (path) {
      case 'puzzle.processState':
        stateHandler(state, i18n, elements, value);
        break;
      case 'puzzle.field':
        renderField(elements, value);
        break;
      case 'puzzle.data.steps':
        container.querySelector('.counter')
          .textContent = i18n.t('puzzle.infoSection.counter.count', { count: state.puzzle.data.steps });
        break;
      case 'puzzle.data.record':
        container.querySelector('.record')
          .innerHTML = `<span>${i18n.t('puzzle.infoSection.record')}</span>${state.puzzle.data.record}`;
        break;
      case 'puzzle.data.time':
        container.querySelector('.timer')
          .textContent = i18n.t('puzzle.infoSection.timer', { count: state.puzzle.data.time });
        break;
      case 'puzzle.data.bestTime':
        container.querySelector('.best-time')
          .innerHTML = `<span>${i18n.t('puzzle.infoSection.bestTime')}</span>${state.puzzle.data.bestTime}`;
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

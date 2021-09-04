import { renderElements } from './view.js';
import {
  getNewField, swapElements, isWin, pushRecord,
} from './lib.js';

const onItemClick = (state, container, evt) => {
  evt.preventDefault();
  const { data } = state.puzzle;
  if (swapElements(state.puzzle.field, evt.target)) {
    data.steps += 1;
  }
  if (isWin(state)) {
    state.puzzle.processState = 'win';
    state.puzzle.field = [
      [null, null, null, null],
      ['Y', 'o', 'u', null],
      [null, 'W', 'i', 'n'],
      [null, null, null, null],
    ];
    pushRecord(state, 'puzzle.data.record', data.steps, data.record);
    pushRecord(state, 'puzzle.data.bestTime', data.time, data.bestTime);

    clearTimeout(state.puzzle.timerId);
  }
};

const startButtonClick = (state, container, onItemClickHandler, evt) => {
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
  container.addEventListener('click', onItemClickHandler);
};

const pauseButtonClick = (state, container, onItemClickHandler, evt) => {
  evt.preventDefault();
  if (state.puzzle.timerId) {
    state.puzzle.processState = 'pause';
    container.removeEventListener('click', onItemClickHandler);
    clearTimeout(state.puzzle.timerId);
    state.puzzle.timerId = false;
  } else {
    state.puzzle.processState = 'play';
    container.addEventListener('click', onItemClickHandler);
    state.puzzle.timerId = setInterval(() => {
      state.puzzle.data.time += 1;
    }, 1000);
  }
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

  const onItemClickHandler = onItemClick.bind(null, state, container);
  const startButtonClickHandler = startButtonClick.bind(null, state, container, onItemClickHandler);
  const pauseButtonClickHandler = pauseButtonClick.bind(null, state, container, onItemClickHandler);

  container.querySelector('button[data-role="start"]').addEventListener('click', startButtonClickHandler);
  container.querySelector('button[data-role="restart"]').addEventListener('click', startButtonClickHandler);
  container.querySelector('button[data-role="pause"]').addEventListener('click', pauseButtonClickHandler);
};

export default app;

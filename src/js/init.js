import i18next from 'i18next';
import resources from './locale/index.js';
import initView from './view.js';
import app from './app.js';

const init = async () => {
  const defaultLanguage = 'en';
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  });
  const unwatchedState = {
    debug: true,
    puzzle: {
      timerId: false,
      processState: 'pause', // pause, play
      field: [],
      winCombination: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null],
      ],
      isWin: false,
      data: {
        steps: 0, record: 0, time: 0, bestTime: 0,
      },
    },
  };

  const elements = {
    puzzle: {
      container: document.querySelector('#puzzle'),
    },
  };
  const state = initView(unwatchedState, i18n, elements);
  app(state, i18n, elements);
};

export default init;

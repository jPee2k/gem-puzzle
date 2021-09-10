import i18next from 'i18next';
import resources from './locale/index.js';
import unwatchedState from './state.js';
import initView from './view.js';
import app from './app.js';
import { getLanguage, storageAvailable } from './lib.js';

const langs = ['ru', 'en'];

const init = async () => {
  const defaultLanguage = getLanguage(langs);
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });

  const elements = {
    puzzle: {
      container: document.querySelector('#puzzle'),
    },
  };

  if (storageAvailable()) {
    const storage = window.localStorage;
    unwatchedState.puzzle.data.stepRecord = storage.getItem('step_record') || 0;
    unwatchedState.puzzle.data.timeRecord = storage.getItem('time_record') || 0;
  }

  const state = initView(unwatchedState, i18n, elements);
  state.lang = defaultLanguage;
  app(state, i18n, elements);
};

export default init;

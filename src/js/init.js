import i18next from 'i18next';
import resources from './locale/index.js';
import unwatchedState from './state.js';
import initView from './view.js';
import app from './app.js';

const init = async () => {
  const defaultLanguage = 'en';
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
  const state = initView(unwatchedState, i18n, elements);
  app(state, i18n, elements);
};

export default init;

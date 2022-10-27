import { THEME_SWITCH } from '../actions/types';

const initialState = {
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

const theme = (state = initialState, action) => {
  switch (action.type) {
    case THEME_SWITCH:
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return {
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default theme;

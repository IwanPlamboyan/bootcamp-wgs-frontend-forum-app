import { THEME_SWITCH } from '../actions/types';

const initialState = {
  theme: false,
};

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  initialState.theme = 'dark';
  document.documentElement.classList.add('dark');
} else {
  initialState.theme = 'light';
  document.documentElement.classList.remove('dark');
}

const theme = (state = initialState, action) => {
  switch (action.type) {
    case THEME_SWITCH:
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
      return {
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default theme;

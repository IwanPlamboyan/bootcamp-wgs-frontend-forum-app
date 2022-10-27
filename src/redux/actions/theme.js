import { THEME_SWITCH } from './types';

export const themeSwitch = (theme) => ({
  type: THEME_SWITCH,
  payload: theme,
});

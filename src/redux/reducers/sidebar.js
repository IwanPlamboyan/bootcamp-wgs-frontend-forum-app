import { SIDEBAR_TOGGLE } from '../actions/types';

const initialValue = {
  openSidebar: true,
};

const sidebarToggle = (state = initialValue, action) => {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return { openSidebar: !state.openSidebar };
    default:
      return state;
  }
};

export default sidebarToggle;

import { Store as PullStateStore } from 'pullstate';

import { lists, homeItems, homeItems2, notifications } from '../mock';

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  homeItems,
  homeItems2,
  lists,
  notifications,
  settings: {
    enableNotifications: true,
  },
});

export default Store;

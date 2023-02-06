import { Store as PullStateStore } from 'pullstate';

import { lists, contacts, groups, notifications, pushRangeNotific } from '../mock';

const Store = new PullStateStore({
  safeAreaTop: 0,
  safeAreaBottom: 0,
  menuOpen: false,
  notificationsOpen: false,
  currentPage: null,
  contacts,
  groups,
  lists,
  notifications,
  pushRangeNotific,
  settings: {
    enableNotifications: true,
  },
});

export default Store;

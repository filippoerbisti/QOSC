import { Store as PullStateStore } from 'pullstate';

import { lists, contacts, groups, notifications } from '../mock';

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
  settings: {
    enableNotifications: true,
  },
});

export default Store;

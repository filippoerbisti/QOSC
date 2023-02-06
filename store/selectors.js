import { createSelector } from 'reselect';

const getState = state => state;

export const getContacts = createSelector(getState, state => state.contacts);
export const getGroups = createSelector(getState, state => state.groups);
export const getLists = createSelector(getState, state => state.lists);
export const getNotifications = createSelector(getState, state => state.notifications);
export const getSettings = createSelector(getState, state => state.settings);

export const getRangeNotif = createSelector(getState, state => state.pushRangeNotific);


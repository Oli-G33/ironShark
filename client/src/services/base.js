import api from './api';

export const listGameData = () =>
  api.get('/').then((response) => response.data);

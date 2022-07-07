import api from './api';

export const gameSearch = filters =>
  api
    .get(`/game/search?${new URLSearchParams(filters).toString()}`)
    .then(response => response.data);

export const gameLoad = id =>
  api.get(`/game/${id}`).then(response => response.data);

export const gameEdit = (id, game) =>
  api.patch(`/game/${id}`, game).then(response => response.data);

export const gameDelete = id =>
  api.delete(`/game/${id}`).then(response => response.data);

export const gameAdd = game =>
  api.post('/game', game).then(response => response.data);

export const bookmarkList = () =>
  api.get('/game/bookmarked').then(response => response.data);

export const bookmarkAdd = id =>
  api.post(`/game/${id}/bookmark`).then(response => response.data);

export const bookmarkDelete = id =>
  api.delete(`/game/${id}/bookmark`).then(response => response.data);

export const gameSend = gameUrl =>
  api.post(`/game/success`, gameUrl).then(response => response.data);

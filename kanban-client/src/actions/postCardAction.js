import api from './api.js';
export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
  DND: 'DND',
};

export const fetchAll = () => async dispatch => {
  await api
    .postCard()
    .fetchAll()
    .then(res => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const create = (data, onSuccess) => dispatch => {
  console.log(data);
  api
    .postCard()
    .create(data)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => {
      console.log(err);
    });
};

export const update = (id, data, onSuccess) => dispatch => {
  console.log(id);
  api
    .postCard()
    .update(id, data)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => {
      console.log(err);
    });
};

export const dnd = (id, data, onSuccess) => dispatch => {
  console.log(id);
  api
    .postCard()
    .update(id, data)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ACTION_TYPES.DND,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => {
      console.log(err);
    });
};

export const Delete = (id, onSuccess) => dispatch => {
  api
    .postCard()
    .delete(id)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch(err => {
      console.log(err);
    });
};

// reducer - ф-я изменяющая состояние
export function createStore(reducer, instialState) {
  let state = instialState;
  let callbacks = [];

  const getState = () => state;

  const subscribe = (callback) => {
    callbacks.push(callback)
    return () => callbacks = callbacks.filter(cb => cb !== callback);
  }

  // dispatch изменяет состояние и оповещает подпищиков об этом
  const dispatch = (action) => {
    state = reducer(state, action);
    callbacks.forEach(callback => callback());
  }

  dispatch({})

  return { getState, dispatch, subscribe }

}

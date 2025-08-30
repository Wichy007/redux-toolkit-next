import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer, { TodosState } from './features/todos/todosSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export const makeStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

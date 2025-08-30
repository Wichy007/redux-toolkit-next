'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { setTodos, Todo } from './features/todos/todosSlice';

export default function StoreProvider({
  todos,
  children,
}: {
  todos: Todo[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setTodos(todos));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

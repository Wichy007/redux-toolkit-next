'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleTodo, deleteTodo, editTodo, Todo } from '@/store/features/todos/todosSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Pencil, Trash } from 'lucide-react';

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleDelete = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSave = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText }),
    });
    dispatch(editTodo({ id, text: editText }));
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="space-y-4">
      {todos.map((todo: Todo) => (
        <div key={todo.id} className="flex items-center space-x-2">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => dispatch(toggleTodo(todo.id))}
          />
          {editingId === todo.id ? (
            <Input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleSave(todo.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave(todo.id)}
              className="flex-grow"
            />
          ) : (
            <label
              htmlFor={`todo-${todo.id}`}
              className="flex-grow text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {todo.text}
            </label>
          )}
          <div className="flex items-center space-x-2">
            {editingId === todo.id ? (
              <Button onClick={() => handleSave(todo.id)} size="icon" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => handleEdit(todo)} size="icon" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={() => handleDelete(todo.id)} size="icon" variant="destructive">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

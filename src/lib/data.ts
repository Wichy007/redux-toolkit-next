import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

export async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return { todos: [] }; // Return empty todos if file doesn't exist
    }
    throw error;
  }
}

export async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function getTodos() {
  const db = await readDb();
  return db.todos;
}

export async function addTodo(newTodo: any) {
  const db = await readDb();
  db.todos.push(newTodo);
  await writeDb(db);
  return newTodo;
}

export async function deleteTodo(id: number) {
  const db = await readDb();
  db.todos = db.todos.filter((todo: any) => todo.id !== id);
  await writeDb(db);
}

export async function editTodo(id: number, text: string) {
  const db = await readDb();
  const todo = db.todos.find((todo: any) => todo.id === id);
  if (todo) {
    todo.text = text;
    await writeDb(db);
    return todo;
  }
  return null;
}

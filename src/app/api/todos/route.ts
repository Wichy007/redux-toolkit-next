import { NextResponse } from 'next/server';
import { getTodos, addTodo } from '@/lib/data';

export async function GET() {
  const todos = await getTodos();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const newTodo = await request.json();
  await addTodo(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

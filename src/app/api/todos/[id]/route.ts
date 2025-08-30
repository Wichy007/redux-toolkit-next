import { NextResponse } from 'next/server';
import { deleteTodo, editTodo } from '@/lib/data';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  await deleteTodo(id);
  return new Response(null, { status: 204 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const { text } = await request.json();
  const updatedTodo = await editTodo(id, text);
  if (updatedTodo) {
    return NextResponse.json(updatedTodo);
  }
  return new Response('Todo not found', { status: 404 });
}

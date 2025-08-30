import StoreProvider from "@/store/StoreProvider";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTodos } from "@/lib/data";

export default async function Home() {
  const todos = await getTodos();

  return (
    <StoreProvider todos={todos}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Todo App</CardTitle>
          </CardHeader>
          <CardContent>
            <AddTodoForm />
            <div className="mt-4">
              <TodoList />
            </div>
          </CardContent>
        </Card>
      </main>
    </StoreProvider>
  );
}

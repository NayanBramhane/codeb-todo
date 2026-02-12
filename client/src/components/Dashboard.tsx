// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { getTodos } from "@/services/todo.service";
import { TodoCard } from "@/components/TodoCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Todo } from "@/lib/utils";

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data.todos);
      } catch (error) {
        toast.error("Could not fetch todos");
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your daily tasks and productivity.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Todo
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCard 
                key={todo._id} 
                todo={todo} 
                onDelete={(id) => console.log("Delete", id)}
                onEdit={(id) => console.log("Edit", id)}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium">No todos found</h3>
              <p className="text-muted-foreground">Get started by creating your first task.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState, useCallback } from "react";
import { getTodos } from "@/services/todo.service";
import { TodoCard } from "@/components/TodoCard";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import type { Todo } from "@/lib/utils";
import { logoutService } from "@/services/auth.service";
import { useNavigate } from "react-router";
import { TodoDialog } from "@/components/TodoDialog";

export default function Dashboard() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    try {
      const data = await getTodos();
      setTodos(data.todos);
    } catch (error) {
      toast.error("Could not fetch todos");
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleLogout = async () => {
    try {
      await logoutService();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-destructive hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>

          <TodoDialog mode="create" onSuccess={fetchTodos} />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <p className="text-muted-foreground animate-pulse text-center col-span-full py-10">
            Fetching your tasks...
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                
                onRefresh={fetchTodos}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium">No todos found</h3>
              <p className="text-muted-foreground">
                Get started by creating your first task.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

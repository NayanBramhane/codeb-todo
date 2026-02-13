import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { TodoDialog } from "./TodoDialog";
import type { Todo } from "@/lib/utils";
import { deleteTodo, updateTodo } from "@/services/todo.service"; // Import updateTodo
import { toast } from "sonner";

interface TodoCardProps {
  todo: Todo;
  onRefresh: () => void;
}

export function TodoCard({ todo, onRefresh }: TodoCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      onRefresh();
    } catch (error) {
      toast.error("Could not delete todo");
      console.error("Delete todo error:", error);
    }
  };

  // Function to toggle completion status
  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await updateTodo(todo._id, { isCompleted: !todo.isCompleted });
      onRefresh();
      toast.success(
        todo.isCompleted ? "Task marked as pending" : "Task completed!",
      );
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Update todo error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card
      className={todo.isCompleted ? "bg-muted/40 border-dashed" : "shadow-sm"}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle
            className={`text-lg font-semibold leading-none ${
              todo.isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {new Date(todo.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Status Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          disabled={isUpdating}
          onClick={handleToggle}
          className="h-8 w-8 rounded-full hover:bg-transparent"
        >
          {isUpdating ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : todo.isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 hover:scale-110 transition-transform" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground hover:text-green-500 hover:scale-110 transition-transform" />
          )}
        </Button>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {todo.description || "No description provided."}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-1 pt-0">
        <TodoDialog mode="view" todo={todo} onSuccess={onRefresh} />
        <TodoDialog mode="update" todo={todo} onSuccess={onRefresh} />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(todo._id)}
          className="h-8 w-8 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

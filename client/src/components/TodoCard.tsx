import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import { TodoDialog } from "./TodoDialog"; 
import type { Todo } from "@/lib/utils";
import { deleteTodo } from "@/services/todo.service";
import { toast } from "sonner";

interface TodoCardProps {
  todo: Todo;
  onRefresh: () => void;
}

export function TodoCard({ todo, onRefresh }: TodoCardProps) {
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      onRefresh();
    } catch (error) {
      toast.error("Could not delete todo");
      console.error("Error deleting todo:", error);
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
        {todo.isCompleted ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {todo.description || "No description provided."}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-1 pt-0">
        {/* VIEW MODE */}
        <TodoDialog mode="view" todo={todo} onSuccess={onRefresh} />

        {/* UPDATE MODE */}
        <TodoDialog mode="update" todo={todo} onSuccess={onRefresh} />

        {/* DELETE BUTTON */}
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

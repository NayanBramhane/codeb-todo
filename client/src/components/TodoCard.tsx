// src/components/TodoCard.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3, CheckCircle2, Circle } from "lucide-react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

interface TodoCardProps {
  todo: Todo;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TodoCard({ todo, onEdit, onDelete }: TodoCardProps) {
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
            {new Date(todo.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
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

      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit?.(todo._id)}
          className="h-8 w-8 hover:text-primary hover:cursor-pointer"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete?.(todo._id)}
          className="h-8 w-8 hover:text-destructive hover:cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

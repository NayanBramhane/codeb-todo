import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { todoSchema, type TodoFormValues } from "@/schemas/todo.schema";
import { createTodo, updateTodo } from "@/services/todo.service";
import { type Todo } from "@/lib/utils";

interface TodoDialogProps {
  mode: "create" | "update" | "view";
  todo?: Todo;
  onSuccess: () => void;
}

export function TodoDialog({ mode, todo, onSuccess }: TodoDialogProps) {
  const [open, setOpen] = useState(false);
  const isView = mode === "view";
  const isUpdate = mode === "update";

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Reset form when todo changes or modal opens
  useEffect(() => {
    if ((isUpdate || isView) && todo) {
      form.reset({
        title: todo.title,
        description: todo.description || "",
      });
    } else if (mode === "create") {
      form.reset({ title: "", description: "" });
    }
  }, [todo, open, mode, form, isUpdate, isView]);

  const onSubmit = async (data: TodoFormValues) => {
    if (isView) return;

    try {
      if (isUpdate && todo) {
        await updateTodo(todo._id, data);
        toast.success("Todo updated successfully!");
      } else {
        await createTodo(data);
        toast.success("Todo created successfully!");
      }

      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error(`Failed to ${mode} todo`);
      console.error(`Error during ${mode} todo:`, error);
    }
  };

  // Dynamic Content based on mode
  const config = {
    create: {
      title: "Add New Todo",
      desc: "Create a new task for your list.",
      button: <Plus className="h-4 w-4" />,
      triggerText: "Add Todo",
      submitText: "Create Todo",
    },
    update: {
      title: "Edit Todo",
      desc: "Make changes to your existing task.",
      button: <Pencil className="h-4 w-4" />,
      triggerText: "",
      submitText: "Save Changes",
    },
    view: {
      title: "Todo Details",
      desc: "Viewing task details.",
      button: <Eye className="h-4 w-4" />,
      triggerText: "",
      submitText: "Close",
    },
  }[mode];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="gap-2">
            {config.button} {config.triggerText}
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {config.button}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.desc}</DialogDescription>
        </DialogHeader>

        <form id="todo-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="py-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    {...field}
                    disabled={isView}
                    placeholder="e.g., Buy groceries"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    {...field}
                    disabled={isView}
                    placeholder="Add more details..."
                    className="resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          {isView ? (
            <Button onClick={() => setOpen(false)}>Close</Button>
          ) : (
            <Button
              type="submit"
              form="todo-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : config.submitText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

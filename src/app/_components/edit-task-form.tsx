"use client";

import { editTaskAction } from "@/actions/edit-task";
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
import { Label } from "@/components/ui/label";
import { Task } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { Edit2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type EditTaskFormProps = Pick<Task, "id" | "title">;

export function EditTaskForm({ id, title }: EditTaskFormProps) {
  const editTaskActionWithId = editTaskAction.bind(null, id);
  const { pending } = useFormStatus();

  const handleEditTaskForm = async (formData: FormData) => {
    try {
      await editTaskActionWithId(formData);
      toast.success("Tarefa editada com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        return toast.error("Erro ao editar tarefa", {
          description: error.message,
        });
      }

      toast.error("Erro ao editar tarefa");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-muted-foreground">
          <Edit2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Modifique informações da sua tarefa
          </DialogDescription>
        </DialogHeader>
        <form action={handleEditTaskForm}>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            defaultValue={title}
            required
            autoFocus
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="submit" disabled={pending}>
                Modificar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

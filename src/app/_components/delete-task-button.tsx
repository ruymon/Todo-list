"use client";

import { deleteTaskAction } from "@/actions/delete-task";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Task } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteTaskButtonProps = Pick<Task, "id">;

export function DeleteTaskButton({ id }: DeleteTaskButtonProps) {
  const handleDeleteTask = async () => {
    try {
      await deleteTaskAction(id);
      toast.success("Tarefa removida com sucesso");
    } catch (error) {
      toast.error("Erro ao remover tarefa");
      return;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghostDestructive"
          className="text-muted-foreground"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja remover a tarefa?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            tarefa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTask}>
            Tenho certeza
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { updateTaskStatusAction } from "@/actions/update-task-status";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";

type TaskStatusCheckboxProps = Pick<Task, "id" | "status">;

export function TaskStatusCheckbox({ id, status }: TaskStatusCheckboxProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await updateTaskStatusAction(id, status);
        toast.success("Tarefa atualizada com sucesso");
      } catch (error) {
        toast.error("Erro ao atualizar tarefa");
      }
    });
  };

  return <Checkbox key={id} defaultChecked={status} onClick={handleClick} />;
}

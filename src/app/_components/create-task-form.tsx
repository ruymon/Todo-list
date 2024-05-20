"use client";

import { createTaskAction } from "@/actions/create-task";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { toast } from "sonner";
import { SubmitButton } from "./submit-button";

export function CreateTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);
  // In the future, we can add Zod validation here. At the moment, as we are only saving the title, we don't need to validate it.

  const handleCreateTaskForm = async (formData: FormData) => {
    try {
      await createTaskAction(formData);
      toast.success("Tarefa criada com sucesso!");
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao criar tarefa.", {
          description: error.message,
        });
        return;
      }

      toast.error("Erro ao criar tarefa.");
    }
  };

  return (
    <form
      ref={formRef}
      action={handleCreateTaskForm}
      className="flex w-full flex-col gap-2"
    >
      <Input
        type="text"
        name="title"
        className="h-12"
        placeholder="Digite o título da sua nova tarefa"
      />
      <SubmitButton />
    </form>
  );
}

"use server";

import prisma from "@/lib/db";
import { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateTaskStatusAction(
  id: Task["id"],
  status: Task["status"],
) {
  console.log("updateTaskStatusAction", id, status);
  if (!id) {
    throw new Error("O id é obrigatório.");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });

  if (!task) {
    throw new Error("Tarefa não encontrada.");
  }

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      status: !status,
    },
  });

  revalidatePath("/");
}

"use server";

import prisma from "@/lib/db";
import { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(id: Task["id"]) {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!task) {
    throw new Error("Tarefa não encontrada.");
  }

  await prisma.task.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}

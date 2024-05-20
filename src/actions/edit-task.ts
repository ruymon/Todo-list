"use server";

import prisma from "@/lib/db";
import { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function editTaskAction(id: Task["id"], formData: FormData) {
  const title = formData.get("title") as string;

  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!task) {
    throw new Error("A tarefa não encontrada.");
  }

  if (task?.title === title) {
    throw new Error("Nenhuma modificação foi feita.");
  }

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  revalidatePath("/");
}

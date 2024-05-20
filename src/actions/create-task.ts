"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: FormData) {
  const title = formData.get("title")?.toString();

  if (!title) {
    throw new Error("O título é obrigatório.");
  }

  await prisma.task.create({
    data: {
      title,
    },
  });

  revalidatePath("/");
}

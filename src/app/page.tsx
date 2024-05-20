import prisma from "@/lib/db";
import { NotebookPenIcon } from "lucide-react";
import { TaskItem } from "./_components/task-item";

export default async function Home() {
  const tasks = await prisma.task.findMany();
  const orderedTasks = tasks.sort((a, b) => {
    if (a.status === b.status) {
      return a.id - b.id;
    }

    return a.status ? 1 : -1;
  });

  return orderedTasks.length === 0 ? (
    <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-muted/50 p-8">
      <NotebookPenIcon className="h-8 w-8 text-muted-foreground" />
      <div className="flex flex-col items-center">
        <h2 className="text-balance text-lg font-semibold text-muted-foreground">
          Nenhuma tarefa encontrada
        </h2>
        <span className="w-3/4 text-center text-sm text-muted-foreground">
          Comece a se organizar adicionando uma nova tarefa.
        </span>
      </div>
    </div>
  ) : (
    orderedTasks.map((task) => <TaskItem key={task.id} {...task} />)
  );
}

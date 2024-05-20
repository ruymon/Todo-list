import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { DeleteTaskButton } from "./delete-task-button";
import { EditTaskForm } from "./edit-task-form";
import { TaskStatusCheckbox } from "./task-status-checkbox";

type TaskItemProps = Pick<Task, "title" | "id" | "status">;

export function TaskItem({ title, id, status }: TaskItemProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-muted",
        status && "opacity-75 hover:opacity-100",
      )}
    >
      <div className="flex items-center gap-2">
        <TaskStatusCheckbox id={id} status={status} />
        <span
          className={cn(
            "text-lg text-accent-foreground",
            status && "text-muted-foreground line-through",
          )}
        >
          {title}
        </span>
      </div>

      <div className="flex items-center">
        {!status && <EditTaskForm id={id} title={title} />}
        <DeleteTaskButton id={id} />
      </div>
    </div>
  );
}

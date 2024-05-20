"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <span>Criar nova tarefa</span>
      )}
    </Button>
  );
}

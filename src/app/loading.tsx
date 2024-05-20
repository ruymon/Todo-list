import { Skeleton } from "@/components/ui/skeleton";

export default function AppLoading() {
  return (
    <>
      <Skeleton className="mb-1 h-14 w-full" />
      <Skeleton className="mb-1 h-14 w-full" />
      <Skeleton className="mb-1 h-14 w-full" />
    </>
  );
}

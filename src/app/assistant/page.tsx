"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AssistantChat } from "@/components/assistant-chat";
import { Skeleton } from "@/components/ui/skeleton";

export default function AssistantPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl flex-col gap-4 px-4 py-6">
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="flex-1 rounded-xl" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    );
  }

  if (!session) return null;

  return <AssistantChat />;
}

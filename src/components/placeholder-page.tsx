import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="max-w-xl text-muted-foreground">{description}</p>
      <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
        Back home
      </Button>
    </main>
  );
}

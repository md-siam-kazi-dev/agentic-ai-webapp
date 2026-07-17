import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex max-w-full overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical
          ? "flex-col"
          : "flex-row",
        className
      )}
      style={{
        maskImage: vertical
          ? "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
          : "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: vertical
          ? "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
          : "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "flex-col" : "flex-row",
            "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { authClient, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
    Compass,
    Info,
    LogOut,
    Menu as MenuIcon,
    Sparkles,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const loggedOutRoutes = [
  { href: "/#pricing", label: "Pricing", icon: Sparkles },
  { href: "/about", label: "About", icon: Info },
  { href: "/explore", label: "Explore", icon: Compass },
];

const loggedInRoutes = [
  { href: "/assistant", label: "Chat", icon: Sparkles },
  { href: "/#pricing", label: "Pricing", icon: Sparkles },
];

function getInitials(name?: string | null, email?: string | null) {
  if (name) {
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return email?.[0]?.toUpperCase() ?? "U";
}

function getDisplayName(name?: string | null) {
  if (!name) return "";
  const firstName = name.split(" ")[0];
  return name.length > 16 ? `${firstName}…` : name;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;
  const currentRoutes = user ? loggedInRoutes : loggedOutRoutes;

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark/20 bg-white text-foreground dark:bg-bg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-bg">
              L
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Loom Ai
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {isPending ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-16 rounded-md" />
              ))
            ) : (
              currentRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === route.href.split("#")[0] && !route.href.includes("#")
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {route.label}
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="hidden h-4 w-20 rounded-md sm:block" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Open user menu"
                  />
                }
              >
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
                  <AvatarFallback>{getInitials(user.name, user.email)}</AvatarFallback>
                </Avatar>
                <span className="hidden max-w-28 truncate text-sm font-medium text-foreground sm:block">
                  {getDisplayName(user.name)}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" nativeButton={false} className="text-foreground hover:bg-muted" render={<Link href="/login" />}>
                Login
              </Button>
              <Button nativeButton={false} render={<Link href="/register" />}>Sign Up</Button>
            </div>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  className="flex size-9 items-center justify-center rounded-md text-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-base font-semibold">Menu</SheetTitle>
                <ThemeToggle />
              </div>
              <div className="mt-6 flex flex-col gap-1">
                {isPending ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-full rounded-md" />
                  ))
                ) : (
                  currentRoutes.map((route) => {
                    const Icon = route.icon;
                    return (
                      <SheetClose key={route.href} render={<Link href={route.href} />}>
                        <span
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname === route.href.split("#")[0] && !route.href.includes("#")
                              ? "bg-muted text-accent"
                              : "text-foreground/80 hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {route.label}
                        </span>
                      </SheetClose>
                    );
                  })
                )}
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
                {user ? (
                  <SheetClose render={<button onClick={handleSignOut} />}>
                    <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive">
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </span>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose render={<Link href="/login" />}>
                      <span className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
                        Login
                      </span>
                    </SheetClose>
                    <SheetClose render={<Link href="/register" />}>
                      <span className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                        Sign Up
                      </span>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

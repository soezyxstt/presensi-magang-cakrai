import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { PanelLeft, Home, UserRound, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function KruSheet() { 
  const navItems = [
    { title: "Dashboard", icon: <Home className="h-5 w-5" />, href: "/kru" },
    {
      title: "Profile",
      icon: <UserRound className="h-5 w-5" />,
      href: "/kru/profile",
    },
    { title: "Logout", icon: <LogOut className="h-5 w-5" />, href: "/sign-out" },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="to bg-cyan-300 bg-gradient-to-br from-pink-300 via-violet-300 pt-12 text-black backdrop-blur-sm sm:max-w-xs"
      >
        <SheetHeader>
          <SheetTitle className="text-left font-bold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="grid gap-3 py-4 text-lg font-medium">
          {navItems.map((item, index) => (
            <>
              <Separator key={index} />
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-4 text-sm font-semibold text-violet-800"
              >
                {item.icon}
                {item.title}
              </Link>
            </>
          ))}
          <Separator />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
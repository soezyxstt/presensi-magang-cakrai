import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { PanelLeft, Home, UserRound, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export default function KruSheet() { 
  const navItems = [
    { title: "Home", icon: <Home className="h-5 w-5" />, href: "/kru" },
    {
      title: "Profile",
      icon: <UserRound className="h-5 w-5" />,
      href: "/kru/profile/2123",
    },
    { title: "Setting", icon: <Settings className="h-5 w-5" />, href: "#" },
    { title: "Logout", icon: <LogOut className="h-5 w-5" />, href: "/logout" },
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
        className="bg-gradient-to-br from-pink-300 to bg-cyan-300 via-violet-300 backdrop-blur-sm pt-12 text-black sm:max-w-xs"
      >
        <nav className="grid gap-6 text-lg font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-4 px-2.5 hover:font-bold"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}